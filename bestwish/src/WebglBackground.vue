<template>
  <canvas class="webgl"></canvas>
</template>

<script setup>
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createNoise2D } from "simplex-noise";
import { onMounted } from 'vue';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

onMounted(() => {
  initWebGL();
});

function initWebGL() {
  // ! Preload
  const canvas = document.querySelector('canvas.webgl');
  const scene = new THREE.Scene();
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const camera = new THREE.PerspectiveCamera(
    100,
    sizes.width / sizes.height,
    0.1,
    1000
  );
  camera.position.z = 1;
  camera.position.y = 1.5;
  camera.position.x = 2.5;

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(2.5, 1.5, 0);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const loader = new FontLoader() // 创建字体加载器
  function addText() {
    loader.load(
        // font资源URL
        './font/Rubik Maze_Regular.json',
        // onLoad回调
        function (font) {
          const geometry = new TextGeometry('BEST WISH!', {
            font: font,
            size: 10,
            depth: 0,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.01,   // 斜面厚度
            bevelSize: 0.1,        // 斜面宽度
            bevelSegments: 3
          })
          geometry.center() // 居中文本
          const materials = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.6,
          })
          const textMesh = new THREE.Mesh(geometry, materials)
          textMesh.position.set(2.5,1.5,-30)
          scene.add(textMesh)
        }
    )
  }
  addText();


  const VAR = {
    NOISE_OFFSET_X: 0,
    NOISE_OFFSET_Y: 0,
    NOISE_SCOPE_X: 5,
    NOISE_SCOPE_Y: 3,
    NOISE_AMPLITUDE: 2,
    NOISE_SCALE: 2,
    VERTEX_DIM_NUM: 400,
    VERTEX_SIZE: 0.002,
    NOISE_SPEED: 0.001,
    FPS: 60,
    MAP_SCOPE: 0.5 * Math.PI,
    PARTICLES_NUM: 100000,
    PARTICLES_SPEED: 0.005,
    PARTICLES_SCOPE_SPEED: 0.003
  };

  // ! Particles
  class Particles {
    constructor() {
      this.position = new THREE.Vector3();
      this.color = new THREE.Color();
      this.generate();
    }

    generate() {
      this.position.x = Math.random() * VAR.NOISE_SCOPE_X;
      this.position.y = Math.random() * VAR.NOISE_SCOPE_Y;
      this.position.z = 0;
      this.color.set(1, 1, 1);
    }

    update() {
      this.position.x -= Math.cos(noise(this.position.x + VAR.NOISE_OFFSET_X, this.position.y + VAR.NOISE_OFFSET_Y) * VAR.MAP_SCOPE) * VAR.PARTICLES_SPEED;
      this.position.y -= Math.sin(noise(this.position.x + VAR.NOISE_OFFSET_X, this.position.y + VAR.NOISE_OFFSET_Y) * VAR.MAP_SCOPE) * VAR.PARTICLES_SPEED;
      if (this.position.x > VAR.NOISE_SCOPE_X || this.position.x < 0 || this.position.y > VAR.NOISE_SCOPE_Y || this.position.y < 0) {
        this.generate();
      }
    }
  }

  // ! Main
  const noise = createNoise2D();
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(VAR.VERTEX_DIM_NUM * VAR.VERTEX_DIM_NUM * 3);
  const colors = new Float32Array(VAR.VERTEX_DIM_NUM * VAR.VERTEX_DIM_NUM * 3);
  const indices = [];
  const particles = new Array(VAR.PARTICLES_NUM).fill().map(() => new Particles());

  // ! materials
  const material = new THREE.PointsMaterial({
    size: VAR.VERTEX_SIZE,
    sizeAttenuation: true,
    vertexColors: true
  });

  const points = new THREE.Points(geometry, material);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  scene.add(points);

  function CreateIndices() {
    // ! Create the Index
    for (let i = 0; i < VAR.VERTEX_DIM_NUM - 1; i++) {
      for (let j = 0; j < VAR.VERTEX_DIM_NUM - 1; j++) {
        const a = i * VAR.VERTEX_DIM_NUM + j;
        const b = i * VAR.VERTEX_DIM_NUM + j + 1;
        const c = (i + 1) * VAR.VERTEX_DIM_NUM + j;
        const d = (i + 1) * VAR.VERTEX_DIM_NUM + j + 1;
        indices.push(a, b, c);
        indices.push(b, c, d);
      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(indices);
  }

  CreateIndices();

  function updateVertices() {
    for (let i = 0; i < VAR.PARTICLES_NUM; i++) {
      particles[i].update();
      positions[i * 3] = particles[i].position.x;
      positions[i * 3 + 1] = particles[i].position.y;
      positions[i * 3 + 2] = particles[i].position.z;
      colors[i * 3] = particles[i].color.r;
      colors[i * 3 + 1] = particles[i].color.g;
      colors[i * 3 + 2] = particles[i].color.b;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  }

  function update() {
    VAR.MAP_SCOPE += par * VAR.PARTICLES_SCOPE_SPEED;
    if (VAR.MAP_SCOPE > 2.2 || VAR.MAP_SCOPE < 0.8) {
      par *= -1;
    }
    updateVertices();
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  }

  // ! EFFECTS
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const afterimagePass = new AfterimagePass();
  composer.addPass(afterimagePass);
  var cx=0,cy=0,cr=0.01,theta=0;
  function shaking() {
    theta+=0.01;
    cx = 2.5 + cr * Math.cos(theta);
    cy = 1.5 + cr * Math.sin(theta);
    controls.target.set(cx, cy,0);
  }
  // ! Loop
  const clock = new THREE.Clock();
  let par = 1;
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    if (elapsedTime % 0.01 < 0.01) {
      update();
    }
    shaking()
    controls.update();
    composer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();
}
</script>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  contain: content;
}
</style>

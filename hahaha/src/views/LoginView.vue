<template>
  <main>
    <canvas class="webgl"></canvas>
    <LoginCard />
  </main>
</template>

<script setup>
import LoginCard from '@/components/LoginCard.vue'
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createNoise2D } from "simplex-noise";
import { onMounted } from 'vue'
onMounted(() => {
  Webgl()
})
function Webgl(){// ! Preload
  const canvas = document.querySelector('canvas.webgl')
  const scene = new THREE.Scene()
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  const camera = new THREE.PerspectiveCamera(
    100,
    sizes.width / sizes.height,
    0.1,
    1000
  )
  camera.position.z = 1
  camera.position.y = 1.5
  camera.position.x = 2.5
  const controls = new OrbitControls(camera, canvas)
  controls.target.set(2.5, 1.5, 0)
  scene.add(camera)

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)
  window.addEventListener('resize', () => {
    console.log('resize')
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  var VAR = {
    NOISE_OFFSET_X: 0,
    NOISE_OFFSET_Y: 0,
    NOISE_SCOPE_X: 5,
    NOISE_SCOPE_Y: 3,
    NOISE_AMPLITUDE: 1,
    NOISE_SCALE: 1,
    VERTEX_DIM_NUM: 400,
    VERTEX_SIZE: 0.002,
    NOISE_SPEED: 0.001,
    FPS: 60,
    MAP_SCOPE: 0.5 * Math.PI,
    PARTICLES_NUM: 100000,
    PARTICLES_SPEED: 0.005,
    PARTICLES_SCOPE_SPEED: 0.002
  }

// ! Particles
  class Particles {
    constructor() {
      this.position = new THREE.Vector3()
      this.color = new THREE.Color()
      this.generate()
    }

    generate() {
      this.position.x = Math.random() * VAR.NOISE_SCOPE_X
      this.position.y = Math.random() * VAR.NOISE_SCOPE_Y
      this.position.z = 0
      this.color.set(1, 1, 1)
    }

    update() {
      this.position.x -= Math.cos(noise(this.position.x + VAR.NOISE_OFFSET_X, this.position.y + VAR.NOISE_OFFSET_Y) * VAR.MAP_SCOPE) * VAR.PARTICLES_SPEED
      this.position.y -= Math.sin(noise(this.position.x + VAR.NOISE_OFFSET_X, this.position.y + VAR.NOISE_OFFSET_Y) * VAR.MAP_SCOPE) * VAR.PARTICLES_SPEED
      if (this.position.x > VAR.NOISE_SCOPE_X || this.position.x < 0 || this.position.y > VAR.NOISE_SCOPE_Y || this.position.y < 0) {
        this.generate()
      }
    }
  }

// ! Main
  const noise = createNoise2D()
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(VAR.VERTEX_DIM_NUM * VAR.VERTEX_DIM_NUM * 3)
  const colors = new Float32Array(VAR.VERTEX_DIM_NUM * VAR.VERTEX_DIM_NUM * 3)
  const indices = []
  const particles = new Array(VAR.PARTICLES_NUM).fill().map(() => new Particles())
// ! materials
  const material = new THREE.PointsMaterial({
    size: VAR.VERTEX_SIZE,
    sizeAttenuation: true,
    vertexColors: true
  })
  const points = new THREE.Points(geometry, material)
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  scene.add(points)

  function CreateIndices() {
    // ! Create the Index
    for (let i = 0; i < VAR.VERTEX_DIM_NUM - 1; i++) {
      for (let j = 0; j < VAR.VERTEX_DIM_NUM - 1; j++) {
        const a = i * VAR.VERTEX_DIM_NUM + j
        const b = i * VAR.VERTEX_DIM_NUM + j + 1
        const c = (i + 1) * VAR.VERTEX_DIM_NUM + j
        const d = (i + 1) * VAR.VERTEX_DIM_NUM + j + 1
        indices.push(a, b, c)
        indices.push(b, c, d)
      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setIndex(indices)
  }

  CreateIndices()

  function updateVertices() {
    for (let i = 0; i < VAR.PARTICLES_NUM; i++) {
      particles[i].update()
      positions[i * 3] = particles[i].position.x
      positions[i * 3 + 1] = particles[i].position.y
      positions[i * 3 + 2] = particles[i].position.z
      colors[i * 3] = particles[i].color.r
      colors[i * 3 + 1] = particles[i].color.g
      colors[i * 3 + 2] = particles[i].color.b
    }
    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
  }

  function update() {
    // VAR.NOISE_OFFSET_X -= VAR.NOISE_SPEED;
    VAR.MAP_SCOPE += par * VAR.PARTICLES_SCOPE_SPEED
    if (VAR.MAP_SCOPE > 2.2 || VAR.MAP_SCOPE < 0.8) {
      par *= -1
    }
    updateVertices()
    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
  }


// ! EFFECTS
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const afterimagePass = new AfterimagePass()
  composer.addPass(afterimagePass)


// ! Loop
  const clock = new THREE.Clock()
  var par = 1
  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // each var_speed seconds, update the vertices
    if (elapsedTime % 0.001 < 0.001) {
      update()
    }
    controls.update()
    composer.render(scene, camera)
    window.requestAnimationFrame(tick)
  }
  tick()
}

</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: visible;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

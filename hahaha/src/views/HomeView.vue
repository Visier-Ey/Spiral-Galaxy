<template>
  <main>
    <canvas class="webgl"></canvas>
    <main>
      <div class="newsArea">
        <div class="wrapper">
          <NewsCard/>
        </div>
      </div>
      <div class="learnMoreArea">
        <div class="wrapper">
          <BriefCard v-for="card in BriefCardsProps" :key="card.header" :props="card" />
        </div>
      </div>
    </main>
  </main>
</template>

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { onMounted } from 'vue'
import NewsCard from '@/components/NewsCard.vue'
import BriefCard from '@/components/BriefCard.vue'

const BriefCardsProps = [
  {
    header: 'Galaxy',
    content: 'A galaxy made with WebGL and Three.js',
  },
  {
    header: 'Aim',
    content: 'practice and learn',
  },
  {
    header: 'GitHub',
    content: 'not given link',
  },
]

onMounted(() => {
  webGL()
})

function webGL() {
  const canvas = document.querySelector('canvas.webgl')
  const scene = new THREE.Scene()

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100)
  camera.position.x = 3
  camera.position.y = 4
  camera.position.z = 7
  scene.add(camera)

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
  // TODO: Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  let skybox
  // TODO: Import model
  const gltfLoader = new GLTFLoader()
  gltfLoader.load(
    'inside_galaxy_skybox_hdri_360_panorama.glb',
    (gltf) => {
      gltf.scene.scale.set(10, 10, 10)
      scene.add(gltf.scene)
      skybox = gltf.scene
      animate()
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
      console.error(error)
    },
  )

  // set this model to the center as the skybox

  // TODO: Galaxy parameters
  const parameters = {
    count: 1000000,
    size: 0.01,
    color: '#ffffff',
    radius: 7,
    branches: 5,
    spin: 0.6,
    randomness: 0.2,
    randomnessPower: 4.3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
  }
  let geometry = null
  let points = null
  let material = null
  // TODO: Generate Galaxy Function
  const generateGalaxy = () => {
    if (points !== null) {
      // remove the old points
      geometry.dispose()
      material.dispose()
      scene.remove(points)
    }

    // create new points,set the geometry and material
    geometry = new THREE.BufferGeometry()
    const position = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    // generate the points
    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3
      const radius = Math.random() * parameters.radius
      const spinAngle = radius * parameters.spin
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2
      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
      let randomY =
        Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
      // the closer from the center, the lighter the color

      // the farther from the center, the lower the randomY
      randomY *= 1 - radius / parameters.radius
      position[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      position[i3 + 1] = randomY + 2.0
      position[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / parameters.radius)
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: false,
      depthWrite: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })

    points = new THREE.Points(geometry, material)
    scene.add(points)
  }

  camera.rotation.z = 0.25

  const controls = new OrbitControls(camera, canvas)
  controls.enableZoom = false
  controls.rotateSpeed = 0.2
  controls.enableDamping = true
  controls.dampingFactor = 0.02
  // limit the orbiting angle
  controls.minDistance = 5
  controls.maxDistance = 10
  generateGalaxy()
  function animate() {
    scene.traverse((child) => {
      if (child.isPoints) {
        // rotate the points
        child.rotation.y += 0.0005
      }
    })
    skybox.rotation.y += 0.0007
    controls.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
}
</script>

<style scoped>
* {
  overflow: hidden;
}
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.wrapper {
  overflow: visible;
  position: relative;
  width: 100%;
  height: 100%;
}
.newsArea {
  padding-top: 70px;
  position: absolute;
  right: 3%;
  height: 100%;
  width: auto;
  z-index: 10;
  overflow: visible;
}
.learnMoreArea {
  position: absolute;
  bottom: 0;
  height: auto;
  left: 0;
  .wrapper {
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: scale(0.8) translateY(10%);
  }
}
</style>

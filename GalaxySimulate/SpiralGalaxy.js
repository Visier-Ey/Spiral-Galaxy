import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 7;
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
// TODO: Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
var skybox;
// TODO: Import model
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    './inside_galaxy_skybox_hdri_360_panorama.glb',
    (gltf) => {
        gltf.scene.scale.set(10, 10, 10);
        scene.add(gltf.scene);
        skybox = gltf.scene;
        animate();
    }
, (xhr)=>{
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, (error) => {
    console.error(error);
});

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
    outsideColor: '#1b3984'
};
let geometry = null;
let points = null;
let material = null;
// TODO: Generate Galaxy Function
const generateGalaxy = () => {
    if (points !== null) {
        // remove the old points
        geometry.dispose();
        material.dispose();
        scene.remove(points);
    }

    // create new points,set the geometry and material
    geometry = new THREE.BufferGeometry();
    const position = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    // generate the points
    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;
        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
        let randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
        // the closer from the center, the lighter the color

        // the farther from the center, the lower the randomY
        randomY *= (1 - radius / parameters.radius);
        position[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        position[i3 + 1] = randomY;
        position[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);
        colors[i3 + 0] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: false,
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);
};

camera.rotation.z = 0.25;

const controls = new OrbitControls(camera, canvas);
controls.enabled = false;
controls.enableDamping = true;
controls.rotateSpeed = 0.3;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
generateGalaxy();
function animate() {
    scene.traverse((child) => {
        if (child.isPoints) {
            // rotate the points
            child.rotation.y += 0.0005;
        }
    });
    skybox.rotation.y += 0.0005;
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(20, 50, 10);
scene.add(directionalLight);

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x999999 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const fountainBase = new THREE.Mesh(
    new THREE.CylinderGeometry(5, 5, 1, 32),
    new THREE.MeshStandardMaterial({ color: 0x555555 })
);
fountainBase.position.y = 0.5;
scene.add(fountainBase);

const fountainCenter = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 5, 32),
    new THREE.MeshStandardMaterial({ color: 0x777777 })
);
fountainCenter.position.y = 3;
scene.add(fountainCenter);

function createBuilding(x, z) {
    const height = Math.random() * 10 + 10;
    const building = new THREE.Mesh(
        new THREE.BoxGeometry(8, height, 8),
        new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })
    );
    building.position.set(x, height / 2, z);
    scene.add(building);
}

for (let i = -40; i <= 40; i += 20) {
    createBuilding(i, -40);
    createBuilding(i, 40);
    createBuilding(-40, i);
    createBuilding(40, i);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

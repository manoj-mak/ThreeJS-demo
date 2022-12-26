import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css'



const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}

//create a scene
const scene = new THREE.Scene();

//create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: "#3461eb", roughness: 0.7,});
const mesh = new THREE.Mesh(geometry, material);

//add the sphere to the scene
scene.add(mesh);

//create a camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100);
camera.position.z = 20;

//add the camera to the scene
scene.add(camera);

//add a light
const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0,10,10);
light.intensity = 1.25;
scene.add(light);

//render the scene
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas});
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);


//resize the canvas
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width,sizes.height);
  
}
)

//orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

const loop = () => {
  controls.update();
  window.requestAnimationFrame(loop);
  renderer.render(scene, camera);
}

loop();


//gsap animation when the page loads
const tl = gsap.timeline({ defaults: { duration : 1 } });
tl.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 })
  .fromTo("nav", { y: "-100%" }, { y: "0%" })
  .fromTo(".title", { opacity: 0 }, { opacity: 1 })


//change the color of the sphere when the mouse is clicked down
let mousedown = false;
let rgb =[];
window.addEventListener('mousedown', () => (mousedown = true));
window.addEventListener('mouseup', () => (mousedown = false));

window.addEventListener('mousemove', (e) => {
  if (mousedown) {
    rgb = [
      Math.round((e.clientX / window.innerWidth) * 255),
      Math.round((e.clientY / window.innerHeight) * 255),
      150,
    ]
    //animate the color change
    let newColor = new THREE.Color(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    gsap.to(mesh.material.color, { duration: 0.5, r: newColor.r, g: newColor.g, b: newColor.b })
  }
});




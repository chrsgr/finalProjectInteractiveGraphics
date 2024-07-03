import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import fontSrc from 'three/examples/fonts/helvetiker_bold.typeface.json?url';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

//SCENE
const scene = new THREE.Scene();


//WINDOW
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//BACKGROUND
const loader = new THREE.TextureLoader();
loader.load('gameBack.jpg', (texture) => {
  scene.background = texture;
  
  //Semi-transparent su sfondo
  const planeGeometry = new THREE.PlaneGeometry(size.width, size.height);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000, 
    transparent: true,
    opacity: 0.4,
    depthTest: false,
  });

  const darkPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  darkPlane.position.z = -1; 

 
  scene.add(darkPlane);
});

//CAMERA
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
camera.position.z = 5;


//RENDER
const renderer = new THREE.WebGLRenderer({
  antialias: window.devicePixelRatio < 2,  
  logarithmicDepthBuffer: true,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
document.body.appendChild(renderer.domElement);

// Resolution update function
function updateResolution() {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Update the camera aspect ratio
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(size.width, size.height);
}

// Function that manages window resizing
function handleResize() {
  updateResolution();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
}

// Listener for the window resize event
window.addEventListener('resize', handleResize);


//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.25; 


//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, -2, 5);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

function animate() {
  controls.update(); 
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();











//START-STOP
document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', startGame);
});

document.addEventListener('DOMContentLoaded', function (){
  const startButton = document.getElementById('stopButton');
  startButton.addEventListener('click', startGame);
}); 


//BODY
document.addEventListener('DOMContentLoaded', function() {
  const mainElement = document.querySelector('body');

  gsap.from(mainElement, {
      opacity: 0,
      duration: 1, 
      ease: 'power1.inOut' 
  });
});




//ISTRUZIONI GIOCO 
function goToIstruction() {
  var popup = document.createElement('div');
  popup.id = 'istruPopup'; 
  popup.style.width = 'auto';
  popup.style.height = 'auto';
  popup.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  popup.style.border = '5px solid lightblue';
  popup.style.opacity = '0';
  popup.style.borderRadius = '50px';

  popup.style.position = 'fixed';
  popup.style.left = '50%';
  popup.style.top = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.padding = '20px';
  popup.style.textAlign = 'center';
  popup.style.transition = 'opacity 0.3s ease-in';

  popup.innerHTML = `
      <h2>Instructions</h2>
      <p>Pause/Play = start and stop the game (you can also click 'space' in the keyboard )</p>
      <p>Home = return to the home page</p>
      <p>Volume = enable/disable audio</p>
      <button id="closePopUp">Chiudi</button>
  `;
  

  document.body.appendChild(popup);

  popup.style.opacity = '1';
  
  var closeBtn = document.getElementById('closePopUp');
  closeBtn.addEventListener('click', function() {
      popup.style.opacity = '0'; 
      setTimeout(function() {
          if (popup.parentNode) {
              popup.parentNode.removeChild(popup); 
          }
      }, 300); 
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const istruImg = document.getElementById('istru');
  istruImg.addEventListener('click', goToIstruction);
});






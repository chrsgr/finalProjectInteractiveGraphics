/*
COSE ANOCRA DA FARE: 
-aggiustare movimento torretta
-implementare logica di collisoni
-livelli 
  -per difficoltà: luci, colori, velocità, numero di invasori
-boss finale (per vincere)
  -luci stroboscopiche quando entra 
-animazioni quando si distrugge ufo
-pulsanti start/stop
-score ad ogni ufo distrutto per aumento di livello
-aggiugnere vignetta boss finale
-power up
*/

import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
//import fontSrc from 'three/examples/fonts/helvetiker_bold.typeface.json?url';
//import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

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
    opacity: 0.2,
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

// Resolution 
function updateResolution() {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  //Ratio
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

 
  renderer.setSize(size.width, size.height);
}

//Window resize
function handleResize() {
  updateResolution();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
}

window.addEventListener('resize', handleResize);


//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.25; 


//LIGHTS 
//TO-DO: dare una sistemata
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); 
directionalLight.position.set(5, 5, 5); 
directionalLight.castShadow = true; 
scene.add(directionalLight);


const pointLight = new THREE.PointLight(0xffffff, 1, 100); 
pointLight.position.set(0, 0, 5); 
pointLight.castShadow = true; 
scene.add(pointLight);


//INVADERS
let ufoObject; 
function loadUfoObject() {
  const mtlLoader = new MTLLoader();
  mtlLoader.load('AttackOnBase/public/obj/UFO_obj/UFO.mtl', function(materials) {
      //console.log('MTL ok:', materials);

      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load('UFO.obj', function(object) {
         // console.log('OBJ ok:', object);

       
          object.position.set(1, -2, 0);
          object.scale.set(0.40,0.40, 0.40);
          scene.add(object);

          ufoObject = object;
          const light = new THREE.PointLight(0xff0000, 3, 5); // reminder: colore, intensità, distanza
          light.position.set(0, 0, 0);
          object.add(light); 


          startAutomaticMovement();
      });
  }, undefined, function(error) {
      //console.error('Error MTL file:', error);
  });


}


//MOVIMENTO AUTOMATICO
function startAutomaticMovement() {
  let ufoHorizontalSpeed = 0.02; 
  let ufoVerticalSpeed = 0.2; 
  let ufoVerticalPositionY = 3;
  let ufoPositionX = 0;  
  let sceneWidth = 4; 
  let moveRight = true; 
  let moveDown = false; 

  let shootingInterval = 2000; 
  let lastShotTime = 0; 

  function animateUFO() {
    // orizzontale 
    if (moveRight) {
      ufoPositionX += ufoHorizontalSpeed;
    } else {
      ufoPositionX -= ufoHorizontalSpeed;
    }

    //aggiorno
    ufoObject.position.set(ufoPositionX, ufoVerticalPositionY, 0);

    //controllo cambio posizione
    if (ufoPositionX >= sceneWidth || ufoPositionX <= -sceneWidth) {
      moveRight = !moveRight;
      moveDown = true;
    }

    //Verticale
    if (moveDown) {
      ufoVerticalPositionY -= ufoVerticalSpeed;
      moveDown = false; 
    }

    if (ufoVerticalPositionY <= -5) {
      ufoVerticalPositionY = 3; 
    }

    //tempo shot
    const currentTime = performance.now();
    const timeSinceLastShot = currentTime - lastShotTime;

    if (timeSinceLastShot >= shootingInterval) {
      shootBulletsUfo(); 
      lastShotTime = currentTime; 
    }

 
    requestAnimationFrame(animateUFO);
  }

  function shootBulletsUfo() {
    createBullet(ufoObject.position.clone()); 

    shootingInterval += 200; 
  }

  animateUFO();

  gsap.from(ufoObject.position, {
    duration: 1,
    y: 5, 
    ease: 'power3.out',
   
  });
}



//BULLET UFO
let ufoBullets = []; 

function createBullet(position) {
  const geometry = new THREE.SphereGeometry(0.05, 16, 16); 
  const material = new THREE.MeshBasicMaterial({ color: '#ffd700' });
  const bullet = new THREE.Mesh(geometry, material);
  bullet.position.copy(position); 
  scene.add(bullet); 
  ufoBullets.push(bullet); 
}




//TURRET
let turretObject; 
function loadTurretObject() {
  const mtlLoader = new MTLLoader();
  mtlLoader.load('AttackOnBase/public/obj/PolygonDan_Turret/turret.mtl', function(materials) {
      //console.log('MTL ok:', materials);

      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load('turret.obj', function(object) {
         //console.log('OBJ ok:', object);

       
          object.position.set(0, -3.4, 0);
          object.scale.set(0.30,0.30, 0.30);
          scene.add(object);

          turretObject = object;
          const light = new THREE.PointLight('#0000ff', 3, 5); 
          light.position.set(0, 0, 0);
          object.add(light); 

         
          object.rotation.set(0, Math.PI/2, 0);

      });
  }, undefined, function(error) {
       //console.error('Error MTL file:', error);
  });

  gsap.from(turretObject.position, {
    duration: 1,
    y: 5, 
    ease: 'power3.out',
   
  });
}


// BULLET TURRET
let turretBullets = []; 
function createTurretBullet(position) {
  const geometry = new THREE.SphereGeometry(0.05, 16, 16); 
  const material = new THREE.MeshBasicMaterial({ color: '#00ff00' }); 
  const bullet = new THREE.Mesh(geometry, material);
  bullet.position.copy(position); 
  scene.add(bullet); 
  turretBullets.push(bullet); 
}

function shootTurret() {
  createTurretBullet(turretObject.position.clone());
}

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    shootTurret();
  }
});




// TURRET MOVEMENT 
const turretSpeed = 0.2; 
function moveTurretLeft() {
  if (turretObject) {
    turretObject.position.x -= turretSpeed;
  }
}

function moveTurretRight() {
  if (turretObject) {
    turretObject.position.x += turretSpeed;
  }
}

document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    moveTurretLeft();
  } else if (event.code === 'ArrowRight') {
    moveTurretRight();
  }
});





function animate() {

  ufoBullets.forEach(bullet => {
    bullet.position.y -= 0.1; 

    if (bullet.position.y < -5) {
      scene.remove(bullet); 
    }
  });
  

  turretBullets.forEach(bullet => {
    bullet.position.y += 0.1; 
    if (bullet.position.y > 5) {
      scene.remove(bullet);
    }
  });

  turretBullets = turretBullets.filter(bullet => scene.children.includes(bullet));
  ufoBullets = ufoBullets.filter(bullet => scene.children.includes(bullet));


  controls.update(); 
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();












/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/

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
      duration: 0.4, 
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


window.onload = function() {
  var astroGame = document.getElementById('astroGame');
  const smoke = document.createElement('div');
  smoke.classList.add('smoke');


  astroGame.parentNode.insertBefore(smoke, astroGame.nextSibling);


  gsap.to(smoke, {
    height: '100%',  
    width: '10%',   
    opacity: 1,    
    y: '100%',     
    duration: 1.7,
    ease: 'power3.out',
  });

 
  gsap.to(astroGame, {
    y: '-100%',  
    x: '50%',   
    duration: 1.7,
    ease: 'power3.out',
    onComplete: function() {
      gsap.to(astroGame, {
        y: 0,
        x: 0,
        duration: 1.7,
        ease: 'power3.out',
        onComplete: function() {
          smoke.remove();
        }
      });
    }
  });
}


document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    handleSpacebar();
  }
});


function handleSpacebar() {
  // Hide and see element
  gsap.to(astroGame, {
    x: '+=400',  
    y: '-=400',   
    opacity: 0,    
    duration: 2,   
    ease: 'power2.out', 
    onComplete: function() {
      astroGame.remove();
      loadUfoObject(); 
      loadTurretObject();
    }

  });
}

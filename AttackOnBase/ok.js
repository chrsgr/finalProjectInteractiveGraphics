/*
COSE ANOCRA DA FARE: 
-pulsanti start/stop
-power up
-aggiungere timer
-ombre e cambio luci
*/

import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import fontSrc from 'three/examples/fonts/helvetiker_bold.typeface.json?url';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

//FONT
const fontLoader = new FontLoader();
let font; 

fontLoader.load(fontSrc, function (loadedFont){
  font = loadedFont; 
  //console.log("Font ok:", font); 
  printScore(); 
}); 


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

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
directionalLight.position.set(5, 5, 5); 
directionalLight.castShadow = true; 
scene.add(directionalLight);


const pointLight = new THREE.PointLight(0xffffff, 1, 100); 
pointLight.position.set(0, 0, 5); 
pointLight.castShadow = true; 
scene.add(pointLight);  




/////////////////////////////////////////////////////
                      /* VITE */
/////////////////////////////////////////////////////

let lives = 3;
let hearts = [];

const textureLoader = new THREE.TextureLoader();
const razzoTexture = textureLoader.load('razzo2.png'); 

function createHearts() {
  hearts.forEach(heart => scene.remove(heart));
  hearts = [];

  for (let i = 0; i < lives; i++) {
    const razzoGeometry = new THREE.PlaneGeometry(0.35, 0.35);
    const razzoMaterial = new THREE.MeshBasicMaterial({ map: razzoTexture, transparent: true, alphaTest: 0.5 });
    const razzo = new THREE.Mesh(razzoGeometry, razzoMaterial);
    razzo.position.set(5 - i * 0.5, -3.25, 0); 
    scene.add(razzo);
    hearts.push(razzo); 
  }
}



/////////////////////////////////////////////////////
                      /* POWER-UP */
/////////////////////////////////////////////////////

//TO-DO LOGICA COLLISIONE
let powerUps = [];

function createPowerUp() {
  const geometry = new THREE.SphereGeometry(0.05, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: '#ff4500' });
  const powerUp = new THREE.Mesh(geometry, material);

  const randomX = (Math.random() - 0.5) * 10; 
  powerUp.position.set(randomX, 4, 0);

  scene.add(powerUp);

  powerUps.push(powerUp);
}



/////////////////////////////////////////////////////
                      /*INVADERS */
/////////////////////////////////////////////////////

//INVADERS 1(fucsia)
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

         if (score >= 0 && score < 10){

          object.position.set(1, -2, 0);
          object.scale.set(0.40,0.40, 0.40);
          scene.add(object);

          
          const light = new THREE.PointLight('#ff00ff', 3, 5); // reminder: colore, intensità, distanza
          light.position.set(0, 0, 0);
          object.add(light); 

          ufoObject = object;
          ufoDestroyed = false;
          startAutomaticMovement(); 

} else if (score >=10 && score < 20 ){

        object.position.set(1.30, -2.2, 0);
          object.scale.set(0.35,0.35, 0.35);
          scene.add(object);

          ufoObject = object;
          const light = new THREE.PointLight('#ff8c00', 3, 5); // reminder: colore, intensità, distanza
          light.position.set(0, 0, 0);
          object.add(light); 

          ufoObject = object;
          ufoDestroyed = false;
          startAutomaticMovement2(); 

} else if (score >= 20 && score <30){
          object.position.set(1.40, -2.3, 0);
          object.scale.set(0.30,0.30, 0.30);
          scene.add(object);

          ufoObject = object;
          const light = new THREE.PointLight('#00ffff', 3, 5); // reminder: colore, intensità, distanza
          light.position.set(0, 0, 0);
          object.add(light); 

          ufoObject = object;
          ufoDestroyed = false;
          startAutomaticMovement3(); 
       
}
        
      });
  }, undefined, function(error) {
      //console.error('Error MTL file:', error);
  });


}



//INVADERS 4(rosso, boss finale)
let ufoObject4; 

function loadUfoObject4() {
  const mtlLoader = new MTLLoader();
  mtlLoader.load('AttackOnBase/public/obj/UFO_obj/UFO.mtl', function(materials) {
      //console.log('MTL ok:', materials);

      materials.preload();

      const objLoader4 = new OBJLoader();
      objLoader4.setMaterials(materials);
      objLoader4.load('UFO.obj', function(object4) {
         // console.log('OBJ ok:', object);

       
          object4.position.set(1.40, -2.3, 0);
          object4.scale.set(0.55,0.55, 0.55);
          scene.add(object4);

          ufoObject4 = object4;
          const light = new THREE.PointLight('#ff0000', 10, 5); // reminder: colore, intensità, distanza
          light.position.set(0, 0, 0);
          object4.add(light); 

            ufoDestroyed4 = false;
        
          printHealth();
          startAutomaticMovement4();
      });
  }, undefined, function(error) {
      //console.error('Error MTL file:', error);
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




/////////////////////////////////////////////////////
                   /*HEALTH BAR*/
/////////////////////////////////////////////////////

let healthEntity;
let health = 100;
let healthGroup;
let healthTextEntity = null;

function printHealth() {
  if (!font) {
    return;
  }

  if (healthEntity) {
    scene.remove(healthEntity);
    healthEntity.geometry.dispose();
    healthEntity.material.dispose();
  }

  const geometry = new TextGeometry((`BOSS: ${health}%`), {
    color: '#dc143c',
    font: font,
    size: 0.3,
    height: 0.1,
    curveSegments: 1,
    bevelEnabled: false,
  });
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: '#dc143c',
    roughness: 0.5,
    metalness: 0.1,
    transparent: true,
    opacity: 1,
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.y = Math.PI / 2;
  mesh.position.y = -1.5;
  mesh.position.x = -5;

  if (!healthGroup) {
    healthGroup = new THREE.Group();
    scene.add(healthGroup);
  }

  scene.add(mesh);
  healthEntity = mesh;

}

function displayHealthText(healthName, xOffset) {

  if (healthTextEntity) {
    scene.remove(healthTextEntity);
    healthTextEntity.geometry.dispose();
    healthTextEntity.material.dispose();
  }

  const healthGeometry = new TextGeometry(healthName, {
    color: '#dc143c',
    font: font,
    size: 0.5,
    height: 0.1,
    curveSegments: 1,
    bevelEnabled: false,
  });
  healthGeometry.center();

  const healthMaterial = new THREE.MeshStandardMaterial({
    color: '#dc143c',
    roughness: 0.5,
    metalness: 0.1,
    transparent: true,
    opacity: 1,
  });

  const healthMesh = new THREE.Mesh(healthGeometry, healthMaterial);
  healthMesh.position.y = 3;
  healthMesh.position.x = xOffset;
  healthMesh.name = healthName;

  scene.add(healthMesh);
  healthTextEntity = healthMesh;

  setTimeout(() => {
    if (healthTextEntity === healthMesh) {
      scene.remove(healthTextEntity);
      healthTextEntity.geometry.dispose();
      healthTextEntity.material.dispose();
      healthTextEntity = null;
    }
  }, 3000); 
}



function updateHealthText() {
  if (healthEntity) {
    healthEntity.geometry.dispose();
    healthEntity.material.dispose();
    scene.remove(healthEntity);
  }

  const geometry = new TextGeometry(`BOSS: ${health}%`, {
    font: font,
    size: 0.3,
    height: 0.1,
    curveSegments: 1,
    bevelEnabled: false,
  });
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: '#dc143c',
    roughness: 0.5,
    metalness: 0.1,
    transparent: true,
    opacity: 1,
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.y = Math.PI / 2;
  mesh.position.y = -1.5;
  mesh.position.x = -5;

  scene.add(mesh);
  healthEntity = mesh;
}




/////////////////////////////////////////////////////
                   /*DISTRUZIONE */
/////////////////////////////////////////////////////

let ufoDestroyed = false;
function frantumaUfo(ufo) {

  if (ufoDestroyed) {
    return;
  }
  ufoDestroyed = true;


  console.log("Frantumazione UFO");
  const particleCount = 200; 
  const particles = new THREE.Group(); 

  for (let i = 0; i < particleCount; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: '#ff1493', 
      transparent: true,
      opacity: 1.0, 
    });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);

    particle.position.copy(ufo.position);
    particle.position.x += (Math.random() - 0.5) * 2;
    particle.position.y += (Math.random() - 0.5) * 2;
    particle.position.z += (Math.random() - 0.5) * 2;

    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5
    );
    particle.velocity = velocity;

    particles.add(particle); 
  }

  scene.add(particles); 
  scene.remove(ufo); 

  ufoBullets.forEach(bullet => scene.remove(bullet));
  ufoBullets = [];

  if (rocketObject) {
    scene.remove(rocketObject);
    rocketObject = null;
    rocketLaunched = false;
  }

  score += 5;
  printScore();
 
  const animationDuration = 2000; 
  const startTimestamp = Date.now();

  function animateParticles() {
    const elapsed = Date.now() - startTimestamp;

    particles.children.forEach(particle => {
      particle.position.add(particle.velocity);

      const opacity = 1.0 - elapsed / animationDuration;
      particle.material.opacity = Math.max(opacity, 0);

      if (opacity <= 0) {
        particles.remove(particle);
      }
    });

    if (particles.children.length === 0) {
      scene.remove(particles);
      loadNewUfo(); 
    } else {
      requestAnimationFrame(animateParticles);
    }

    
  }

  animateParticles(); 

}


//DISTRUZIONE 4
let ufoDestroyed4 = false;

function frantumaUfo4(ufo4) {
  if (ufoDestroyed4) {
    return;
  }

  health -= 25; 
  let scaleFactor = 0.8; 
  ufoObject4.scale.multiplyScalar(scaleFactor);

  updateHealthText();

  if (health <= 0) {
    ufoDestroyed4 = true;

    scene.remove(ufoObject4);
    scene.remove (ufoBullets); 


    console.log("Frantumazione UFO4");

    const particleCount = 400;
    const particles = new THREE.Group();

    for (let i = 0; i < particleCount; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const particleMaterial = new THREE.MeshStandardMaterial({
        color: '#ff0000',
        transparent: true,
        opacity: 1.0,
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);

      particle.position.copy(ufo4.position);
      particle.position.x += (Math.random() - 0.5) * 2;
      particle.position.y += (Math.random() - 0.5) * 2;
      particle.position.z += (Math.random() - 0.5) * 2;

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      );
      particle.velocity = velocity;

      particles.add(particle);
    }

    scene.add(particles);
    scene.remove(ufoObject4);
    ufoBullets.forEach(bullet => scene.remove(bullet));
    ufoBullets = [];

    if (rocketObject) {
      scene.remove(rocketObject);
      rocketObject = null;
      rocketLaunched = false;
    }

    score += 20;
    printScore();

    const animationDuration = 4000;
    const startTimestamp = Date.now();

    function animateParticles() {
      const elapsed = Date.now() - startTimestamp;

      particles.children.forEach(particle => {
        particle.position.add(particle.velocity);

        const opacity = 1.0 - elapsed / animationDuration;
        particle.material.opacity = Math.max(opacity, 0);

        if (opacity <= 0) {
          particles.remove(particle);
        }
      });

      if (particles.children.length === 0) {
        scene.remove(particles);
        scene.remove (ufoBullets); 
        displayWinText();
        
      } else {
        requestAnimationFrame(animateParticles);
      }
    }

    animateParticles();
  }

}


//ROCKET
function frantumaRocket(rocket) {
  //console.log("Frantumazione Rocket");

  const particleCount = 400;
  const particles = new THREE.Group();

  for (let i = 0; i < particleCount; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: '#da70d6',
      transparent: true,
      opacity: 1.0,
    });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);

    particle.position.copy(rocket.position);
    particle.position.x += (Math.random() - 0.5) * 2;
    particle.position.y += (Math.random() - 0.5) * 2;
    particle.position.z += (Math.random() - 0.5) * 2;

    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5
    );
    particle.velocity = velocity;

    particles.add(particle);
  }

  scene.add(particles);
  scene.remove(rocket);
  ufoBullets.forEach(bullet => scene.remove(bullet));
  ufoBullets = [];

  if (rocketObject) {
    scene.remove(rocketObject);
    rocketObject = null;
    rocketLaunched = false;
  }

  const animationDuration = 2000;
  const startTimestamp = Date.now();

  function animateParticles() {
    const elapsed = Date.now() - startTimestamp;

    particles.children.forEach(particle => {
      particle.position.add(particle.velocity);

      const opacity = 1.0 - elapsed / animationDuration;
      particle.material.opacity = Math.max(opacity, 0);

      if (opacity <= 0) {
        particles.remove(particle);
      }
    });

    if (particles.children.length === 0) {
      scene.remove(particles);
      createRocket(); 
    } else {
      requestAnimationFrame(animateParticles);
    }
  }

  animateParticles();
}




//destro rocket
function destroyRocket() {
  if (rocketObject) {
    scene.remove(rocketObject);
    rocketObject = null;
    rocketLaunched = false;
  }
}
 








/////////////////////////////////////////////////////
                      /*LOAD */
/////////////////////////////////////////////////////

//UFO1
function loadNewUfo() {

  if (ufoObject) {
    scene.remove(ufoObject);
    ufoObject = null;
  }

  loadUfoObject();
  createRocket(); 
}


//UFO4
function loadNewUfo4() {

  if (ufoObject4) {
    scene.remove(ufoObject4);
    ufoObject4= null;
  }

  loadUfoObject4();
  createRocket(); 
}


/////////////////////////////////////////////////////
                    /* MOVIMENTO */
/////////////////////////////////////////////////////

//MOVIMENTO 1
function startAutomaticMovement() {
  let ufoHorizontalSpeed = 0.02; 
  let ufoVerticalSpeed = 0.2; 
  let ufoVerticalPositionY = 3;
  let ufoPositionX = 0;  
  let sceneWidth = 4; 
  let moveRight = true; 
  let moveDown = false; 

  let shootingInterval = 1900; 
  let lastShotTime = 0; 

  function animateUFO() {
    // orizzontale 
    if (moveRight) {
      ufoPositionX += ufoHorizontalSpeed;
    } else {
      ufoPositionX -= ufoHorizontalSpeed;
    }

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

//MOVIMENTO 2
function startAutomaticMovement2() {
  let ufoHorizontalSpeed = 0.03; 
  let ufoVerticalSpeed = 0.3; 
  let ufoVerticalPositionY = 3.1;
  let ufoPositionX = 0;  
  let sceneWidth = 4; 
  let moveRight = true; 
  let moveDown = false; 

  let shootingInterval = 1700; 
  let lastShotTime = 0; 

  function animateUFO2() {
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

 
    requestAnimationFrame(animateUFO2);
  }

  function shootBulletsUfo() {
    createBullet(ufoObject.position.clone()); 

    shootingInterval += 190; 
  }

  animateUFO2();

  gsap.from(ufoObject.position, {
    duration: 1,
    y: 5, 
    ease: 'power3.out',
   
  });
}


//MOVIMENTO 3
function startAutomaticMovement3() {
  let ufoHorizontalSpeed = 0.035; 
  let ufoVerticalSpeed = 0.35; 
  let ufoVerticalPositionY = 3.2;
  let ufoPositionX = 0;  
  let sceneWidth = 4; 
  let moveRight = true; 
  let moveDown = false; 

  let shootingInterval = 1500; 
  let lastShotTime = 0; 

  function animateUFO3() {
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

 
    requestAnimationFrame(animateUFO3);
  }

  function shootBulletsUfo() {
    createBullet(ufoObject.position.clone()); 

    shootingInterval += 190; 
  }

  animateUFO3();

  gsap.from(ufoObject.position, {
    duration: 1,
    y: 5, 
    ease: 'power3.out',
   
  });
}

//MOVIMENTO 4
function startAutomaticMovement4() {
  let ufoHorizontalSpeed = 0.043; 
  let ufoVerticalSpeed = 0.40; 
  let ufoVerticalPositionY = 3.4;
  let ufoPositionX = 0;  
  let sceneWidth = 4; 
  let moveRight = true; 
  let moveDown = false; 

  let shootingInterval = 1000; 
  let lastShotTime = 0; 

  function animateUFO4() {
    // orizzontale 
    if (moveRight) {
      ufoPositionX += ufoHorizontalSpeed;
    } else {
      ufoPositionX -= ufoHorizontalSpeed;
    }

    //aggiorno
    ufoObject4.position.set(ufoPositionX, ufoVerticalPositionY, 0);

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

 
    requestAnimationFrame(animateUFO4);
  }

  function shootBulletsUfo() {
    createBullet(ufoObject4.position.clone()); 

    shootingInterval += 190; 
  }

  animateUFO4();

  gsap.from(ufoObject4.position, {
    duration: 1,
    y: 5, 
    ease: 'power3.out',
   
  });
}


/////////////////////////////////////////////////////
                    /*ROCKET */
/////////////////////////////////////////////////////

//ROCKET
let rocketObject;

function createRocket() {
  rocketObject = new THREE.Group();

  // Corpo 
  const bodyGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 35);
  const bodyMaterial = new THREE.MeshPhongMaterial({ color: 	'#f0ffff' });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.5;
  rocketObject.add(body);

  //Punta 
  const coneGeometry = new THREE.ConeGeometry(0.15, 0.3, 36);
  const coneMaterial = new THREE.MeshPhongMaterial({ color: '#ff00ff' });
  const cone = new THREE.Mesh(coneGeometry, coneMaterial);
  cone.position.y = 1.15;
  rocketObject.add(cone);

  //Ali
  const wingGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.1);
  const wingMaterial = new THREE.MeshPhongMaterial({ color: '#ff00ff' });

  const wing1 = new THREE.Mesh(wingGeometry, wingMaterial);
  wing1.position.set(0.15, 0, 0);
  rocketObject.add(wing1);

  const wing2 = wing1.clone();
  wing2.position.set(-0.15, 0, 0);
  rocketObject.add(wing2);

  const wing3 = wing1.clone();
  wing3.position.set(0, 0, 0.15);
  wing3.rotation.y = Math.PI / 2;
  rocketObject.add(wing3);

  const wing4 = wing3.clone();
  wing4.position.set(0, 0, -0.15);
  rocketObject.add(wing4);

  
  rocketObject.position.set(0, -3.5, 0); 
  scene.add(rocketObject);


  return rocketObject;

}

let rocketLaunched = false;
function moveRocket() {
  if (!rocketObject) return;

  rocketLaunched = true; 

  gsap.to(rocketObject.position, {
    y: 5,
    duration: 2,
    ease: 'power2.out',
    onComplete: () => {
      rocketObject.position.y = -3.5;
      rocketLaunched = false; 

    }
  });
}


//spostamento orizzontale
let rocketSpeed = 0.1;
let moveLeft = false;
let moveRight = false;
function updateRocketPosition() {
  if (!rocketLaunched) { 
    if (moveLeft) {
      rocketObject.position.x -= rocketSpeed;
    } else if (moveRight) {
      rocketObject.position.x += rocketSpeed;
    }

   
    if (rocketObject.position.x < -5) {
      rocketObject.position.x = -5;
    } else if (rocketObject.position.x > 5) {
      rocketObject.position.x = 5;
    }
  }
}

//lanciare
//TO-DO: CONTROLLARE
document.addEventListener('keydown', function (event) {
  if (event.key === 'A' || event.key === 'a') {
    moveRocket();
  } else if (!rocketLaunched) { 
    if (event.key === 'ArrowLeft') {
      moveLeft = true;
    } else if (event.key === 'ArrowRight') {
      moveRight = true;
    }
  }
});

document.addEventListener('keyup', function (event) {
  if (!rocketLaunched) {
    if (event.key === 'ArrowLeft') {
      moveLeft = false;
    } else if (event.key === 'ArrowRight') {
      moveRight = false;
    }
  }
});




/////////////////////////////////////////////////////
                    /*COLLISION */
////////////////////////////////////////////////////

//1
function checkCollision() {
  if (rocketObject && ufoObject && !ufoDestroyed) {
    const distance = rocketObject.position.distanceTo(ufoObject.position);
    if (distance < 1.5) { 
      frantumaUfo(ufoObject); 
      destroyRocket();
    }
  }
}


//4
function checkCollision4() {
  if (rocketObject && ufoObject4 && !ufoDestroyed4) {
    const distance = rocketObject.position.distanceTo(ufoObject4.position);
    if (distance < 1.0) { 
      frantumaUfo4(ufoObject4); 
      destroyRocket();
      createRocket(); 

    }
  }
}

 //rocket-bullet
function checkRocketCollision() {
  if (rocketObject && ufoBullets.length > 0) {
    for (let i = ufoBullets.length - 1; i >= 0; i--) {
      const bullet = ufoBullets[i];
      const distance = rocketObject.position.distanceTo(bullet.position);

      if (distance < 0.7) {
        rocketObject.visible = false; 
        lives--;
        frantumaRocket(rocketObject); 

        scene.remove(bullet);
        ufoBullets.splice(i, 1);

        createHearts();

        //console.log('Lives:', lives);
        if (lives === 0) {
         //console.log('Game over');
          showGameOverText(); 
          setTimeout(() => {
            rocketObject.position.set(0, -3.5, 0);
            rocketObject.visible = true;

            if (gameOverTextEntity) {
              scene.remove(gameOverTextEntity);
              gameOverTextEntity.geometry.dispose();
              gameOverTextEntity.material.dispose();
              gameOverTextEntity = null;
            }
          }, 1000);
          return;
        }

        setTimeout(() => {
          rocketObject.position.set(0, -3.5, 0);
          rocketObject.visible = true;
        }, 1000);
      }
    }        
  }
}

 
/////////////////////////////////////////////////////
                      /* GAME OVER */
/////////////////////////////////////////////////////
let gameOverTextEntity; 

function showGameOverText() {
  if (gameOverTextEntity) {
    scene.remove(gameOverTextEntity);
    gameOverTextEntity.geometry.dispose();
    gameOverTextEntity.material.dispose();
    gameOverTextEntity = null;
  }

  const gameOverText = "GAME OVER";
  const color = '#32cd32'; 

  const geometry = new TextGeometry(gameOverText, {
    font: font,
    size: 0.8,
    height: 0.1,
    curveSegments: 1,
    bevelEnabled: false,
  });
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.5,
    metalness: 0.1,
    transparent: true,
    opacity: 1,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -3; 
  mesh.position.x = 0; 
  scene.add(mesh);

  gsap.from(mesh.position, { y: -10, duration: 1, ease: "elastic.out(1, 3)" });

  gameOverTextEntity = mesh;

  setTimeout(() => {
    scene.remove(gameOverTextEntity);
    restartGame(); 
  }, 3000); 

}


/////////////////////////////////////////////////////
                      /* WIN */
/////////////////////////////////////////////////////
function displayWinText() {
  var winAstro = document.getElementById('winAstro');
  var textWinAfter = document.getElementById('textWinAfter');
  var textWin = document.getElementById('textWin');
  const smoke = document.createElement('div');
  smoke.classList.add('smoke');

  winAstro.parentNode.insertBefore(smoke, winAstro.nextSibling);

  gsap.to(smoke, {
    height: '100%',
    width: '10%',
    opacity: 1,
    y: '100%',
    duration: 1.7,
    ease: 'power3.out',
  });

  gsap.to(winAstro, {
    y: '-100%',
    x: '50%',
    duration: 1.7,
    ease: 'power3.out',
    onStart: function() {
      winAstro.style.display = 'block'; 
      textWin.style.display = 'block'
      textWinAfter.style.display = 'block'; 
    },
    onComplete: function() {
      gsap.to(winAstro, {
        y: 0,
        x: 0,
        duration: 1.7,
        ease: 'power3.out',
        onComplete: function() {
          smoke.remove();
          setTimeout(function() {
            winAstro.remove(); 
            textWin.remove(); 
            textWinAfter.remove(); 
          }, 3000);
        }
      });
    }
  });
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'R' || event.key === 'r') {
    restart();
  }
});

////////////////////////////////////////////////////////
                       /* RESTART */
//////////////////////////////////////////////////////

function restart() {
  
  health = 100;
  printHealth();

  score = 0; 
  printScore(); 
 

  ufoBullets.forEach(bullet => scene.remove(bullet));
  ufoBullets = [];

  if (ufoObject) {
    scene.remove(ufoObject);
    ufoObject = null;
  }
  

  if (ufoObject4) {
    scene.remove(ufoObject4);
    ufoObject4 = null;
  }

  lives = 3;
  createHearts();

  rocketObject.position.set(0, -3.5, 0);
  rocketObject.visible = true;

  loadUfoObject();


  createBullet();
}


//QUANDO DI PERDE
function restartGame() { 
  
   score = 0; 
  printScore(); 
 

  ufoBullets.forEach(bullet => scene.remove(bullet));
  ufoBullets = [];

  if (ufoObject) {
    scene.remove(ufoObject);
    ufoObject = null;
  }

  if (ufoObject4) {
    scene.remove(ufoObject4);
    ufoObject4 = null;
  }

  lives = 3;
  createHearts();

  rocketObject.position.set(0, -3.5, 0);
  rocketObject.visible = true;

  loadUfoObject();


  createBullet();
}


////////////////////////////////////////////////////////
                       /*SCORE */
//////////////////////////////////////////////////////

//SCORE
let scoreEntity;
let score = 0;
let scoreGroup;
let levelTextEntity = null;
let currentLevel = null;

function printScore() {
  if (!font) {
    return;
  }

  if (scoreEntity) {
    scene.remove(scoreEntity);
    scoreEntity.geometry.dispose();
    scoreEntity.material.dispose();
  }

  const geometry = new TextGeometry((`${score}`), {
    font: font,
    size: 0.7,
    height: 0.1,
    curveSegments: 1,
    bevelEnabled: false,
  });
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.5,
    metalness: 0.1,
    transparent: true,
    opacity: 1,
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.y = Math.PI / 2;
  mesh.position.y = -3;
  mesh.position.x = -5.5;

  if (!scoreGroup) {
    scoreGroup = new THREE.Group();
    scene.add(scoreGroup);

    const scoreAmbientLight = new THREE.AmbientLight(0xffffff, 1);
    scoreGroup.add(scoreAmbientLight);
  }

  scene.add(mesh);
  scoreEntity = mesh;

  if (score >= 0 && score < 10) {
    displayLevelText("LEVEL 1", '#ff1493', -0.5);
  } else if (score >= 10 && score < 20) {
    displayLevelText("LEVEL 2", '#ff8c00', -0.5);
  } else if (score >= 20 && score < 30) {
    displayLevelText("LEVEL 3", '#00bfff', -0.5); 
  }else if (score >= 30 ) {
    displayLevelText("FINAL BOSS", '#ff0000', -0.5);
    displayHealthText();
  }
}

function displayLevelText(levelName, color, xOffset) {

  if (levelTextEntity) {
    scene.remove(levelTextEntity);
    levelTextEntity.geometry.dispose();
    levelTextEntity.material.dispose();
  }

  const levelGeometry = new TextGeometry(levelName, {
    font: font,
    size: 0.5,
    height: 0.1,
    curveSegments: 1,
    bevelEnabled: false,
  });
  levelGeometry.center();

  const levelMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.5,
    metalness: 0.1,
    transparent: true,
    opacity: 1,
  });

  const levelMesh = new THREE.Mesh(levelGeometry, levelMaterial);
  levelMesh.position.y = -3;
  levelMesh.position.x = xOffset;
  levelMesh.name = levelName;

  scene.add(levelMesh);
  levelTextEntity = levelMesh;

  setTimeout(() => {
    if (levelTextEntity === levelMesh) {
      scene.remove(levelTextEntity);
      levelTextEntity.geometry.dispose();
      levelTextEntity.material.dispose();
      levelTextEntity = null;
    }
  }, 3000); 
}





/////////////////////////////////////////////////////
                      /*ANIMATE*/
/////////////////////////////////////////////////////
function animate() {

  if (rocketObject) {
    updateRocketPosition();
    checkRocketCollision();
  }
  
  if (rocketLaunched) {
    checkCollision();
 
    checkCollision4();
}


  if (ufoObject|| ufoDestroyed4) {
    ufoBullets.forEach(bullet => {
      bullet.position.y -= 0.1;

      if (bullet.position.y < -5) {
        scene.remove(bullet);
      }
    });

    ufoBullets = ufoBullets.filter(bullet => scene.children.includes(bullet));
  }




  controls.update(); 
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();


/////////////////////////////////////////////////////
                      /*START/PAUSE*/
/////////////////////////////////////////////////////

//START-STOP
//TO-DO IMPLEMEMNTARE LOGICHE
/* document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', startGame);
});

document.addEventListener('DOMContentLoaded', function (){
  const startButton = document.getElementById('stopButton');
  startButton.addEventListener('click', startGame);
}); 
 */

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
      <p>To save the planet: destroy the invaders, pass the levels and reach the final boss.</p>
      <p>Be careful of the invaders' bullets that could cause you to die.</p>
       <p>You have three lives available</p>
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
      createRocket(); 
      loadUfoObject();
      createHearts();
    
    }

  });
}
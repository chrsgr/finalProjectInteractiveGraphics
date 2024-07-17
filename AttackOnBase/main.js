
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

       
          object.position.set(1, -2, 0);
          object.scale.set(0.40,0.40, 0.40);
          scene.add(object);

          ufoObject = object;
          const light = new THREE.PointLight('#ff00ff', 3, 5); // reminder: colore, intensità, distanza
          light.position.set(0, 0, 0);
          object.add(light); 

          object.castShadow = true;


            ufoDestroyed = false;
        

          startAutomaticMovement();
      });
  }, undefined, function(error) {
      //console.error('Error MTL file:', error);
  });


}

//INVADERS 2(arancio)
let ufoObject2; 
function loadUfoObject2() {
  const mtlLoader = new MTLLoader();
  mtlLoader.load('AttackOnBase/public/obj/UFO_obj/UFO.mtl', function(materials) {
      //console.log('MTL ok:', materials);

      materials.preload();

      const objLoader2 = new OBJLoader();
      objLoader2.setMaterials(materials);
      objLoader2.load('UFO.obj', function(object2) {
         // console.log('OBJ ok:', object);

       
          object2.position.set(1.30, -2.2, 0);
          object2.scale.set(0.35,0.35, 0.35);
          scene.add(object2);

          ufoObject2 = object2;
          const light = new THREE.PointLight('#ff8c00', 3, 5); // reminder: colore, intensità, distanza
          light.position.set(0, 0, 0);
          object2.add(light); 
          
          object2.castShadow = true;

            ufoDestroyed2 = false;
        

          startAutomaticMovement2();
      });
  }, undefined, function(error) {
      //console.error('Error MTL file:', error);
  });


}


//INVADERS 3(verde acqua)
let ufoObject3; 
function loadUfoObject3() {
  const mtlLoader = new MTLLoader();
  mtlLoader.load('AttackOnBase/public/obj/UFO_obj/UFO.mtl', function(materials) {
      //console.log('MTL ok:', materials);

      materials.preload();

      const objLoader3 = new OBJLoader();
      objLoader3.setMaterials(materials);
      objLoader3.load('UFO.obj', function(object3) {
         // console.log('OBJ ok:', object);

       
          object3.position.set(1.40, -2.3, 0);
          object3.scale.set(0.30,0.30, 0.30);
          scene.add(object3);

          ufoObject3 = object3;
          const light = new THREE.PointLight('#00ffff', 3, 5); // reminder: colore, intensità, distanza
          light.position.set(0, 0, 0);
          object3.add(light); 

          object3.castShadow = true;

            ufoDestroyed3 = false;
        

          startAutomaticMovement3();
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
          object4.castShadow = true;

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

function printHealth() {
  if (!font) {
    return;
  }

 
  if (healthEntity) {
    scene.remove(healthEntity);


    healthEntity.geometry.dispose(); 
    healthEntity.material.dispose();
  }

  //SCORE
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


  mesh.castShadow = true;
  
  healthEntity = mesh;

  scene.add(healthEntity);


  // Animazione GSAP
  healthEntity= gsap.to(mesh.scale, {
    x: 2,
    y: -1.2,
    z: 1.2,
    duration: 0.5, 
    ease: 'power2.out', 
    yoyo: true, 
    repeat: 1,
    onComplete: function() {
      if (healthEntity) {
        scene.remove(healthEntity);
      }
      healthEntity = mesh;
    }
  });
}




/////////////////////////////////////////////////////
                   /*DISTRUZIONE */
/////////////////////////////////////////////////////

//DISTRUZIONE 1
let ufoDestroyed = false;
function frantumaUfo(ufo) {

  if (ufoDestroyed) {
    return;
  }
  ufoDestroyed = true;


  console.log("Frantumazione UFO");
  const particleCount = 100; 
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


 ufoBullets.forEach(bullet => {
  scene.remove(bullet);
});
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




//DISTRUZIONE 2
let ufoDestroyed2 = false;
function frantumaUfo2(ufo2) {

  if (ufoDestroyed2) {
    return;
  }
  ufoDestroyed2 = true;


  console.log("Frantumazione UFO2");
  const particleCount = 100; 
  const particles = new THREE.Group(); 

  for (let i = 0; i < particleCount; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: '#ff8c00', 
      transparent: true,
      opacity: 1.0, 
    });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);

    particle.position.copy(ufo2.position);
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
  scene.remove(ufoObject2); 

 // Rimuovi i proiettili
 ufoBullets.forEach(bullet => {
  scene.remove(bullet);
});
ufoBullets = [];

  if (rocketObject) {
    scene.remove(rocketObject);
    rocketObject = null;
    rocketLaunched = false;
  }

  score += 10;
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
      loadNewUfo2(); 
    } else {
      requestAnimationFrame(animateParticles);
    }

    
  }

  animateParticles(); 

}


//DISTRUZIONE 3
let ufoDestroyed3 = false;
function frantumaUfo3(ufo3) {

  if (ufoDestroyed3) {
    return;
  }
  ufoDestroyed3 = true;


  console.log("Frantumazione UFO3");
  const particleCount = 100; 
  const particles = new THREE.Group(); 

  for (let i = 0; i < particleCount; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: '#00ffff', 
      transparent: true,
      opacity: 1.0, 
    });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);

    particle.position.copy(ufo3.position);
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
  scene.remove(ufoObject3); 

  // Rimuovi i proiettili
  ufoBullets.forEach(bullet => {
    scene.remove(bullet);
  });
  ufoBullets = [];


  if (rocketObject) {
    scene.remove(rocketObject);
    rocketObject = null;
    rocketLaunched = false;
  }

  score += 15;
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
      loadNewUfo3(); 
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
  printHealth(); 

  let scaleFactor = 0.8; 
  ufoObject4.scale.multiplyScalar(scaleFactor);


  if (health <= 0) {
    ufoDestroyed4 = true;

    scene.remove(ufoObject);
    scene.remove(ufoObject2);
    scene.remove(ufoObject3);
    scene.remove(ufoObject4);
    scene.remove (rocketObject);
  ufoBullets.forEach(bullet => {
    scene.remove(bullet);
  });
  ufoBullets = [];

   displayWinText();



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

//UFO2
function loadNewUfo2() {

  if (ufoObject2) {
    scene.remove(ufoObject2);
    ufoObject2 = null;
  }

  loadUfoObject2();
  createRocket(); 
}

//UFO3
function loadNewUfo3() {

  if (ufoObject3) {
    scene.remove(ufoObject3);
    ufoObject3= null;
  }

  loadUfoObject3();
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

    if (ufoVerticalPositionY <= -2) {
      showGameOverText();
      return; 
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
    ufoObject2.position.set(ufoPositionX, ufoVerticalPositionY, 0);

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

    if (ufoVerticalPositionY <= -2) {
      showGameOverText();
      return; 
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
    createBullet(ufoObject2.position.clone()); 

    shootingInterval += 190; 
  }

  animateUFO2();

  gsap.from(ufoObject2.position, {
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
    ufoObject3.position.set(ufoPositionX, ufoVerticalPositionY, 0);

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

    if (ufoVerticalPositionY <= -2) {
      showGameOverText();
      return; 
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
    createBullet(ufoObject3.position.clone()); 

    shootingInterval += 190; 
  }

  animateUFO3();

  gsap.from(ufoObject3.position, {
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

    if (ufoVerticalPositionY <= -2) {
      showGameOverText();
      return; 
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
  if (!rocketObject) {
    //console.error('rocketObject is null or undefined');
    return;
  }

  rocketLaunched = true; 

  gsap.to(rocketObject.position, {
    y: 5,
    duration: 2,
    ease: 'power2.out',
    onComplete: () => {
      if (!rocketObject) {
        return;
      }
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
                      /* POWERUP*/
/////////////////////////////////////////////////////
let powerUps = [];
let fallSpeed = 0.02;
let shootingInterval = 1000; 
let lastShotTime = 0;
let isImmortal = false;

const xmin = -4;  //limite sinistro
const xmax = 4;   //limite destro
const ymax = 5;    //limite superiore

function getRandomPosition() {
  const randomX = Math.random() * (xmax - xmin) + xmin;
  return new THREE.Vector3(randomX, ymax, 0); 

}

function createPowerUp() {
  const position = getRandomPosition();
  const geometry = new THREE.SphereGeometry(0.1, 40, 40);
  const material = new THREE.MeshBasicMaterial({ color: '#ff00ff' });
  const powerUp = new THREE.Mesh(geometry, material);
  powerUp.position.copy(position);
  scene.add(powerUp);
  powerUps.push(powerUp);
}

function startAutomaticMovementPowerUp() {
  const currentTime = performance.now();
  const timeSinceLastShot = currentTime - lastShotTime;

  if (timeSinceLastShot >= shootingInterval) {
    shootPowerUp(); 
    lastShotTime = currentTime; 
  }

  movePowerUps(); 

  checkPowerUpCollision(); 
  requestAnimationFrame(startAutomaticMovementPowerUp);
}

function shootPowerUp() {
  createPowerUp();
  shootingInterval += 20000;
}

function movePowerUps() {
  for (let i = 0; i < powerUps.length; i++) {
    const powerUp = powerUps[i];
    powerUp.position.y -= fallSpeed; 
  }
}

function checkPowerUpCollision() {
  if (rocketObject == null) {
    return;
  }

  if (rocketObject && powerUps.length > 0) {
    for (let i = powerUps.length - 1; i >= 0; i--) {
      const powerUp = powerUps[i];
      const distance = rocketObject.position.distanceTo(powerUp.position);

      if (distance <= 1) {
        becomeImmortal(rocketObject);
        scene.remove(powerUp);
        powerUps.splice(i, 1); 
      }        
    }
  }
}


function becomeImmortal(rocketObject) {

  isImmortal = true;
  const bodyGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 35);
  const bodyMaterial = new THREE.MeshPhongMaterial({ color: 	'#ffd700' });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.5;
  rocketObject.add(body);

  //Punta 
  const coneGeometry = new THREE.ConeGeometry(0.15, 0.3, 36);
  const coneMaterial = new THREE.MeshPhongMaterial({ color: '#000000' });
  const cone = new THREE.Mesh(coneGeometry, coneMaterial);
  cone.position.y = 1.15;
  rocketObject.add(cone);

  //Ali
  const wingGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.1);
  const wingMaterial = new THREE.MeshPhongMaterial({ color: '#000000' });

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

  setTimeout(() => {
    isImmortal = false;
  }, 10000); 
}









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

//2
function checkCollision2() {
  if (rocketObject && ufoObject2 && !ufoDestroyed2) {
    const distance = rocketObject.position.distanceTo(ufoObject2.position);
    if (distance < 1.5) { 
      frantumaUfo2(ufoObject2); 
      destroyRocket();
    }
  }
}

//3
function checkCollision3() {
  if (rocketObject && ufoObject3 && !ufoDestroyed3) {
    const distance = rocketObject.position.distanceTo(ufoObject3.position);
    if (distance < 1.5) { 
      frantumaUfo3(ufoObject3); 
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
  if (rocketObject == null || isImmortal) {
    return; 
  }

  if (rocketObject && ufoBullets.length > 0) {
    for (let i = ufoBullets.length - 1; i >= 0; i--) {
      const bullet = ufoBullets[i];
      const distance = rocketObject.position.distanceTo(bullet.position);

      if (distance <= 1) {
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
  const color = '#dc143c'; 

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


document.addEventListener('keydown', function(event) {
  if (event.key === 'G' || event.key === 'g') {
    restartGame();
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
  if (ufoObject2) {
    scene.remove(ufoObject2);
    ufoObject2 = null;
  }

  if (ufoObject3) {
    scene.remove(ufoObject3);
    ufoObject3 = null;
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


//QUANDO SI PERDE DURANTE IL GIOCO
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

  if (score >= 0 && score < 10 && currentLevel !== "LEVEL 1") {
    displayLevelText("LEVEL 1", '#ff1493', -0.5);
    currentLevel = "LEVEL 1";  
  } else if (score >= 10 && score < 20 && currentLevel !== "LEVEL 2") {
    displayLevelText("LEVEL 2", '#ff8c00', -0.5);
    currentLevel = "LEVEL 2";
    loadUfoObject2(); 
  } else if (score >= 20 && score < 30 && currentLevel !== "LEVEL 3") {
    displayLevelText("LEVEL 3", '#00bfff', -0.5);
    currentLevel = "LEVEL 3";
    loadUfoObject3(); 
  }else if (score >= 30 && currentLevel !== "FINAL BOSS") {
    displayLevelText("FINAL BOSS", '#ff0000', -0.5);
    currentLevel = "FINAL BOSS";
    loadUfoObject4();
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
    checkPowerUpCollision(); 

  }
  
  if (rocketLaunched) {
    checkCollision();
    checkCollision2();
    checkCollision3();
    checkCollision4();
}


  if (ufoObject || ufoObject2 || ufoDestroyed3 || ufoDestroyed4) {
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
/////////////////////////////////////////////////////


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
      <p>Home = return to the home page</p>
      <p>Volume = enable/disable audio</p>
      <p>To save the planet: destroy the invaders, pass the levels and reach the final boss.</p>
      <p>Be careful of the invaders' bullets that could cause you to die.</p>
       <p>You have three lives available</p>
       <p>Pick Up the power Up to became immortal for ten second</p>
       <p>Click R to restart/p>

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
      startAutomaticMovementPowerUp()
      
    
    }

  });
}
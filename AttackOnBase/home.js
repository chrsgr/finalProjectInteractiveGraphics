
import { gsap } from "gsap";

function animateVolum() {
    const volumButtom = document.getElementById('volumButtom');

    gsap.from(volumButtom, {
        opacity: 0,        
        duration: 1.5,      
        ease: 'power1.inOut' 
    });
}

function animateInfo() {
    const info = document.getElementById('info');

    gsap.from(info, {
        opacity: 0,     
        duration: 1.5,      
        ease: 'power1.inOut' 
    });
}

function animatePlanetImage() {
    const planetB = document.getElementById('planetB');

   
    planetB.addEventListener('mouseover', () => {
        gsap.to(planetB, { scale: 1.3, duration: 0.5, ease: "power1.inOut" });
    });

   
    planetB.addEventListener('mouseout', () => {
        gsap.to(planetB, { scale: 1, duration: 0.5, ease: "power1.inOut" });
    });
}


function animateTitle() {
    const title = document.getElementById('attackTitle');

    gsap.from(title, {
        opacity: 0,
        y: -50,
        scale: 0.5,
        rotation: -360,
        duration: 3,
        ease: 'elastic.out(1, 0.5)' 
    });

    gsap.to(title, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 3,
        ease: 'back.out(1.4)' 
    });
}


function animateStartHome() {
    const startHome = document.getElementById('startHome');

    gsap.from(startHome, {
        opacity: 0,        
        duration: 1.5,      
        ease: 'power1.inOut' 
    });


     
       startHome.addEventListener('mouseover', () => {
        gsap.to(startHome, { scale: 1.3, duration: 0.5, ease: "power1.inOut" });
    });

   
    startHome.addEventListener('mouseout', () => {
        gsap.to(startHome, { scale: 1, duration: 0.5, ease: "power1.inOut" });
    });

    
}



function animateAstroImage() {
    const astro = document.getElementById('astro');

    gsap.from(astro, {
        opacity: 0,         
        scale: 0.5,         
        rotation: -180,     
        duration: 1.5,      
        ease: 'back.out(1.7)', 
    });

    astro.addEventListener('mouseover', () => {
        gsap.to(astro, { scale: 1.2, duration: 0.5, ease: "power1.inOut" });
    });

    astro.addEventListener('mouseout', () => {
        gsap.to(astro, { scale: 1, duration: 0.5, ease: "power1.inOut" });
    });
}


window.onload = function() {
    animatePlanetImage();
    animateTitle(); 
    animateStartHome();
    animateVolum();
    animateInfo();
    animateAstroImage();
};






function goToIndexPage() {
    const astro = document.getElementById('astro');
    const smoke = document.createElement('div');
    smoke.classList.add('smoke');

    //fumo sotto l'astronauta
    astro.parentNode.insertBefore(smoke, astro.nextSibling);

    
    gsap.to(smoke, {
        height: '100%',  
        width: '10%',   
        opacity: 1,    
        y: '100%',     
        duration: 1.7,
        ease: 'power3.out',
        onComplete: function() {
            window.location.href = "game.html";
        }
    });

    
    gsap.to(astro, {
        y: -window.innerHeight, 
        duration: 1,
        ease: 'power3.out'
    });

    // Effetto di uscita all'elemento principale (il body)
    gsap.to('body', {
        opacity: 0,
        duration: 1, 
        ease: 'power1.inOut'
    });
}




document.addEventListener('DOMContentLoaded', function () {
    const startHome = document.getElementById('startHome');
    startHome.addEventListener('click', goToIndexPage);
  });


  //POPUP
  function goToPopUp() {
    //elemento div per il pop-up
    var popup = document.createElement('div');
    popup.id = 'popup';
    popup.style.width = 'auto'; 
    popup.style.height = 'auto'; 
    popup.style.backgroundColor = '#ffffff'; 
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
        <h2>Developed by:</h2>
        <h3>Chiara Segretario</h3>
        <p>Engineering in Computer Science</p>
        <p>2023/2024</p>
        <p>"Sapienza" University of Rome</p>
        <button id="closePopUp">CLOSE</button>
    `;
    
    // add pop-up alla pagina
    document.body.appendChild(popup);
    
  
    popup.style.opacity = '1';
    
    
    //CLOSE
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
    const info = document.getElementById('info');
    info.addEventListener('click', goToPopUp);
});





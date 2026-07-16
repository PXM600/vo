// ==========================================
// ELEMENTOS
// ==========================================

const screens = document.querySelectorAll(".screen");

const openAlbum = document.getElementById("openAlbum");
const startGallery = document.getElementById("startGallery");

const photo = document.getElementById("photo");
const caption = document.getElementById("captionText");

const typing = document.getElementById("typing");

const progress = document.getElementById("progress");

// ==========================================
// GALERIA
// ==========================================

const gallery = [

{
    image:"img/1.jpg",
    text:"Algumas pessoas passam pela nossa vida... você construiu a minha."
},

{
    image:"img/2.jpg",
    text:"Seu abraço sempre foi o lugar mais seguro do mundo."
},

{
    image:"img/3.jpg",
    text:"Cada sorriso seu virou uma lembrança eterna."
},

{
    image:"img/4.jpg",
    text:"Obrigado por cada almoço, cada conversa e cada carinho."
},

{
    image:"img/5.jpg",
    text:"Seu amor deixou marcas que o tempo nunca apagará."
},

{
    image:"img/6.jpg",
    text:"Você é uma das pessoas mais importantes da minha história."
},

{
    image:"img/7.jpg",
    text:"Minha infância ficou muito mais bonita porque você fazia parte dela."
},

{
    image:"img/8.jpg",
    text:"Feliz aniversário, vó. Eu amo você. ❤️"
}

];

// ==========================================
// MENSAGEM
// ==========================================

const finalMessage =
"Algumas pessoas deixam lembranças. Você deixou amor, carinho e uma família inteira feliz. Obrigado por tudo. ❤️";

let current = 0;
let galleryTimer;

// ==========================================
// TROCAR TELA
// ==========================================

function showScreen(id){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    document
    .getElementById(id)
    .classList.add("active");

}

// ==========================================
// PROGRESSO
// ==========================================

function updateProgress(value){

    progress.style.width = value + "%";

}

// ==========================================
// CAPA
// ==========================================

openAlbum.onclick = ()=>{

    showScreen("letter");

    updateProgress(20);

};

// ==========================================
// INICIAR GALERIA
// ==========================================

startGallery.onclick = ()=>{

    showScreen("gallery");

    current = 0;

    loadPhoto();

    updateProgress(35);

    galleryTimer = setInterval(nextPhoto,7000);

};

// ==========================================
// FOTO
// ==========================================

function loadPhoto(){

    photo.style.opacity = 0;
    photo.style.transform = "scale(.92) rotate(-5deg)";

    setTimeout(()=>{

        photo.src = gallery[current].image;

        caption.innerHTML = gallery[current].text;

        photo.style.opacity = 1;
        photo.style.transform = "scale(1) rotate(0deg)";

    },500);

}

// ==========================================
// PRÓXIMA FOTO
// ==========================================

function nextPhoto(){

    current++;

    updateProgress(
        35 + (current/gallery.length)*40
    );

    if(current >= gallery.length){

        clearInterval(galleryTimer);

        setTimeout(showMessage,1500);

        return;

    }

    loadPhoto();

}

// ==========================================
// TEXTO
// ==========================================

function showMessage(){

    showScreen("message");

    updateProgress(85);

    typing.innerHTML = "";

    let i = 0;

    const timer = setInterval(()=>{

        typing.innerHTML += finalMessage.charAt(i);

        i++;

        if(i >= finalMessage.length){

            clearInterval(timer);

            setTimeout(showFinal,5000);

        }

    },45);

}

// ==========================================
// FINAL
// ==========================================

function showFinal(){

    showScreen("final");

    updateProgress(100);

}

// ==========================================
// PARTÍCULAS
// ==========================================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize(){

    canvas.width = innerWidth;
    canvas.height = innerHeight;

}

resize();

window.addEventListener("resize",resize);

const particles = [];

for(let i=0;i<80;i++){

    particles.push({

        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,

        size:Math.random()*3+1,

        speed:Math.random()*0.5+0.2,

        angle:Math.random()*Math.PI*2,

        alpha:Math.random()*0.6+0.2

    });

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        p.y-=p.speed;
        p.x+=Math.cos(p.angle)*0.15;

        if(p.y<-10){

            p.y=canvas.height+10;
            p.x=Math.random()*canvas.width;

        }

        ctx.beginPath();

        ctx.fillStyle=`rgba(197,155,92,${p.alpha})`;

        ctx.arc(

            p.x,
            p.y,
            p.size,
            0,
            Math.PI*2

        );

        ctx.fill();

    });

    requestAnimationFrame(animate);

}

animate();
// Animated Text//


var typed = new Typed(".auto-type", {
    strings: ["UX/UI Designer", "Illustrator", "3D Designer",],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true
})




// scroll to top button/



// Circle Follow Cursor/

const cursor = document.querySelector("#cursor");
const cursorBorder = document.querySelector("#cursor-border");
const cursorPos = { x: 0, y: 0 };
const cursorBorderPos = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  cursorPos.x = e.clientX;
  cursorPos.y = e.clientY;

  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

requestAnimationFrame(function loop() {
  const easting = 8;
  cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
  cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;

  cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
  requestAnimationFrame(loop);
});

document.querySelectorAll("[data-cursor]").forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    if (item.dataset.cursor === "pointer") {
      cursorBorder.style.backgroundColor = "rgba(255, 255, 255, .6)";
      cursorBorder.style.setProperty("--size", "30px");
    }
    if (item.dataset.cursor === "pointer2") {
      cursorBorder.style.backgroundColor = "white";
      cursorBorder.style.mixBlendMode = "difference";
      cursorBorder.style.setProperty("--size", "80px");
    }
  });
  item.addEventListener("mouseout", (e) => {
    cursorBorder.style.backgroundColor = "unset";
    cursorBorder.style.mixBlendMode = "unset";
    cursorBorder.style.setProperty("--size", "50px");
  });
});




// Scroll Fade//






// about 








setTimeout(function() {
  var animating = document.querySelectorAll('.highlighted.animating');
  for (var i = 0; i < animating.length; i++) {
    animating[i].classList.remove('animating');
  }
}, 2000);



const link = document.querySelectorAll('.link');
const linkHoverReveal = document.querySelectorAll('.hover-reveal');
const linkImages = document.querySelectorAll('.hidden-img');


for(let i = 0; i < link.length; i++) {
  link[i].addEventListener('mousemove', (e) => {
    linkHoverReveal[i].style.opacity = 1;
    linkHoverReveal[i].style.transform = `translate(-100%, -50% ) rotate(5deg)`;
    linkImages[i].style.transform = 'scale(1, 1)';
    linkHoverReveal[i].style.left = e.clientX + "px";
  })
  
  link[i].addEventListener('mouseleave', (e) => {
    linkHoverReveal[i].style.opacity = 0;
    linkHoverReveal[i].style.transform = `translate(-50%, -50%) rotate(-5deg)`;
    linkImages[i].style.transform = 'scale(0.8, 0.8)';
  })
}





const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const links = [...document.querySelectorAll('li')];

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}



let imgIndex = 0;
// Load images into an array for reference
const images = [
    './images/1.jpeg',
    './images/2.jpeg',
    './images/3.jpeg',
    './images/4.jpeg',
    './images/5.jpeg',
    './images/6.jpeg',
    './images/7.jpeg',
    './images/8.jpeg'
]

let imgArr = [];

// Canvas mousemove varaibles

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener('mousemove', (e)=> {
    targetX = e.clientX;
    targetY = e.clientY;
    
})

images.forEach((image, idx) => {
    let elImage = new Image(300);
    elImage.src = image;
    elImage.classList.add('projects-image');
    document.body.append(elImage);
    imgArr.push(elImage)
})

// Draw images to the canvas

let percent = 0;
let target = 0;

function drawImage(idx){
    let {width, height} = imgArr[idx].getBoundingClientRect();

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // pixelate by diabling the smoothing
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    if(target === 1){ // Link has been hovered
        // 2 speeds to make the effect more gradual
        if(percent < 0.2){
            percent += .01;
        }else if(percent < 1){
            percent += .1;
        }
    }else if(target === 0){
        if(percent > 0.2){
            percent -= .3
        }else if( percent > 0){
            percent -= .01;
        }
    }

    let scaledWidth = width * percent;
    let scaledHeight = height * percent;

    if(percent >= 1){
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.drawImage(imgArr[idx], 0, 0, width, height);
    }else{
        ctx.drawImage(imgArr[idx], 0, 0, scaledWidth, scaledHeight);
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        if(canvas.width !== 0 && canvas.height !== 0){
            ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height)
        }
    }
}

for(let i = 0; i < links.length; i++){
    links[i].addEventListener('mouseover', () => {
        for(let j = 0; j < links.length; j++){
            if(j !== i){
                links[j].style.opacity = 0.2;
                links[j].style.zIndex = 0;
            }else{
                links[j].style.opacity = 1;
                links[j].style.zIndex = 3;
            }
        }
    })

    links[i].addEventListener('mouseleave', () => {
        for(let i = 0; i < links.length; i++){
            links[i].style.opacity = 1;
        }
    })

    links[i].addEventListener('mouseenter', () => {
        imgIndex = i;
        target = 1
    });

    links[i].addEventListener('mouseleave', () => {
        target = 0;
    })
}

function animate(){
    currentX = lerp(currentX, targetX, 0.075);
    currentY = lerp(currentY, targetY, 0.075);
    let { width, height} = imgArr[imgIndex].getBoundingClientRect();
    canvas.style.transform = `translate3d(${currentX - (width / 2)}px, ${currentY - (height / 2)}px, 0)`;
    drawImage(imgIndex);
    window.requestAnimationFrame(animate);
}

animate()


//portfolio section





function climaCity(){
    window.location.href = "ClimaCity/index.html";
}
function calculadora(){
    window.location.href = "Calculadora/index.html";
}

let currentImageIndex = 0;

function changeImage(event, direction) {
    const container = event.target.closest('.card-img'); 
    const images = container.querySelectorAll(".img");
    let currentImageIndex = Array.from(images).findIndex(img => img.classList.contains("visible"));

    images[currentImageIndex].classList.remove("visible");
    images[currentImageIndex].classList.add("invisible");

    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;

    images[currentImageIndex].classList.remove("invisible");
    images[currentImageIndex].classList.add("visible");
}



document.querySelectorAll('.img').forEach(function(element) {
    element.addEventListener("click", function () {
        switch (element.classList[1]) {
            case "weather":
                document.querySelector('#container-emergente').style.display = "block";
                

                document.querySelector('footer').classList.add('blur');
                document.querySelector('main').classList.add('blur');
                document.querySelector('header').classList.add('blur');
            break;

            case "SegundoProyecto":
            break;
        }
    });
});

function exitZoom() {
    document.querySelector('#container-emergente').style.display = "none";
    document.querySelector('footer').classList.remove('blur');
    document.querySelector('main').classList.remove('blur');
    document.querySelector('header').classList.remove('blur');
}
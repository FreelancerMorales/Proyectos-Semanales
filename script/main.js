function climaCity(){
    window.location.href = "ClimaCity/index.html";
}

function imgRight() {
    const img = document.querySelectorAll(".weather");
    const imgLeft = img[0];
    const imgRight = img[1];
    imgLeft.classList.remove("visible");
    imgLeft.classList.add("invisible");
    imgRight.classList.remove("invisible");
    imgRight.classList.add("visible");
}

function imgLeft() {
    const img = document.querySelectorAll(".weather");
    const imgLeft = img[0];
    const imgRight = img[1];
    imgRight.classList.remove("visible");
    imgRight.classList.add("invisible");
    imgLeft.classList.remove("invisible");
    imgLeft.classList.add("visible");
}

/* Get sketch-pad div, set it's size 6px less, because offsetHeight picks width with border */
const sketchPad = document.querySelector(".sketch-pad");
let padSize = (sketchPad.offsetHeight - 6);

/* Set default parameters of pixels in a row and their colour when hovered over */
let pixelRow = 16;
let pixelColor = '#000000';

/* Pick up necessary elements from the DOM */
const slider = document.getElementById("myRange");
const rangeDisplay = document.getElementById("rangedisplay");
const colorPicker = document.getElementById("colorPick");
const resetButton = document.getElementById("resetbtn");
const eraser = document.getElementById("eraser");

/* Run these functions first to get all default settings */
createGrid(padSize, pixelRow);
colorfulPixels();

/* When reset button is pushed, reset sketch-pad by deleting data from old one and creating a new one */
resetButton.addEventListener('click', () => {
    sketchPad.textContent = '';
    createGrid(padSize, pixelRow);
    colorfulPixels();
    resetEraser();
});

/* When eraser button is clicked set pixelColor to the same color as the sketch-pad, make it active */
eraser.addEventListener('click', () => {
    pixelColor = '#fff';
    eraser.classList.toggle("active");

    /* If class active is toggled, add an eraser cursor, else add a pencil cursor */
    if (eraser.classList.contains("active")) {
        sketchPad.style.cursor = "url(assets/eraser.svg) 15 15, auto";
    }
    else {
        sketchPad.style.cursor = "url(assets/pencil.svg) 0 30, auto";
        pixelColor = colorPicker.value;
    }
});

/* When range slider is moved display the value, reset the sketch-pad */
slider.oninput = function() {
    rangeDisplay.textContent = `${this.value} Pixels`;
    sketchPad.textContent = '';
    pixelRow = this.value;
    createGrid(padSize, pixelRow);
    colorfulPixels();
    resetEraser();
};

/* If the color is changed, change the color and reset the eraser icon */
colorPicker.oninput = function() {
    pixelColor = this.value;
    resetEraser();
};

function resetEraser() {
    eraser.classList.remove("active");
    pixelColor = colorPicker.value;
    sketchPad.style.cursor = "url(assets/pencil.svg) 0 30, auto";
};

/* Create the grid with a specified amount of pixels */
function createGrid(padSize, pixelRow) {
    let pixelSize = padSize / pixelRow;
    let pixelAmount = pixelRow * pixelRow;

    /* Run a loop where each pixel is created with a class of "pixel" */
    i = 0;
    while (i < pixelAmount) {
        let onePixel = document.createElement("div");
        onePixel.classList.add("pixel");
        onePixel.style.height = `${pixelSize}px`;
        onePixel.style.width = `${pixelSize}px`;
        sketchPad.appendChild(onePixel);
        i++;
    }
};

/* Pick up all the pixels and on mouse over + click change their color to the one specified */
function colorfulPixels() {
    let pixels = document.getElementsByClassName("pixel");
    let pixelsArray = Array.prototype.slice.call(pixels);

    pixelsArray.forEach((pixel) => {
        pixel.addEventListener('mouseover', (e) => {
            if (e.buttons === 1) {
                pixel.style.backgroundColor = pixelColor;
            }
        });
    })
};
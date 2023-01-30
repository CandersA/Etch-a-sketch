const sketchPad = document.querySelector(".sketch-pad");
let padSize = (sketchPad.offsetHeight - 6);
let pixelRow = 16;
let pixelColor = '#000000';
const slider = document.getElementById("myRange");
const rangeDisplay = document.getElementById("rangedisplay");
const colorPicker = document.getElementById("colorPick");
const resetButton = document.getElementById("resetbtn");
const eraser = document.getElementById("eraser");

createGrid(padSize, pixelRow);
colorfulPixels();

resetButton.addEventListener('click', () => {
    sketchPad.textContent = '';
    createGrid(padSize, pixelRow);
    colorfulPixels();
    resetEraser();
});

eraser.addEventListener('click', () => {
    pixelColor = '#fff';
    eraser.classList.toggle("active");
    console.log(eraser.classList.contains("active"));
    if (eraser.classList.contains("active")) {
        sketchPad.style.cursor = "url(assets/eraser.svg) 15 15, auto";
    }
    else {
        sketchPad.style.cursor = "url(assets/pencil.svg) 0 30, auto";
        pixelColor = colorPicker.value;
    }
});

slider.oninput = function() {
    rangeDisplay.textContent = `${this.value} Pixels`;
    sketchPad.textContent = '';
    pixelRow = this.value;
    createGrid(padSize, pixelRow);
    colorfulPixels();
    resetEraser();
};

colorPicker.oninput = function() {
    pixelColor = this.value;
    resetEraser();
};

function resetEraser() {
    eraser.classList.remove("active");
    pixelColor = colorPicker.value;
    sketchPad.style.cursor = "url(assets/pencil.svg) 0 30, auto";
};

function createGrid(padSize, pixelRow) {
    let pixelSize = padSize / pixelRow;
    let pixelAmount = pixelRow * pixelRow;

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
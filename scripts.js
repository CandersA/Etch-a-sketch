console.log("JS");

const sketchPad = document.querySelector(".sketch-pad");
let padSize = sketchPad.offsetHeight;
let pixelRow = 16;
createGrid(padSize, pixelRow);

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
}

let slider = document.getElementById("myRange");
const rangeDisplay = document.getElementById("rangedisplay");

slider.oninput = function() {
    rangeDisplay.textContent = this.value;
    sketchPad.textContent = '';
    pixelRow = this.value;
    console.log(pixelRow);
    createGrid(padSize, pixelRow);
  }
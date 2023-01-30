console.log("JS");

const sketchPad = document.querySelector(".sketch-pad");
let padSize = sketchPad.offsetHeight;

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

createGrid(padSize, 29);
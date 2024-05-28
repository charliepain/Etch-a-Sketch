const DRAWING_AREA_SIDE_LENGTH = 960;
// numberSquares refers to the number of squares on each side of the grid
function loadDrawingBoard(numberSquares) {
    for (let i = 0; i < numberSquares; i++) {
        const drawingArea = document.querySelector(".drawing-area");
        // Add rows
        const row = document.createElement("div");
        row.classList.add("row");
        drawingArea.appendChild(row);
        // Add squares for each row
        for (let j = 0; j < numberSquares; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.width = `${960 / numberSquares}px`;
            square.style.height = square.style.width;
            row.appendChild(square);
        }
    }
}

function draw(e) {
    e.target.style.removeProperty("background-color");
    e.target.style.removeProperty("opacity");
    e.target.classList.add("drawn-on");
}

// This function is used to generate random rgb values for drawing
// in random colors
function generateRandomInteger(startRange, endRange) {
    return Math.floor(Math.random() * (endRange - startRange + 1)
        + startRange);
}

function drawRandomColors(e) {
    const redValue = generateRandomInteger(0, 255);
    const greenValue = generateRandomInteger(0, 255);
    const blueValue = generateRandomInteger(0, 255);
    const randomColor = `rgb(${redValue} ${greenValue} ${blueValue})`;
    e.target.style.backgroundColor = randomColor;
}

function drawGradual(e) {

    if (e.target.classList.contains("drawn-on")
    && e.target.style.opacity !== "") {
        newOpacity = `${Number(e.target.style.opacity) + 0.1}`;
        e.target.style.opacity = newOpacity;
    } else if (e.target.style.backgroundColor === ""
        && !e.target.classList.contains("drawn-on")) {
        e.target.classList.add("drawn-on");
        e.target.style.opacity = "0.1";
    }
}

function askNewNumberSquares() {
    let newNumberSquares;
    do {
        newNumberSquares = prompt("Enter number of squares for the new grid."
            + " This will erase the current grid."
            + " The value entered must be an integer between 1 and 100.",
            numberSquares
        );
        // Validate numberSquares
        if (newNumberSquares === null) return -1;
        if (newNumberSquares !== "") {
            newNumberSquares = Number(newNumberSquares);
        }
    } while (newNumberSquares === ""
    || newNumberSquares === NaN
    || !Number.isInteger(newNumberSquares)
    || newNumberSquares < 1
        || newNumberSquares > 100
    )
    return newNumberSquares;
}

function updateDisplayedNumberSquares() {
    const displayedNumberSquares = document.querySelector(".number-squares");
    displayedNumberSquares.textContent = `Number of squares per side:`
        + ` ${numberSquares}`;
}

// Variable indicating the drawing mode, can be 
// "normal", "random", "gradual"
let drawingMode = "normal";
// Variable containing the number of squares per side of the grid
let numberSquares = 16;
loadDrawingBoard(numberSquares);
updateDisplayedNumberSquares();

// Changing drawing modes
let mode = document.querySelector(".mode");
mode.addEventListener("click", (e) => {
    if (e.target.hasAttribute("name")) {
        drawingMode = e.target.classList[0];
    }
});

const drawingArea = document.querySelector(".drawing-area");
// activate drawing
drawingArea.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("square")) {
        drawBasedOnMode =
            drawingMode === "normal" ? draw :
                drawingMode === "random" ? drawRandomColors :
                    drawGradual;
        drawingArea.addEventListener("mouseover", drawBasedOnMode);
    }
});
// deactivate drawing
drawingArea.addEventListener("mouseup", (e) => {
    if (e.target.classList.contains("square")) {
        drawingArea.removeEventListener("mouseover", drawBasedOnMode);
    }
});
// Change number of squares on each side of grid
const setNumberSquaresButton = document.querySelector(".set-number-squares");
setNumberSquaresButton.addEventListener("click", (e) => {
    numberSquaresEntered = askNewNumberSquares();
    if (numberSquaresEntered === -1) return;
    numberSquares = numberSquaresEntered;
    const drawingArea = document.querySelector(".drawing-area");
    // Delete current grid
    drawingArea.textContent = "";
    // Add new squares
    loadDrawingBoard(numberSquares);
    updateDisplayedNumberSquares(numberSquares);
});


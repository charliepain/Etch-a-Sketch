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
    e.target.classList.add("drawn-on");
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
        console.log(!Number.isInteger(newNumberSquares));
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

// Variable containing the number of squares per side of the grid
let numberSquares = 16;
loadDrawingBoard(numberSquares);
updateDisplayedNumberSquares();

const drawingArea = document.querySelector(".drawing-area");
// activate drawing
drawingArea.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("square")) {
        e.target.classList.add("drawn-on");
        drawingArea.addEventListener("mouseover", draw);
    }
});
// deactivate drawing
drawingArea.addEventListener("mouseup", (e) => {
    if (e.target.classList.contains("square")) {
        drawingArea.removeEventListener("mouseover", draw);
    }
});

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


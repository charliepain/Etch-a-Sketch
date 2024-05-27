const DRAWING_AREA_SIDE_LENGTH = 960;
function loadDrawingBoard(sideLength) {
    for (let i = 0; i < sideLength; i++) {
        const drawingArea = document.querySelector(".drawing-area");
        // Add rows
        const row = document.createElement("div");
        row.classList.add("row");
        drawingArea.appendChild(row);
        // Add squares for each row
        for (let j = 0; j < sideLength; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.width = `${960 / sideLength}px`;
            square.style.height = square.style.width;
            row.appendChild(square);
        }
    }
}

function draw(e) {
    e.target.classList.add("drawn-on");
}

function askNewLength() {
    let newLength;
    do {
        newLength = prompt("Enter number of squares for the new grid."
            + " This will erase the current grid."
            + " The value entered must be an integer between 1 and 100.",
        length
        );
        // Validate length
        if (newLength === null) return -1;
        if (newLength !== "") newLength = Number(newLength);
        console.log(!Number.isInteger(newLength));
    } while (newLength === ""
    || newLength === NaN
    || !Number.isInteger(newLength)
    || newLength < 1
    || newLength > 100
    ) 
    return newLength;
}

function updateDisplayedLength() {
    const displayedLength = document.querySelector(".length");
    displayedLength.textContent = `Number of squares per side: ${length}`;
}

// Variable containing the number of squares per side of the grid
let length = 16;
loadDrawingBoard(length);
updateDisplayedLength();

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

const setLengthButton = document.querySelector(".setLength");
setLengthButton.addEventListener("click", (e) => {
    lengthEntered = askNewLength();
    if (lengthEntered === -1) return;
    length = lengthEntered;
    const drawingArea = document.querySelector(".drawing-area");
    // Delete current grid
    drawingArea.textContent = "";
    // Add new squares
    loadDrawingBoard(length);
    updateDisplayedLength(length);
});


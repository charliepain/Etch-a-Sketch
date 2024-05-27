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

loadDrawingBoard(16);

const drawingArea = document.querySelector(".drawing-area");
// activate drawing
drawingArea.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("square")) {
        drawingArea.addEventListener("mouseover", draw);
    }
});
// deactivate drawing
drawingArea.addEventListener("mouseup", (e) => {
    if (e.target.classList.contains("square")) {
        drawingArea.removeEventListener("mouseover", draw);
    }
})


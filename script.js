const DRAWING_AREA_SIDE_LENGTH = 960;
function loadDrawingBoard(numberSquares) {
    for (let i = 0; i < numberSquares; i++) {
        console.log("hi");
        const drawingArea = document.querySelector(".drawing-area");
        const row = document.createElement("div");
        row.classList.add("row");
        drawingArea.appendChild(row);
        for (let j = 0; j < numberSquares; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.width = `${960 / numberSquares}px`;
            square.style.height = square.style.width;
            row.appendChild(square);
        }
    }
}
loadDrawingBoard(16);
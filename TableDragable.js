let isDragging = false;
let selectedElement = null;
function makeTableDraggable(tableElement) {
    let isDragging = false;

    tableElement.style.position = 'relative';
    tableElement.style.top = '0';
    tableElement.style.left = '0';

    tableElement.addEventListener("mousedown", (event) => {
        isDragging = true;
        selectedElement = tableElement;
        const offsetX = event.clientX - tableElement.getBoundingClientRect().left;
        const offsetY = event.clientY - tableElement.getBoundingClientRect().top;

        document.addEventListener("mousemove", (event) => {
            if (isDragging && selectedElement) {
                selectedElement.style.left = event.clientX - offsetX + "px";
                selectedElement.style.top = event.clientY - offsetY + "px";
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            selectedElement = null;
        });
    });
}
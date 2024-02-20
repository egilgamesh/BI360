function makeElementDraggable(element) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    element.style.position = 'relative';
    element.style.cursor = 'move';

    element.addEventListener("mousedown", (event) => {
        isDragging = true;

        // Calculate offset based on the mouse position and the current position of the element
        offsetX = Math.min(event.clientX , element.getBoundingClientRect().left) ;
        offsetY = Math.min(event.clientY , element.getBoundingClientRect().top);

        element.style.cursor = 'move';
        document.body.style.userSelect = 'none';

        // Set the initial position directly, considering the initial offset
        element.style.left = event.clientX - offsetX + "px";
        element.style.top = event.clientY - offsetY + "px";
    });

    document.addEventListener("mousemove", (event) => {
        if (isDragging) {
            // Set the position directly, considering the initial offset
            element.style.left = event.clientX - offsetX + "px";
            element.style.top = event.clientY - offsetY + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;

            element.style.cursor = 'move';
            document.body.style.userSelect = 'auto';
        }
    });
}
function makeElementDraggable(element, options = {}) {
    let isDragging = false;
    let initialMouseOffsetX = 0;
    let initialMouseOffsetY = 0;
    let initialElementOffsetX = 0;
    let initialElementOffsetY = 0;
    let initialScrollX = 0;
    let initialScrollY = 0;

    const {
        constrainToWindow = false,
        constrainToElement = null,
        onStart = () => {},
        onDrag = () => {},
        onStop = () => {}
    } = options;

    function startDragging(event) {
        event.preventDefault();
        isDragging = true;

        const boundingRect = element.getBoundingClientRect();
        initialMouseOffsetX = event.clientX;
        initialMouseOffsetY = event.clientY;
        initialElementOffsetX = boundingRect.left + window.scrollX;
        initialElementOffsetY = boundingRect.top + window.scrollY;
        initialScrollX = window.scrollX;
        initialScrollY = window.scrollY;

        element.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        element.style.zIndex = 1000;

        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDragging);
        
        onStart();
    }

    function drag(event) {
        if (isDragging) {
            let deltaX = event.clientX - initialMouseOffsetX;
            let deltaY = event.clientY - initialMouseOffsetY;
            let x = initialElementOffsetX + deltaX - initialScrollX;
            let y = initialElementOffsetY + deltaY - initialScrollY;

            if (constrainToWindow) {
                x = Math.max(0, Math.min(x, window.innerWidth - element.offsetWidth));
                y = Math.max(0, Math.min(y, window.innerHeight - element.offsetHeight));
            }

            if (constrainToElement) {
                const containerRect = constrainToElement.getBoundingClientRect();
                x = Math.max(containerRect.left + window.scrollX, Math.min(x, containerRect.right + window.scrollX - element.offsetWidth));
                y = Math.max(containerRect.top + window.scrollY, Math.min(y, containerRect.bottom + window.scrollY - element.offsetHeight));
            }

            element.style.transform = `translate(${x}px, ${y}px)`;
            onDrag({ x, y });
        }
    }

    function stopDragging() {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = 'grab';
            document.body.style.userSelect = '';
            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", stopDragging);
            onStop({ x: initialElementOffsetX, y: initialElementOffsetY });
        }
    }

    function handleTouch(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            const touch = event.changedTouches[0];
            startDragging(touch);
        }
    }

    function destroy() {
        stopDragging();
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", stopDragging);
        element.removeEventListener("mousedown", startDragging);
        element.removeEventListener("touchstart", handleTouch);
    }

    element.addEventListener("mousedown", startDragging);
    element.addEventListener("touchstart", handleTouch);

    element.style.touchAction = 'none';
    element.draggable = false;

    return {
        destroy,
        getElementPosition: () => ({
            x: element.offsetLeft,
            y: element.offsetTop
        }),
        resetElementPosition: () => {
            element.style.transform = 'none';
            onDrag({ x: initialElementOffsetX, y: initialElementOffsetY });
        }
    };
}

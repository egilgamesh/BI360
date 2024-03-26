class IntractClient {
    constructor(element, callback) {
        this.cardContainer = element;
        this.initInteractJS(element);
        this.resizeCallback = callback; // Callback function to handle resizing updates
    }

    initInteractJS(element) {
        interact(element)
            .draggable({
                snap: {
                    targets: [interact.createSnapGrid({ x: 10, y: 10 })],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                },
                onmove: (event) => {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                    if (typeof this.resizeCallback === "function") {
                        const newSize = this.getSize();
                        const newPosition = this.getPosition();
                        this.resizeCallback(this.cardContainer, newSize.width, newSize.height, newPosition.top, newPosition.left);
                    }
                },
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                onmove: (event) => {
                    const target = event.target;
                    const x = parseFloat(target.getAttribute('data-x')) || 0;
                    const y = parseFloat(target.getAttribute('data-y')) || 0;

                    target.style.width = event.rect.width + 'px';
                    target.style.height = event.rect.height + 'px';

                    const newSize = this.getSize();
                    const newPosition = this.getPosition();

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                    if (typeof this.resizeCallback === "function") {
                        this.resizeCallback(this.cardContainer, newSize.width, newSize.height, newPosition.top, newPosition.left);
                    }
                },
            });
    }

    getPosition() {
        const rect = this.cardContainer.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left
        };
    }

    getSize() {
        return {
            width: this.cardContainer.clientWidth,
            height: this.cardContainer.clientHeight
        };
    }
}

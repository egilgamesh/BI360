class IntractClient {
    constructor(element) {
        this.cardContainer = element;
        this.initInteractJS(element);

    }

    initInteractJS(element) {
        interact(element)
            .draggable({
                snap: {
                    targets: [interact.createSnapGrid({ x: 10, y: 10 })],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                },
                onmove: function (event) {
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                onmove: function (event) {
                    var target = event.target;
                    var x = parseFloat(target.getAttribute('data-x')) || 0;
                    var y = parseFloat(target.getAttribute('data-y')) || 0;

                    target.style.width = event.rect.width + 'px';
                    target.style.height = event.rect.height + 'px';

                    x += event.deltaRect.left;
                    y += event.deltaRect.top;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
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
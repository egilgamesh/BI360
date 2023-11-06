class ResizableCard {
    constructor(cardContainer, cardContent, callback) {
        this.cardContainer = cardContainer;
        this.cardContent = cardContent;
        this.isResizing = false;
        this.isDragging = false;
        this.isSelected = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.resizeCallback = callback; // Callback function to handle resizing updates
        cardContainer.style.transition = "border 0.2s"; // Add transition for a smooth effect
        this.updateHighlight();

        cardContainer.addEventListener("mousedown", this.handleMouseDown.bind(this));
        window.addEventListener("mousemove", this.handleMouseMove.bind(this));
        window.addEventListener("mouseup", this.handleMouseUp.bind(this));

        cardContent.addEventListener("mousedown", this.handleCardContentMouseDown.bind(this));

        // Listen for mouse events for highlighting
        cardContainer.addEventListener("mousedown", this.handleMouseOver.bind(this));
        cardContainer.addEventListener("mouseup", this.handleMouseOut.bind(this));
    }

    handleMouseDown(e) {
        if (e.target === this.cardContainer && e.offsetX >= this.cardContainer.clientWidth - 10 && e.offsetY >= this.cardContainer.clientHeight - 10)
         {
            this.isResizing = true;
            this.offsetX = e.clientX - this.cardContainer.getBoundingClientRect().right;
            this.offsetY = e.clientY - this.cardContainer.getBoundingClientRect().bottom;
            e.preventDefault();
        }
    }

    handleMouseMove(e) {
        if (this.isResizing) {
            const newWidth = e.clientX - this.cardContainer.getBoundingClientRect().left + this.offsetX;
            const newHeight = e.clientY - this.cardContainer.getBoundingClientRect().top + this.offsetY;
            this.cardContainer.style.width = newWidth + "px";
            this.cardContainer.style.height = newHeight + "px";
            if (typeof this.resizeCallback === "function") {
                this.resizeCallback(this.cardContainer,newWidth, newHeight);
            }
        } else if (this.isDragging) {
            this.cardContainer.style.left = e.clientX - this.offsetX + "px";
            this.cardContainer.style.top = e.clientY - this.offsetY + "px";
        }
    }

    handleMouseUp() {
        this.isResizing = false;
        this.isDragging = false;
    }

    handleCardContentMouseDown(e) {
        const Svg = this.cardContent.querySelector(".card-content > svg");
        if (e.target === Svg) {
            this.isDragging = true;
            this.offsetX = e.clientX - this.cardContainer.getBoundingClientRect().left;
            this.offsetY = e.clientY - this.cardContainer.getBoundingClientRect().top;
            console.log("cardClicked");
        }
    }

    handleMouseOver() {
        this.isSelected = true;
        this.updateHighlight();
    }

    handleMouseOut() {
        this.isSelected = false;
        this.updateHighlight();
    }

    updateHighlight() {
        if (this.isSelected) {
            this.cardContainer.style.border = "2px solid #F96161";
        } else {
            this.cardContainer.style.border = "2px solid #ccc";
        }
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

// export default ResizableCard;

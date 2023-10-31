class ResizableCard {
    constructor(cardContainer, cardContent) {
        this.cardContainer = cardContainer;
        this.cardContent = cardContent;
        this.isResizing = false;
        this.isDragging = false;
        this.isSelected = false;
        this.isMouseHeld = false; // Track if the left mouse button is held
        this.offsetX = 0;
        this.offsetY = 0;

        cardContainer.style.transition = "border 0.2s"; // Add transition for a smooth effect
        this.updateHighlight();

        cardContainer.addEventListener("mousedown", this.handleMouseDown.bind(this));
        window.addEventListener("mousemove", this.handleMouseMove.bind(this));
        window.addEventListener("mouseup", this.handleMouseUp.bind(this));

        cardContent.addEventListener("mousedown", this.handleCardContentMouseDown.bind(this));
        cardContent.addEventListener("mouseup", this.handleCardContentMouseUp.bind(this));
    }

    handleMouseDown(e) {
        if (e.target === this.cardContainer && e.offsetX >= this.cardContainer.clientWidth - 10 && e.offsetY >= this.cardContainer.clientHeight - 10) {
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
        } else if (this.isDragging) {
            this.cardContainer.style.left = e.clientX - this.offsetX + "px";
            this.cardContainer.style.top = e.clientY - this.offsetY + "px";
        } else if (this.isMouseHeld) {
            this.isSelected = true;
            this.updateHighlight();
        }
    }

    handleMouseUp() {
        this.isResizing = false;
        this.isDragging = false;
        this.isMouseHeld = false;
        this.isSelected = false;
        this.updateHighlight();
    }

    handleCardContentMouseDown(e) {
        if (e.target === this.cardContent) {
            this.isDragging = true;
            this.offsetX = e.clientX - this.cardContainer.getBoundingClientRect().left;
            this.offsetY = e.clientY - this.cardContainer.getBoundingClientRect().top;
        }
    }

    handleCardContentMouseUp() {
        this.isDragging = false;
    }

    updateHighlight() {
        if (this.isSelected) {
            this.cardContainer.style.border = "2px solid #ffcc00"; // Add your desired border style
        } else {
            this.cardContainer.style.border = "2px solid #ccc"; // Default border style
        }
    }
}

export default ResizableCard;

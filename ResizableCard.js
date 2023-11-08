class ResizableCard {
    constructor(cardContainer, cardContent, cage, callback) {
        this.cardContainer = cardContainer;
        this.cardContent = cardContent;
        this.isResizing = false;
        this.isDragging = false;
        this.isSelected = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.cage = cage;
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
            if (typeof this.resizeCallback === "function") {
                this.resizeCallback(this.cardContainer, newWidth, newHeight);
            }
        } else if (this.isDragging) {
            // if (this.offsetX < parseFloat(this.cage.getBoundingClientRect().left)) {
            //     console.log("offsetX:" + this.offsetX);
            //     console.log("offsety:" + this.offsetY);
            //     console.log("cage left:" + this.cage.getBoundingClientRect().left);
            //     this.offsetX = parseFloat(this.cage.style.left);
            // }

            // if(this.offsetX > parseFloat(this.cage.getBoundingClientRect().left) + parseFloat(this.cage.getBoundingClientRect().width)){
            //     this.offsetX = parseFloat(this.cage.getBoundingClientRect().left) + parseFloat(this.cage.getBoundingClientRect().width);
            // }

            // if(this.offsetY < parseFloat(this.cage.getBoundingClientRect().top)){
            //     this.offsetY = parseFloat(this.cage.getBoundingClientRect().top);
            // }
            // if(this.offsetY > parseFloat(this.cage.getBoundingClientRect().top) + parseFloat(this.cage.getBoundingClientRect().height)){
            //     this.offsetY = parseFloat(this.cage.getBoundingClientRect().top) + parseFloat(this.cage.getBoundingClientRect().height);
            // }

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

//////////////////////////////// This some suggested solution, it looks what I need
//
// dragElement(document.querySelector(".movable"));

// 	function dragElement(elmnt) {
// 		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
// 		elmnt.onmousedown = dragMouseDown;

// 		function dragMouseDown(e) {
// 			e = e || window.event;
// 			e.preventDefault();
// 			pos3 = e.clientX;
// 			pos4 = e.clientY;
// 			document.onmouseup = closeDragElement;
// 			document.onmousemove = elementDrag;
// 		}

// 		function elementDrag(e) {
// 			e = e || window.event;
// 			e.preventDefault();
// 			pos1 = pos3 - e.clientX;
// 			pos2 = pos4 - e.clientY;
// 			pos3 = e.clientX;
// 			pos4 = e.clientY;
// 			elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
// 			elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
// 			if((elmnt.offsetTop - pos2) < 0) {
// 				elmnt.style.top = "0px";
// 			}
// 			if((elmnt.offsetLeft - pos1) < 0) {
// 				elmnt.style.left = "0px";
// 			}
// 			if(((elmnt.offsetTop - pos2) + elmnt.getBoundingClientRect().height) > window.innerHeight) {
// 				elmnt.style.top = (window.innerHeight - elmnt.getBoundingClientRect().height) + "px";
// 			}
// 			if(((elmnt.offsetLeft - pos1) + elmnt.getBoundingClientRect().width) > window.innerWidth) {
// 				elmnt.style.left = (window.innerWidth - elmnt.getBoundingClientRect().width) + "px";
// 			}
// 		}

// 		function closeDragElement() {
// 			document.onmouseup = null;
// 			document.onmousemove = null;
// 		}
// 	}
// table.movable {
// 				position: fixed;
// 				z-index: 999;
// 				background-color: #f1f1f1;
// 				text-align: center;
// 			}

// 			table.movable thead > tr:nth-of-type(2) > th,
// 			table.movable tbody > tr > td {
// 				font-size: 13px;
// 			}

// 			table.movable .header {
// 				padding: 5px 10px;
// 				cursor: move;
// 				background-color: #3C4044;
// 				color: #fff;
// 			}

// 			table.movable tr:nth-of-type(2) > th {
// 				background-color: #3C4044;
// 				color: #fff;
// 			}
// <table class="movable" width="300" border="2">
// 			<thead>
// 				<tr>
// 					<th colspan="3" class="header">Header</th>
// 				</tr>
// 				<tr>
// 					<th width="100">Sub-header 1</th>
// 					<th width="100">Sub-header 2</th>
// 					<th width="100">Sub-header 3</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				<tr>
// 					<td>1</td>
// 					<td>2</td>
// 					<td>3</td>
// 				</tr>
// 			</tbody>
// 		</table>
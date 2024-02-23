 // Define the ResizableTextElement custom web component
  class ResizableTextElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.textElementCount = 1;
      this.render();
    }

    render() {
      const template = `
        <style>
          /* Define styles for the web component */
          /* These styles are scoped to the shadow DOM of the web component */
          /* You can place the CSS styles here */
        </style>
        <div class="panel">
          ${Array.from({ length: this.textElementCount }).map((_, index) => `
            <div class="text-element">
              <div class="controls-container">
                <div class="input-box">
                  <select class="font-size-select">
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                  </select>
                  <select class="font-family-select">
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Tahoma">Tahoma</option>
                  </select>
                  <select class="font-weight-select">
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="italic">Italic</option>
                  </select>
                  <select class="text-align-select">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                  <input type="color" class="font-color-input">
                  <select class="text-decoration-select">
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                    <option value="overline">Overline</option>
                    <option value="line-through">Line Through</option>
                  </select>
                  <select class="text-transform-select">
                    <option value="none">None</option>
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="capitalize">Capitalize</option>
                  </select>
                  <input type="number" class="line-height-input" min="1" step="0.1" placeholder="Line Height">
                </div>
              </div>
              <div class="editable-text" contentEditable="true">Editable Text ${index + 1}</div>
            </div>
          `).join('')}
        </div>
      `;
      this.shadowRoot.innerHTML = template;

      // Attach event listeners for text formatting changes
      this.shadowRoot.querySelectorAll('.font-size-select').forEach(select => {
        select.addEventListener('change', (event) => {
          this.updateTextStyle(event, 'fontSize');
        });
      });

      this.shadowRoot.querySelectorAll('.font-family-select').forEach(select => {
        select.addEventListener('change', (event) => {
          this.updateTextStyle(event, 'fontFamily');
        });
      });

      this.shadowRoot.querySelectorAll('.font-weight-select').forEach(select => {
        select.addEventListener('change', (event) => {
          this.updateTextStyle(event, 'fontWeight');
        });
      });

      this.shadowRoot.querySelectorAll('.text-align-select').forEach(select => {
        select.addEventListener('change', (event) => {
          this.updateTextStyle(event, 'textAlign');
        });
      });

      this.shadowRoot.querySelectorAll('.font-color-input').forEach(input => {
        input.addEventListener('input', (event) => {
          this.updateTextStyle(event, 'color');
        });
      });

      this.shadowRoot.querySelectorAll('.text-decoration-select').forEach(select => {
        select.addEventListener('change', (event) => {
          this.updateTextStyle(event, 'textDecoration');
        });
      });

      this.shadowRoot.querySelectorAll('.text-transform-select').forEach(select => {
        select.addEventListener('change', (event) => {
          this.updateTextStyle(event, 'textTransform');
        });
      });

      this.shadowRoot.querySelectorAll('.line-height-input').forEach(input => {
        input.addEventListener('input', (event) => {
          this.updateTextStyle(event, 'lineHeight');
        });
      });
    }

    updateTextStyle(event, styleProperty) {
      const value = event.target.value;
      const textElement = event.target.closest('.text-element').querySelector('.editable-text');
      textElement.style[styleProperty] = value;
    }
  }

  // Define the custom element tag
  customElements.define('resizable-text-element', ResizableTextElement);
class SaveDialog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        
        .button {
          background-color: #007aff;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .button:hover {
          background-color: #0056b3;
        }
        
        .dialog {
          display: none;
          position: fixed;
          z-index: 1;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 300px;
        }
        
        .dialog-content {
          padding: 20px;
        }
        
        .close {
          color: #aaa;
          float: right;
          font-size: 24px;
          font-weight: bold;
        }
        
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
        
        .label {
          font-size: 16px;
          margin-bottom: 5px;
          display: block;
        }
        
        .input {
          width: calc(100% - 20px);
          padding: 8px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #ccc;
          margin-bottom: 15px;
        }
        
        .save-button {
          background-color: #4cd964;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .save-button:hover {
          background-color: #45c851;
        }
        
        </style>
        `;
        <div class="saveDialog" id="saveDialog"></div>
    }

    connectedCallback() {
        this.generateSaveDialog();
    }

    generateSaveDialog() {
        const breadcrumb = this.shadowRoot.getElementById('saveDialog');

    }
}

customElements.define('breadcrumb-component', SaveDialog);

class BreadcrumbComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .breadcrumb {
                    list-style: none;
                    padding: 10px;
                    display: flex;
                    background-color: #fff;
                    border-radius: 5px;
                    overflow: hidden;
                    text-decoration: none;
                    font-size: 10px;
                }

                .breadcrumb-item {
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: #3498db;
                    transition: color 0.3s, background-color 0.3s;
                    border-radius: 3px;
                }

                .breadcrumb-item:hover {
                    background-color: #ecf0f1;
                    color: #2980b9;
                }

                .breadcrumb-item:not(:last-child)::after {
                    content: '/';
                    margin: 0 8px;
                    color: #666;
                }

                .breadcrumb-item:last-child {
                    background-color: #ddd;
                }

                .breadcrumb-item:last-child::after {
                    content: none;
                }

                .breadcrumb-item i {
                    margin-right: 5px;
                    color: #555;
                    text-decoration: none;
                }

                .breadcrumb-item a {
                    margin-right: 5px;
                    color: #555;
                    text-decoration: none;
                }
            </style>
            <ul class="breadcrumb" id="breadcrumb"></ul>
        `;
    }

    connectedCallback() {
        const url = this.getAttribute('urltext');
        this.generateBreadcrumb(url);
    }

    generateBreadcrumb(url) {
        const breadcrumb = this.shadowRoot.getElementById('breadcrumb');
        const urlObject = new URL(url);
        const parts = urlObject.pathname.split('/').filter(Boolean);

        for (let i = 0; i < parts.length; i++) {
            const listItem = document.createElement('li');
            listItem.classList.add('breadcrumb-item');

            const icon = document.createElement('i');
            icon.className = i === 0 ? 'fas fa-home' : i != parts.length - 1 ? 'fas fa-folder' : 'fas fa-chart-bar';

            const link = document.createElement('a');
            link.textContent = i === 0 ? 'Home' : parts[i];
            link.href = urlObject.origin + urlObject.pathname.substring(0, urlObject.pathname.indexOf(parts[i]) + parts[i].length);

            listItem.appendChild(icon);
            listItem.appendChild(link);
            breadcrumb.appendChild(listItem);
        }
    }
}

customElements.define('breadcrumb-component', BreadcrumbComponent);

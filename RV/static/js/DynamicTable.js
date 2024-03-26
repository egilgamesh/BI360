import AppConfig from './AppConfig.js'

class DynamicTable {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);
        this.data = options.data || [];
        this.groupby = options.groupby || '';
        this.columns = options.columns || [];
        this.renderTable();
        this.applyInlineStyles();
    }

    renderTable() {
        const table = document.createElement('table');
        table.classList.add('dynamic-table');
        this.container.appendChild(table);
        this.renderHeader(table);
        this.renderRows(table);
    }

    rebuildTable(data) {
        // Update container and data properties
        this.container.innerHTML = "";
        this.data = data;

        // Create a new table and render it
        const table = document.createElement('table');
        table.classList.add('dynamic-table');
        this.container.appendChild(table);
        this.renderHeader(table);
        this.renderRows(table);
    }

    renderHeader(table) {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        this.columns.forEach(column => {
            const th = document.createElement('th');
            th.textContent = column.title || column.field;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);
    }

    renderRows(table) {
        const tbody = document.createElement('tbody');

        if (this.groupby) {
            let currentGroup = null;

            this.data.forEach(rowData => {
                if (rowData[this.groupby] !== currentGroup) {
                    currentGroup = rowData[this.groupby];
                    this.renderGroupHeader(tbody, currentGroup);
                }

                this.renderRow(tbody, rowData, currentGroup);
            });
        } else {
            // If no grouping is specified, render all rows without group headers
            this.data.forEach(rowData => {
                this.renderRow(tbody, rowData);
            });
        }

        table.appendChild(tbody);
    }

    renderGroupHeader(tbody, group) {
        const groupHeaderRow = document.createElement('tr');
        groupHeaderRow.classList.add('group-header');
        groupHeaderRow.innerHTML = `<td id="id-${group}" colspan="${this.columns.length}">${group}</td>`;
        groupHeaderRow.addEventListener('click', () => this.toggleGroup(group));

        tbody.appendChild(groupHeaderRow);
    }

    renderRow(tbody, rowData, group) {
        const row = document.createElement('tr');
        if(this.groupby)
        {
        row.classList.add(`group-data-${group.toString().replaceAll(' ', '-')}`, 'hidden');
        }

        this.columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = rowData[column.field];
            row.appendChild(td);
            row.addEventListener("click", function() {
                window.location.href = AppConfig.FrontEndUrl +"/RV/report.html?id=" + rowData["id"];
            })
        });
        tbody.appendChild(row);
    }

    toggleGroup(group) {
        const groupDataRows = document.querySelectorAll(`[class^=group-data-${group.toString().replaceAll(' ', '-')}]`);
        groupDataRows.forEach(dataRow => {
            dataRow.classList.toggle('hidden');
        });

        const othergroups = [...new Set(this.data.map(item => item[this.groupby]))].filter(item => item != group);
        let othergroupheaderElements =[];
        othergroups.forEach((group, index) =>{
            othergroupheaderElements[index] = document.querySelectorAll(`[class^=group-data-${group.toString().replaceAll(' ', '-')}]`);
        });
        othergroupheaderElements.forEach(groupElement =>{
            groupElement.forEach(element => {
                element.classList.add('hidden');

            })
        });
    }

    setGroupHeader(headerFunction) {
        const tbody = this.container.querySelector('tbody');
        const groupHeader = tbody.querySelectorAll('tr.group-header');
        const groups = [...new Set(this.data.map(item => item[this.groupby]))];

        groupHeader.forEach((groupHeaderRow, index) => {
            groupHeaderRow.innerHTML = headerFunction(groups[index]);
            groupHeaderRow.classList.add('group-header');
            groupHeaderRow.classList.add(groups[index]);
        })
    }


    SetFooter(footerFunction) {
        const tfoot = document.createElement('tfoot');
        const footerRow = document.createElement('tr');
        footerRow.classList.add('footer-row');

        const td = document.createElement('td');
        td.colSpan = this.columns.length;
        td.innerHTML = footerFunction();//
        footerRow.appendChild(td);

        tfoot.appendChild(footerRow);
        this.container.querySelector('table').appendChild(tfoot);
    }

    applyInlineStyles() {
        var styles = `
            .group-header {
                font-weight: bold;
                cursor: pointer;
                background-color: #f5f5f5;
                color: #414040;
            }
    
            .hidden {
                display: none;
            }
    
            .dynamic-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
                border: 1px solid #414040;
            }
    
            .dynamic-table th,
            .dynamic-table td {
                border: 1px solid #aba9a9;
                padding: 8px;
                text-align: left;
            }
    
            .footer-row {
                background: #b0b0b0;
                color: #424242;
            }
    
            @media (prefers-color-scheme: dark) {
                .group-header {
                    font-weight: bold;
                    cursor: pointer;
                    background-color: #424242;
                    color: #ffffff;
                }
    
                .dynamic-table th,
                .dynamic-table tbody {
                    border: 1px solid #5a5a5a;
                    padding: 8px;
                    text-align: left;
                    background-color: #686868;
                    color: #ffffff;
                }
            }
    
            @media (prefers-color-scheme: light) {
                .group-header {
                    font-weight: bold;
                    cursor: pointer;
                    background-color: #f5f5f5;
                    color: #414040;
                }
            }
        `;
    
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(styles));
        document.head.appendChild(styleElement);
    }   
}

export default DynamicTable;
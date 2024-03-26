async function loadAllJSONFiles(updateTableCallback) {
    try {
        const response = await fetch('.');
        if (!response.ok) {
            throw new Error('Failed to fetch directory contents');
        }

        const text = await response.text();
        // Match filenames ending with ".json"
        const filenames = text.match(/"([^"]+\.json)"/g)?.map(filename => filename.replace(/"/g, '')) || [];

        const jsonFiles = await Promise.all(filenames.map(async filename => {
            const fileResponse = await fetch(filename);
            if (!fileResponse.ok) {
                throw new Error(`Failed to fetch ${filename}`);
            }
            const jsonData = await fileResponse.json();
            return { filename, data: jsonData };
        }));

        updateTableCallback(jsonFiles);
    } catch (error) {
        console.error('Error loading JSON files:', error);
    }
}

function updateTableWithFileNames(jsonFiles) {
    const tableBody = document.querySelector('#list-view tbody');
    tableBody.innerHTML = '';

    jsonFiles.forEach(file => {
        const row = document.createElement('tr');
        const fileNameCell = document.createElement('td');
        fileNameCell.textContent = file.filename;
        row.appendChild(fileNameCell);
        tableBody.appendChild(row);

        // Make each row clickable and redirect to another page with the file name as query parameter
        row.addEventListener('click', () => {
            window.location.href = `report.html?filename=${encodeURIComponent(file.filename)}`;
        });
    });
}

function loadAllJSONFilesAndUpdateTable() {
    loadAllJSONFiles(updateTableWithFileNames);
}

document.addEventListener('DOMContentLoaded', loadAllJSONFilesAndUpdateTable);

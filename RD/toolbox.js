//TODO: we have to use ResizableCard library to handle DND and sizable

const itemList = [];


function generateScorecard(title, actual, target, cardColor = "gray", titleColor = "black", actualColor = "black") {
    const scorecardContainer = document.getElementById("editor-panel");
    const scorecard = document.createElement("div");
    const ElementItemId = GetUniqueID(chartType);
    ElementItemId.id =ElementItemId;
    scorecard.className = "scorecard";
    scorecard.style.top = 0;
    scorecard.style.left = 0;
    const arrowClass = actual > target ? "fa-arrow-up up-icon" : "fa-arrow-down down-icon";
    scorecard.innerHTML = `
        <div class="scorecard-title" style="color: ${titleColor}">${title}</div>
        <div class="actual-value" style="color: ${actualColor}">${actual}</div>
        <div class="target-value">Target: ${target}</div>
        <div class="percentage-difference">
            <i class="fa ${arrowClass}"></i>
            (${((actual - target) / target * 100).toFixed(2)}%)
        </div>
    `;
    scorecard.style.border = `2px solid ${cardColor}`;
    makeElementDraggable(scorecard);
    scorecardContainer.appendChild(scorecard);
    const chart = {
        id: ElementItemId, type: Scorecard, dataSource: chartData, title: title, actual: actual, container: scorecard, width: width,
        height: 400, left: resizableCard.getPosition().left, top: resizableCard.getPosition().top
    };
    itemList.push(chart);
}

function InsertText(TextString) {
    const scorecardContainer = document.getElementById("editor-panel");
    const textboxControl = document.getElementById(TextString).value;
    const ElementItemId = GetUniqueID(chartType);
    if (textboxControl) {
        const scorecard = document.createElement("div");
        scorecard.id = ElementItemId;
        scorecard.style.top = 0;
        scorecard.style.left = 0;
        scorecard.innerHTML = textboxControl;
        scorecardContainer.appendChild(scorecard);
        makeElementDraggable(scorecard);
    }

}

function InsertImage(ImageSourcePath) {
    const scorecardContainer = document.getElementById("editor-panel");
    const textboxControl = document.getElementById(ImageSourcePath).value;
    const ElementItemId = GetUniqueID(chartType);
    if (textboxControl) {
        const scorecard = document.createElement("img");
        scorecard.id = ElementItemId;
        scorecard.style.top = 0;
        scorecard.style.left = 0;
        scorecard.src = textboxControl;
        scorecardContainer.appendChild(scorecard);
        makeElementDraggable(scorecard);
    }
}

function GenerateCommunityCard() {

    const scorecardContainer = document.getElementById("editor-panel");
    const scorecard = document.createElement("div");
    const ElementItemId = GetUniqueID(chartType);
    scorecard.id = ElementItemId;
    scorecard.className = "scorecard";
    scorecard.style.top = 0;
    scorecard.style.left = 0;

    const jsonData = [
        { "Key": "Software engineer", "value": 10 },
        { "Key": "HR", "value": 8 },
        { "Key": "technical support", "value": 5 },
        { "Key": "financial accounting manager", "value": 15 }
    ];

    const keyAttribute = "Key";
    const humanChart = new HumanChart(jsonData, keyAttribute);
    scorecard.appendChild(humanChart.getChartContainer())
    scorecardContainer.appendChild(scorecard);
    makeElementDraggable(scorecard);
}

function addChart(chartType) {

    const selectedObjectProperties = document.getElementById("PropertiesList");
    const chartOptions = document.getElementById("chartOptions");
    const tableOptions = document.getElementById("tableOptions");
    const chartTypeElement = document.getElementById("chartType");

    if (selectedObjectProperties) {
        selectedObjectProperties.innerHTML = ""
    }

    if (chartOptions) {
        chartOptions.style.display = "block"; // Set the style if the element exists
    }

    if (tableOptions) {
        tableOptions.style.display = "none";
    }

    if (chartTypeElement) {
        chartTypeElement.value = chartType;
    }

    document.getElementById("tableOptions").style.display = "none";
    document.getElementById("TextOptions").style.display = "none";
    document.getElementById("ImageOption").style.display = "none";
}

function addTable() {
    document.getElementById("chartOptions").style.display = "none";
    document.getElementById("tableOptions").style.display = "block";
    document.getElementById("TextOptions").style.display = "none";
    document.getElementById("ImageOption").style.display = "none";
}


function addText() {
    document.getElementById("chartOptions").style.display = "none";
    document.getElementById("tableOptions").style.display = "none";
    document.getElementById("TextOptions").style.display = "block";
    document.getElementById("ImageOption").style.display = "none";
}

function addImage() {
    document.getElementById("chartOptions").style.display = "none";
    document.getElementById("tableOptions").style.display = "none";
    document.getElementById("TextOptions").style.display = "none";
    document.getElementById("ImageOption").style.display = "block";
}


async function InsertChart() {
    const chartType = document.getElementById("chartType").value;
    const chartItemId = GetUniqueID(chartType);
    const apiURL = document.getElementById("apiURL").value;
    const editor = document.getElementById("editor-panel");
    const chartContainer = document.createElement("div");
    chartContainer.id = chartItemId;
    chartContainer.top = 0;
    chartContainer.left = 0;
    chartContainer.classList.add("card-container");
    const cardcontent = document.createElement("div");
    cardcontent.classList.add("card-content");
    chartContainer.appendChild(cardcontent);
    const xScale = "label";
    const yScale = "value";
    editor.appendChild(chartContainer);
    const resizableCard = new ResizableCard(chartContainer, cardcontent, editor, resizeCallback);
    resizableCard.id = chartItemId;
    ShowChartProperties(chartContainer, resizableCard);
    const chartData = await fetchChartData(apiURL, chartType);
    const width = 600;
    const height = 400;
    if (chartData) {

        // const chart = { id: chartItemId, type: chartType, dataSource: chartData,
        //     xattribute:xScale,yattribute:yScale, container: cardcontent, chartWidth, chartHeight };
        // itemList.push(chart);
        BuildChart(chartContainer, chartData, chartType, chartItemId, width, height, xScale, yScale);
        const chart = {
            id: chartItemId, type: chartType, dataSource: chartData, xattribute: xScale, yattribute: yScale, container: chartContainer, width: width,
            height: 400, left: resizableCard.getPosition().left, top: resizableCard.getPosition().top
        };
        itemList.push(chart);
        console.log(itemList);
    } else {
        alert("Failed to fetch data from the API for the chart.");
    }

    document.getElementById("chartOptions").style.display = "none";
}

function GetUniqueID(chartType) {
    return chartType + `-${new Date().getTime()}`;
}

function BuildChart(chartContainer, chartData, chartType, chartItemId, width, height, xAttribute, yAttribute) {
    const chartcontainer = document.getElementById(chartContainer.id);
    const cardcontent = chartcontainer.querySelector(".card-content");
    cardcontent.innerHTML = "";
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(cardcontent)
        .append("svg")
        .attr("width", width)
        .attr("height", height);



    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    const xScale = d3.scaleBand()
        .domain(chartData.map(d => d[xAttribute]))
        .range([0, chartWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d[yAttribute])])
        .nice()
        .range([chartHeight, 0]);

    if (chartType === 'bar') {
        CreateBarChart(g, chartData, xScale, yScale, chartHeight, svg, chartWidth, "Sales Amount");

    }
    else if (chartType === 'line') {
        CreateLineChart(xScale, yScale, g, chartData, chartHeight, svg, chartWidth);
    }
    else if (chartType === 'pie') {
        CreatePieChart(chartWidth, chartHeight, g, chartData);
    }
    else if (chartType === 'treemap') {
        CreateTreeMapChart(chartWidth, chartHeight, chartData, g);
    }


    else {
        // Handle other chart types here
    }

    // populate object list
    // Create a new chart item element
    AddItemInObjectListPanel(chartContainer);
    // ... (rest of the code for creating the chart)
    document.getElementById("chartOptions").style.display = "none";
}

function resizeCallback(chartContainer, newWidth, newHeight) {
    // This function is called when the card container is resized
    // You can perform any actions or updates you need here based on the new dimensions
    updateChart(chartContainer, newWidth, newHeight);
}

function updateChart(chartContainer, newWidth, newHeight) {
    const mainContainer = document.getElementById(chartContainer.id);
    const indexToUpdate = itemList.findIndex(item => item.id === mainContainer.id);
    if (indexToUpdate !== -1) {
        const itemToUpdate = itemList[indexToUpdate];
        itemToUpdate.width = newWidth;
        itemToUpdate.height = newHeight;
        BuildChart(chartContainer, itemToUpdate.dataSource, itemToUpdate.type, chartContainer.id,
            itemToUpdate.width, itemToUpdate.height, itemToUpdate.xattribute, itemToUpdate.yattribute);
    }
}


function CreateTreeMapChart(chartWidth, chartHeight, chartData, g) {
    const treemap = d3.treemap()
        .size([chartWidth, chartHeight])
        .padding(2);

    const root = d3.hierarchy({ children: chartData })
        .sum(d => d.value);

    treemap(root);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const cell = g.selectAll("g")
        .data(root.leaves())
        .enter().append("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    cell.append("rect")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => color(d.parent.data.label));

    cell.append("text")
        .selectAll("tspan")
        .data(d => d.data.label.split(/(?=[A-Z][a-z])|\s+/))
        .enter().append("tspan")
        .attr("x", 4)
        .attr("y", (d, i) => 13 + i * 10)
        .text(d => d);
}

function CreatePieChart(chartWidth, chartHeight, g, chartData) {
    const radius = Math.min(chartWidth, chartHeight) / 2;

    const pie = d3.pie()
        .value(d => d.value);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const arcs = g.selectAll(".arc")
        .data(pie(chartData))
        .enter().append("g")
        .attr("class", "arc")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.label));

    const legend = g.selectAll(".legend")
        .data(chartData.map(d => d.label))
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(50,${i * 20})`);

    legend.append("rect")
        .attr("x", chartWidth - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", (d, i) => color(i));

    legend.append("text")
        .attr("x", chartWidth - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("font-size", "12px") // change legend text font size, this could be dynamic
        .text(d => (d.length > 12) ? d.substring(0, 12) + '...' : d)
        .on("mouseover", function () {
            d3.select(this).text(d => d); // Show full text on mouseover
        })
        .on("mouseout", function () {
            d3.select(this).text(d => (d.length > 12) ? d.substring(0, 12) + '...' : d);
        });
}

function CreateBarChart(g, chartData, xScale, yScale, chartHeight, svg, width, barChartTitle) {
    g.selectAll(".bar")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.label))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d.value) - 20)
        .style("fill", "green")
        .on("mouseover", function () {
            d3.select(this).style("fill", "steelblue"); // Change the color on mouseover
        })
        .on("mouseout", function () {
            d3.select(this).style("fill", "green"); // Change it back on mouseout
        });

    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

    g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));

    // Add labels and titles to your chart
    g.selectAll(".bar-label")
        .data(chartData)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.label) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.value) - 10) // Adjust the position
        .attr("text-anchor", "middle")
        .text(d => d.value)
        .style("fill", "green")
        .style("font-size", "12px");

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(barChartTitle);
}

function CreateLineChart(xScale, yScale, g, chartData, chartHeight, svg, width) {
    const line = d3.line()
        .x(d => xScale(d.label))
        .y(d => yScale(d.value));

    g.append("path")
        .datum(chartData)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "green");

    g.selectAll(".dot")
        .data(chartData)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.label))
        .attr("cy", d => yScale(d.value))
        .attr("r", 5)
        .style("fill", "green")
        .on("mouseover", function () {
            d3.select(this).style("fill", "orange"); // Change the color on mouseover
        })
        .on("mouseout", function () {
            d3.select(this).style("fill", "green"); // Change it back on mouseout
        });

    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

    g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));

    // Add labels and titles to your chart
    g.selectAll(".line-label")
        .data(chartData)
        .enter()
        .append("text")
        .attr("class", "line-label")
        .attr("x", d => xScale(d.label))
        .attr("y", d => yScale(d.value) - 15) // Adjust the position
        .attr("text-anchor", "middle")
        .text(d => d.value)
        .style("fill", "black")
        .style("font-size", "12px");

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Growing Sales");
}

function AddItemInObjectListPanel(chartItemId) {
    // const chartItem = document.createElement('li');
    // chartItem.innerText = 'Chart'; // You can customize the label


    // // Set the item's attributes
    // chartItem.setAttribute('draggable', true);
    // chartItem.setAttribute('ondragstart', 'drag(event)');
    // chartItem.setAttribute('id', "Layer_" + chartItemId.id); //prefix with layer is important, to avoid conflict with item in editor, dont' delete it

    // // Add a class to apply the styles
    // chartItem.classList.add('chart-item');
    // // Add a click handler to select the object
    // chartItem.addEventListener('click', function () {
    //     selectObject(chartItemId);
    // });

    // // Add the new chart item to the object list
    // const objectsList = document.getElementById('objects-list');
    // objectsList.appendChild(chartItem);
}

function selectObject(id) {

    // Deselect previously selected objects
    const selectedObjects = document.querySelectorAll('selectedHighlight');
    selectedObjects.forEach(selectedObject => {
        selectedObject.classList.remove('selectedHighlight');
    });

    const item = document.getElementById(id);
    // Select the clicked object
    item.classList.add('selectedHighlight');
}

async function insertTable() {
    const tableAPIURL = document.getElementById("tableAPIURL").value;
    const editorPanel = document.getElementById("editor-panel");

    const tableData = await fetchTableData(tableAPIURL);

    if (tableData) {
        const table = document.createElement("table");
        table.border = "1";
        const thead = table.createTHead();
        const tbody = table.createTBody();
        const headerRow = thead.insertRow();

        for (let key in tableData[0]) {
            const th = document.createElement("th");
            th.innerHTML = key;
            headerRow.appendChild(th);
        }

        tableData.forEach(rowData => {
            const row = tbody.insertRow();
            for (let key in rowData) {
                const cell = row.insertCell();
                cell.innerHTML = rowData[key];
            }
        });

        editorPanel.appendChild(table);
        // Make the table draggable
        makeElementDraggable(table);

    } else {
        alert('Failed to fetch data from the API for the table.');
    }

    document.getElementById("tableOptions").style.display = "none";
}

function saveAsHTML() {
    const editorContent = document.getElementById("editor-panel").innerHTML;
    const stylesheets = Array.from(document.styleSheets).map(styleSheet => {
        return `<link rel="stylesheet" href="${styleSheet.href}">`;
    }).join("\n");

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Editor Content</title>
            ${stylesheets}
        </head>
        <body>
            <div id="editorContent">
                ${editorContent}
            </div>
        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "report.html";
    a.style.display = "none";
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);
}
//
// ...


function ShowChartProperties(chartContainer, card) {
    const propertiesPanel = document.getElementById("PropertiesList");
    propertiesPanel.style.display = "block";
    chartContainer.addEventListener("click", (event) => {
        selectedChart(chartContainer, event, propertiesPanel, card);

        // propertiesPanel.appendChild(properties);

        document.addEventListener("mouseup", () => {
            selectedElement = null;
            // if (document.getElementById("SelectedObjectProperties") == null) {
            //     document.getElementById("SelectedObjectProperties").style.display = "none";
            // }
        });
    });
}

function selectedChart(chartContainer, event, propertiesPanel, card) {
    selectedElement = chartContainer;
    // const offsetX = event.clientX - chartContainer.getBoundingClientRect().left;
    // const offsetY = event.clientY - chartContainer.getBoundingClientRect().top;
    const name = chartContainer.id;
    const currentPosition = card.getPosition();
    const currentSize = card.getSize();
    console.log("Current position: ", currentPosition);
    console.log("Current size: ", currentSize);
    propertiesPanel.innerHTML = `
        <input class="property" type="text" value="name: ${name}">
        <input class="property" type="text" value="Top: ${currentPosition.top}">
        <input class="property" type="text" value="Left: ${currentPosition.left}">
        <input  class="property" type="text" value="Width: ${currentSize.width}" >
        <input class="property" type="text" value="Height: ${currentSize.height}" >
      `;
}



function adjustEditorDimensions() {
    const editor = document.getElementById("editor-panel");
    const children = Array.from(editor.children);
    const totalHeight = children.reduce((height, element) => height + element.offsetHeight, 0);
    const totalWidth = children.reduce((width, element) => Math.max(width, element.offsetWidth), 0);

    // Add some extra padding or margins if needed
    const padding = 20;

    // Set the dimensions of the editor based on its content
    editor.style.height = totalHeight + padding + "px";
    editor.style.width = totalWidth + padding + "px";
}
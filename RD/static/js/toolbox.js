//TODO: we have to use ResizableCard library to handle DND and sizable

const itemList = [];
function GetDataSourceNameFromQueryString() {
    var urlParams = new URLSearchParams(window.location.search);
    var DataSourceName = urlParams.get('DataSource');
    console.log("Datasourcename:" + DataSourceName)
    if (!DataSourceName)
        console.log("Nothing to print as datasource")
    if (DataSourceName)
        return DataSourceName;
    else
        return "FailedDataSource"
}





async function SaveReport(ReportNameTextBoxID, Author, SpaceID) {
    const filename = document.getElementById(ReportNameTextBoxID).value;
    const reportObject = {
        "reportName": filename,
        "reportAuthor": Author,
        "reportCreateDate": new Date().toISOString(),
        "reportLastChange": new Date().toISOString(),
        "reportSpaceId": SpaceID,
        "reportMetaData": JSON.stringify(itemList, null, 2).toString()
    };
    //todo: take url to app config
    const response = await PostNewReport("https://localhost:5007/api/Reports/NewReport", reportObject);
    console.log(response);
    if (response)
        document.getElementById("saveDialog").style.display = "none";
}


function generateScorecard(title, actual, target, cardColor = "gray", titleColor = "black", actualColor = "black") {
    const scorecardContainer = document.getElementById("editor-panel");
    const scorecard = document.createElement("div");
    const ElementItemId = GetUniqueID(chartType);
    ElementItemId.id = ElementItemId;
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
    const resizableCard = new IntractClient(scorecard);
    scorecardContainer.appendChild(scorecard);

    ///
    const chart = {
        id: ElementItemId, type: Scorecard, dataSource: chartData, title: title, actual: actual, container: scorecard, width: width,
        height: 400, left: resizableCard.getPosition().left, top: resizableCard.getPosition().top
    };
    itemList.push(chart);
}

function InsertTextControl() {
    const scorecardContainer = document.getElementById("editor-panel");
    const ElementItemId = GetUniqueID('text');

    // <resizable-text-element></resizable-text-element>

    // if (textboxControl) {
    const textItem = document.createElement("resizable-text-element");
    textItem.id = ElementItemId;
    textItem.style.top = 0;
    textItem.style.left = 0;
    // scorecard.innerHTML = textboxControl;
    scorecardContainer.appendChild(textItem);
    const resizableCard = new IntractClient(textItem, TextCallback);
    const textbox = new TextItem(ElementItemId, textItem.getTextContent(), textItem.getTextFormats().fontSize,
     textItem.getTextFormats().fontFamily, textItem.getTextFormats().color, textItem.getTextFormats().left,
      textItem.getTextFormats().left, textItem.getTextFormats().width, textItem.getTextFormats().height);
      itemList.push(textbox)
      console.log(itemList);
}

function InsertImage(ImageSourcePath) {
    const scorecardContainer = document.getElementById("editor-panel");
    const ImageUrl = document.getElementById(ImageSourcePath).value;
    const ElementItemId = GetUniqueID('image');
    if (ImageUrl) {
        const imageItem = document.createElement("img");
        imageItem.id = image.id;
        imageItem.style.top = image.top;
        imageItem.style.left = image.left;
        imageItem.src = image.source;
        scorecardContainer.appendChild(imageItem);
        const resizableImage = new IntractClient(imageItem, resizeCallback);
        const image = new ImageItem(ElementItemId, ImageUrl, 300, 300, 0, 0);
        itemList.push(image)
        console.log(itemList);
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
    // makeElementDraggable(scorecard);
    const resizableCard = new IntractClient(scorecard);


}

async function addChart(chartType) {

    const selectedObjectProperties = document.getElementById("PropertiesList");
    const chartOptions = document.getElementById("chartOptions");
    const tableOptions = document.getElementById("tableOptions");
    const chartTypeElement = document.getElementById("chartType");

    if (selectedObjectProperties) {
        selectedObjectProperties.innerHTML = ""
    }

    if (chartOptions) {
        chartOptions.style.display = "block"; // Set the style if the element exists
        await populateDropDownList();
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

function GetApiUrl(dataSource) {
    const apiUrl = 'https://localhost:5007/api/DataGateway/GetGeneratedDataDynamicColumns';
    const yaxisvalue = document.getElementById("yaxisValue").value; // get the y axis from api
    const xaxisvalue = document.getElementById("xaxisValue").value; // get x axis from api
    const [selectedYTable, selectedYaxisColumn] = yaxisvalue.split('.');
    const [selectedXTable, selectedXaxisColumn] = xaxisvalue.split('.');
    const dataSourceName = dataSource;
    const queryString = `?dataSourceName=${dataSourceName}` +
        `&SelectedTables=${selectedXTable}` +
        `&SelectedTables=${selectedYTable}` +
        `&SelectedColumns[${selectedXTable}]=${selectedXaxisColumn}` +
        `&SelectedColumns[${selectedYTable}]=${selectedYaxisColumn}`;
    const fullUrl = apiUrl + queryString;
    //    console.log('Constructed URL:', fullUrl); // enable it to debug the caller url
    return fullUrl;
}
// datasource 'CGSEDW2023'
async function InsertChart() {
    const chartType = document.getElementById("chartType").value;
    const chartItemId = GetUniqueID(chartType);
    const dataSourceName = GetDataSourceNameFromQueryString()
    const apiURL = GetApiUrl(dataSourceName);// document.getElementById("apiURL").value;
    const yaxisvalue = document.getElementById("yaxisValue").value.split('.')[1]; // get the y axis from api
    const xaxisvalue = document.getElementById("xaxisValue").value.split('.')[1]; // get x axis from api
    const chartTitleValue = document.getElementById("ChartTitleValue").value; // get x axis from api
    const editor = document.getElementById("editor-panel");
    const chartContainer = document.createElement("div");
    chartContainer.id = chartItemId;
    chartContainer.top = 0;
    chartContainer.left = 0;
    chartContainer.classList.add("card-container");
    const cardcontent = document.createElement("div");
    cardcontent.classList.add("card-content");
    chartContainer.appendChild(cardcontent);
    editor.appendChild(chartContainer);
    // const resizableCard = new ResizableCard(chartContainer, cardcontent, editor, resizeCallback);
    const resizableCard = new IntractClient(chartContainer, resizeCallback);
    // resizableCard.id = chartItemId;
    ShowChartProperties(chartContainer, resizableCard);
    const chartData = await fetchChartData(apiURL, xaxisvalue, xaxisvalue.toString(), yaxisvalue, yaxisvalue.toString(), chartType); // chart type has been not pass
    const width = 600;
    const height = 400;
    if (chartData) {

        // const chart = { id: chartItemId, type: chartType, dataSource: chartData,
        //     xattribute:xScale,yattribute:yScale, container: cardcontent, chartWidth, chartHeight };
        // itemList.push(chart);
        BuildChart(chartContainer, chartData, chartType, chartItemId, width, height, xaxisvalue, yaxisvalue, chartTitleValue);
        const chart = {
            id: chartItemId, type: chartType, dataSource: chartData, xattribute: xaxisvalue, yattribute: yaxisvalue, container: chartContainer, width: width,
            height: 400, left: resizableCard.getPosition().left, top: resizableCard.getPosition().top
        };
        itemList.push(chart);
    } else {
        alert("Failed to fetch data from the API for the chart.");
    }

    document.getElementById("chartOptions").style.display = "none";
}

function GetUniqueID(chartType) {
    return chartType + `-${new Date().getTime()}`;
}

function BuildChart(chartContainer, chartData, chartType, chartItemId, width, height, xAttribute, yAttribute, chartTitleValue) {
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



    const graph = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    const xScale = d3.scaleBand()
        .domain(chartData.map(d => d[xAttribute]))
        .range([0, chartWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => +d[yAttribute])])
        .nice()
        .range([chartHeight, 0]);

    if (chartType === 'bar') {
        CreateBarChart(graph, chartData, xScale, xAttribute, yScale, yAttribute, chartHeight, svg, chartWidth, chartTitleValue);

    }
    else if (chartType === 'line') {
        CreateLineChart(xScale, xAttribute, yScale, yAttribute, graph, chartData, chartHeight, svg, chartWidth, chartTitleValue);
    }
    else if (chartType === 'pie') {
        CreatePieChart(chartWidth, chartHeight, graph, chartData, xScale, xAttribute, yScale, yAttribute);
    }
    else if (chartType === 'treemap') {
        CreateTreeMapChart(chartWidth, chartHeight, chartData, graph);
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

function resizeCallback(chartContainer, newWidth, newHeight, newtop, newLeft) {
    // This function is called when the card container is resized
    // You can perform any actions or updates you need here based on the new dimensions
    updateChart(chartContainer, newWidth, newHeight, newtop, newLeft);
}

function updateChart(chartContainer, newWidth, newHeight, newtop, newLeft) {
    const mainContainer = document.getElementById(chartContainer.id);
    const indexToUpdate = itemList.findIndex(item => item.id === mainContainer.id);
    if (indexToUpdate !== -1) {
        const itemToUpdate = itemList[indexToUpdate];
        itemToUpdate.width = newWidth;
        itemToUpdate.height = newHeight;
        itemToUpdate.top = newtop;
        itemToUpdate.left = newLeft;

        BuildChart(chartContainer, itemToUpdate.dataSource, itemToUpdate.type, chartContainer.id,
            itemToUpdate.width, itemToUpdate.height, itemToUpdate.xattribute, itemToUpdate.yattribute);
    }
}

function TextCallback(chartContainer, newWidth, newHeight, newtop, newLeft) {
    // This function is called when the card container is resized
    // You can perform any actions or updates you need here based on the new dimensions
    UpdateText(chartContainer, newWidth, newHeight, newtop, newLeft);
}

function UpdateText(chartContainer, newWidth, newHeight, newtop, newLeft) {
    const mainContainer = document.getElementById(chartContainer.id);
    const indexToUpdate = itemList.findIndex(item => item.id === mainContainer.id);
    if (indexToUpdate !== -1) {
        const itemToUpdate = itemList[indexToUpdate];
        itemToUpdate.width = newWidth;
        itemToUpdate.height = newHeight;
        itemToUpdate.top = newtop;
        itemToUpdate.left = newLeft;
        //  console.log(itemToUpdate);

    }
    console.log(itemList);
}


function CreateTreeMapChart(chartWidth, chartHeight, chartData, g) {
    const treemap = d3.treemap()
        .size([chartWidth, chartHeight])
        .padding(2);

    const root = d3.hierarchy({ children: chartData })
        .sum(d => d.value); //TODO: this should be change to use attribute xScale,xAttribute, yScale,yAttribute instead

    treemap(root);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const cell = g.selectAll("g")
        .data(root.leaves())
        .enter().append("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    cell.append("rect")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => color(d.parent.data.label)); //TODO: this should be change to use attribute xScale,xAttribute, yScale,yAttribute instead

    cell.append("text")
        .selectAll("tspan")
        .data(d => d.data.label.split(/(?=[A-Z][a-z])|\s+/))
        .enter().append("tspan")
        .attr("x", 4)
        .attr("y", (d, i) => 13 + i * 10)
        .text(d => d);
}

function CreatePieChart(chartWidth, chartHeight, graph, chartData, xScale, xAttribute, yScale, yAttribute) {
    const radius = Math.min(chartWidth, chartHeight) / 2;

    const pie = d3.pie()
        .value(d => yScale(d[yAttribute])); //TODO: this should be change to use attribute xScale,xAttribute, yScale,yAttribute instead

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const arcs = graph.selectAll(".arc")
        .data(pie(chartData))
        .enter().append("g")
        .attr("class", "arc")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(xScale(d.data[xAttribute]))); //TODO: this should be change to use attribute xScale,xAttribute, yScale,yAttribute instead

    const legend = graph.selectAll(".legend")
        .data(chartData.map(d => d[xAttribute])) //TODO: this should be change to use attribute xScale,xAttribute, yScale,yAttribute instead
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(50,${i * 20})`);

    legend.append("rect")
        .attr("x", chartWidth - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", (d, i) => color(xScale(d)));

    legend.append("text")
        .attr("x", chartWidth - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("font-size", "12px") // change legend text font size, this could be dynamic
        .text(d => (d.length > 20) ? d.substring(0, 20) + '...' : d)
        .on("mouseover", function () {
            d3.select(this).text(d => d); // Show full text on mouseover //TODO: this should be change to use attribute xScale,xAttribute, yScale,yAttribute instead
        })
        .on("mouseout", function () {
            d3.select(this).text(d => (d.length > 12) ? d.substring(0, 12) + '...' : d);
        });
}

function CreateBarChart(g, chartData, xScale, xAttribute, yScale, yAttribute, chartHeight, svg, width, barChartTitle) {
    g.selectAll(".bar")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d[xAttribute]))
        .attr("y", d => yScale(d[yAttribute]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d[yAttribute]) - 20)
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
        .attr("x", d => xScale(d[xAttribute]) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d[yAttribute]) - 10) // Adjust the position
        .attr("text-anchor", "middle")
        .text(d => d[yAttribute])
        .style("fill", "green")
        .style("font-size", "8px");

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(barChartTitle); //todo: title disappear once user drag and move the charts
}

function CreateLineChart(xScale, xAttribute, yScale, yAttribute, g, chartData, chartHeight, svg, width, chartTitleValue) {
    const line = d3.line()
        .x(d => xScale(d[xAttribute]))
        .y(d => yScale(d[yAttribute]));

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
        .attr("cx", d => xScale(d[xAttribute]))
        .attr("cy", d => yScale(d[yAttribute]))
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
        .attr("x", d => xScale(d[xAttribute]))
        .attr("y", d => yScale(d[yAttribute]) - 15) // Adjust the position
        .attr("text-anchor", "middle")
        .text(d => d[yAttribute])
        .style("fill", "black")
        .style("font-size", "12px");

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(chartTitleValue); // todo: the title will disapper once user move the charts
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
        const resizableCard = new IntractClient(table);

        // makeElementDraggable(table);

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

async function populateDropDownList() {
    {
        //todo: take url to app config
        const apiUrl = "https://localhost:5007/api/DataGateway/GetDataModelMetadata";
        const dataSourceName = GetDataSourceNameFromQueryString();
        const dropdownIdYaxis = document.getElementById("yaxisValue").id;
        const dropdownIdXaxis = document.getElementById("xaxisValue").id;

        await getMetaData(apiUrl, dataSourceName)
            .then(data => {
                if (data) {
                    createDropdown(data, dropdownIdYaxis);
                } else {
                    console.error("Failed to fetch data.");
                }
            });

        await getMetaData(apiUrl, dataSourceName)
            .then(data => {
                if (data) {
                    createDropdown(data, dropdownIdXaxis);
                } else {
                    console.error("Failed to fetch data.");
                }
            });
    }
}

function createDropdown(data, dropdownId) {
    const dropdown = document.getElementById(dropdownId);

    if (!dropdown) {
        console.error("Dropdown element not found");
        return;
    }
    dropdown.innerHTML = '';
    data.forEach(table => {
        const optGroup = document.createElement("optgroup");
        optGroup.label = table.tableName;

        // Add columns as options to the optgroup
        table.columns.forEach(column => {
            const option = document.createElement("option");
            option.value = `${table.tableName}.${column.name}`;
            option.text = table.tableName + '.' + column.name;
            optGroup.appendChild(option);
        });

        // Add aggregate columns as options to the optgroup
        table.aggregateColumns.forEach(aggregateColumn => {
            const option = document.createElement("option");
            option.value = `${table.tableName}.${aggregateColumn.name}`;
            option.text = table.tableName + '.' + aggregateColumn.name;
            optGroup.appendChild(option);
        });

        // Add the optgroup to the dropdown
        dropdown.appendChild(optGroup);
    });
}

async function SalesKPI() {
    await PredefineChart('bar');
}


async function PredefineChart(chartTyp) {
    const chartType = chartTyp;
    const chartItemId = GetUniqueID(chartType);
    //const dataSourceName = GetDataSourceNameFromQueryString()
    //todo: take url to app config
    const apiURL = "https://localhost:5007/api/DataGateway/GetGeneratedDataDynamicColumns?dataSourceName=CGSEDW2023PG&SelectedTables=dimgeography&SelectedTables=factinternetsales&SelectedColumns[dimgeography]=englishcountryregionname&SelectedColumns[factinternetsales]=sum_of_sales_amount"
    const yaxisvalue = "sum_of_sales_amount"; // get the y axis from api englishcountryregionname
    const xaxisvalue = "englishcountryregionname"; // get x axis from api
    const chartTitleValue = "Sales KPI"; // get x axis from api
    const editor = document.getElementById("editor-panel");
    const chartContainer = document.createElement("div");
    chartContainer.id = chartItemId;
    chartContainer.top = 0;
    chartContainer.left = 0;
    chartContainer.classList.add("card-container");
    const cardcontent = document.createElement("div");
    cardcontent.classList.add("card-content");
    chartContainer.appendChild(cardcontent);
    editor.appendChild(chartContainer);
    const resizableCard = new IntractClient(chartContainer);

    // const resizableCard = new ResizableCard(chartContainer, cardcontent, editor, resizeCallback);
    resizableCard.id = chartItemId;
    ShowChartProperties(chartContainer, resizableCard);
    const chartData = await fetchChartData(apiURL, xaxisvalue, xaxisvalue.toString(), yaxisvalue, yaxisvalue.toString(), chartType); // chart type has been not pass
    const width = 600;
    const height = 400;
    if (chartData) {
        BuildChart(chartContainer, chartData, chartType, chartItemId, width, height, xaxisvalue, yaxisvalue, chartTitleValue);
        const chart = {
            id: chartItemId, type: chartType, dataSource: chartData, xattribute: xaxisvalue, yattribute: yaxisvalue, container: chartContainer, width: width,
            height: 400, left: resizableCard.getPosition().left, top: resizableCard.getPosition().top
        };
        itemList.push(chart);
    } else {
        alert("Failed to fetch data from the API for the chart.");
    }

    document.getElementById("chartOptions").style.display = "none";
}

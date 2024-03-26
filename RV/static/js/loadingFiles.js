
async function LoadReportsBySpace(space) {
    document.getElementById("list-view").innerHTML="";
    const url = "https://localhost:5007/api/Reports/GetReportBySpaceId?id=" + space;
    console.log(url);
    const reports = await fetchTableData(url);
    const tableOptions = {
        data: reports,
        columns: [
            { title: 'File Name', field: 'reportName' },
            { title: 'Date Modified', field: 'reportLastChange' }
        ],
    };

    const dynamicTable = new DynamicTable('list-view', tableOptions);
}
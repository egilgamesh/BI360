import DynamicTable from './DynamicTable.js';
import AppConfig from './AppConfig.js';

export class ReportLoader {
    constructor(){}
    async loadReportsBySpace(space) {
        document.getElementById("list-view").innerHTML = "";
        const url = AppConfig.apiUrl + "/Reports/GetReportBySpaceId?id=" + space;
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
}

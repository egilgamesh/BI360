// Modify the fetchChartData function to process the data
async function fetchChartData(apiURL, xvalue, xlabel, yvalue, ylabel) {
    try {
        const response = await fetch(apiURL);
        if (response.ok) {
            const data = await response.json();
            // Extract post titles and their character counts
            const chartData = data.map(entries => ({
                [xlabel]: entries[xvalue],
                [ylabel]: entries[yvalue],
            }));
            return chartData;
        } else {
            throw new Error('Failed to fetch data from the API');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchTableData(tableAPIURL) {
    try {
        const response = await fetch(tableAPIURL);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch data for the table from the API');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function getMetaData(url, dataSourceName) {
    try {
        const fullUrl = `${url}?dataSourceName=${dataSourceName}`;
        const response = await fetch(fullUrl);
        if (response.ok) {
            const data = await response.json();
               return data;
        } else {
            throw new Error('Failed to fetch data for the table from the API');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function PostNewReport(url, dataArray) {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(dataArray, null, 2));
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // parse JSON response
        console.log('Success:', data);
        // Handle success here if needed
    } catch (error) {
        console.error('Error:', error);
        // Handle error here if needed
    }
}
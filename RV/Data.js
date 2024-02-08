// Modify the fetchChartData function to process the data
async function fetchChartData(apiURL) {
    try {
        const response = await fetch(apiURL);
        if (response.ok) {
            const data = await response.json();

            // Extract post titles and their character counts
            const chartData = data.map(post => ({
                label: post.title,
                value: post.title.length,
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
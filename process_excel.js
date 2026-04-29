const XLSX = require('xlsx');
const fs = require('fs');

const filePath = process.argv[2];
const workbook = XLSX.readFile(filePath);

const targetSheets = ['Total 2026', 'Total 2027', 'Total 2028'];
const finalData = {
    years: {},
    overall: {
        total_budget: 0,
        market_dist: {},
        product_dist: {},
        monthly_trend: {} 
    }
};

const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

targetSheets.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) return;

    const data = XLSX.utils.sheet_to_json(sheet, { range: 5 }); 
    
    let yearTotal = 0;
    const marketData = {};
    const productData = {};
    const monthlyData = {
        'Oct': 0, 'Nov': 0, 'Dec': 0, 'Jan': 0, 'Feb': 0, 'Mar': 0,
        'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0
    };
    const customers = {};

    data.forEach(row => {
        // Skip rows that don't look like data (e.g. headers or empty)
        if (!row['__EMPTY_5'] && !row['Name']) return;

        const customer = row['__EMPTY_5'] || row['Name'] || 'Unknown';
        const market = row['__EMPTY_11'] || row['Market group'] || 'Unknown';
        const product = row['__EMPTY_9'] || row['Product Group'] || 'Unknown';
        
        // Total Amount for the year is usually " Amount _12" in this specific template
        const totalVal = parseFloat(row[' Amount _12']) || 0;

        if (totalVal > 0) {
            yearTotal += totalVal;
            marketData[market] = (marketData[market] || 0) + totalVal;
            productData[product] = (productData[product] || 0) + totalVal;
            customers[customer] = (customers[customer] || 0) + totalVal;

            // Monthly Trend
            monthlyData['Oct'] += parseFloat(row[' Amount ']) || 0;
            for (let i = 1; i <= 11; i++) {
                monthlyData[months[i]] += parseFloat(row[' Amount _' + i]) || 0;
            }
        }
    });

    const topCustomers = Object.entries(customers)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }));

    finalData.years[sheetName] = {
        total: yearTotal,
        market: marketData,
        product: productData,
        monthly: monthlyData,
        top_customers: topCustomers
    };

    finalData.overall.total_budget += yearTotal;
    
    // Aggregate overall
    Object.entries(marketData).forEach(([m, v]) => {
        finalData.overall.market_dist[m] = (finalData.overall.market_dist[m] || 0) + v;
    });
    Object.entries(productData).forEach(([p, v]) => {
        finalData.overall.product_dist[p] = (finalData.overall.product_dist[p] || 0) + v;
    });
});

console.log(JSON.stringify(finalData, null, 2));

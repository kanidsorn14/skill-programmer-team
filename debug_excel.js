const XLSX = require('xlsx');
const sheetName = 'Total 2026';
const filePath = process.argv[2];
const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { range: 5 }); 
console.log(JSON.stringify(data[0], null, 2));

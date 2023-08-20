const XLSX = require('xlsx');
const path = require('path');
const { databaseModel } = require('./models/apiModel');

function updateDataFromExcel(fName,grpId,userId)
{
    const workbook = XLSX.readFile(path.join('public', 'assets', 'datafile',fName));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const data = XLSX.utils.sheet_to_json(worksheet);
    databaseModel(data,grpId,userId)
    
}

updateDataFromExcel("1692384580397.xlsx",1,1)
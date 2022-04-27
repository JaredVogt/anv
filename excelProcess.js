"use strict"
const excelToJson = require('convert-excel-to-json')  // https://github.com/DiegoZoracKy/convert-excel-to-json/

// Excel functions - get data out of excel and format it into JSON object


// Grab the raw Excel sheets data
function grabSheets(excelFile, sheetsInfo) {
  let sheetNames = Object.keys(sheetsInfo) 
  let rawData = excelToJson({
    sourceFile: excelFile, 
    sheets: sheetNames 
  });
  // console.log(rawData.Images)
  // console.log(sheetNames)
  for (let sheetName of sheetNames) {
    // console.log(sheetName)
    // console.log(rawData[sheetName].length)
    if (!rawData[sheetName].length) {
      // killScript(`Sheet doesn't exist or is empty: ${sheetName}`)
      console.log(`Sheet doesn't exist or is empty: ${sheetName}`)
    }
  }
  return processSheets(rawData, sheetsInfo)
  
}


// Return JSON object with all scrubbed sheet info (scrubbed with processSheet())
function processSheets(rawData, sheetsInfo) {
  // Set up validation
  // let validationHeaders = processValidation(rawData.Validation)
  // delete rawData.Validation
  // delete sheetsInfo.Validation

  let processedSheets = []
  for (let sheetName of Object.keys(sheetsInfo)) {
    processedSheets[sheetName] = processSheet(rawData, sheetsInfo, sheetName)
  }
  return processedSheets
}

// Process a single sheet and return a JSON object
function processSheet(rawData, sheetsInfo, sheetName, validationHeaders) {
  let rows = rawData[sheetName] 
 
  // set the headerRow
  let headerRow = rows[sheetsInfo[sheetName].headerRow - 1]

  // ignore any header with a value of 0
  headerRow = Object.fromEntries(Object.entries(headerRow).filter(([key, value]) => value !== 0))
  
  // set the datarow
  let dataRows = rows.slice(sheetsInfo[sheetName].dataRow - 1)  

  // process dataRows, for each column, lookup header value and assign column value  
  let sheetJson = []
  for (let row of dataRows) {
    let rowObj = {} 
    for (let [key, value] of Object.entries(row)) {
      if (headerRow[key]) {
        rowObj[headerRow[key]] = value
      }
    };
    sheetJson.push(rowObj)
  };
  // Validate headers for each sheet 
  // validateHeaders(sheetName, headerRow, validationHeaders)

  return sheetJson
};



module.exports = { grabSheets };


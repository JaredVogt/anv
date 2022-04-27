// const userHomeDir = require('os').homedir();
const defaultPath = `./`
const excelFile ='photoData.xlsx' 
// const excelFile = (argv['_'][0] ? argv['_'] : 'DMatrix Configuration.xlsx') // default if not user supplied
// const outputFile = 'excelToolOutput.json'  // FIXME this needs an arg to define
// const outputFile = (argv['_'][0] ? argv['_'] : 'excelToolOutput.json') // default if not user supplied
const excelFullPath = `${defaultPath}${excelFile}`
const fs = require('fs');
const ep = require('./excelProcess');
const excelToJson = require('convert-excel-to-json')  // https://github.com/DiegoZoracKy/convert-excel-to-json/

const sheetsInfo = {
  Images: { headerRow: 1, dataRow: 2 },
}
// console.log(excelFullPath)
// Grab all necessary sheets
const allSheetData = ep.grabSheets(excelFullPath, sheetsInfo)  // processing/validation done in this module
// console.log(allSheetData)


// variables
const baseWidth = 150
const maxLength = 24
const baseURL = 'https://user-images.githubusercontent.com/968047/'
let output = ''

for (let image of allSheetData.Images) {
  let width = parseInt(image.assocWidth) < baseWidth ? baseWidth : parseInt(image.assocWidth)
  let availableLength = (maxLength * width)/baseWidth 
  let textString = availableLength > image.description.length ? `${image.description}` : `${image.description.slice(0, (availableLength -3) )}...` 

  const theOne = `
  <div class="flexbox-item"  style="width: ${width}px;">
    <div class="flexbox-photo"><img src=${baseURL}${image.githubName} width=${parseInt(image.assocWidth)}>
    </div>
    <div class="flexbox-caption">${textString}
    </div>
    <div class="flexbox-site">${image.website}
    </div>
  </div>`  
   
  output += theOne // console.log(theOne)
}




let htmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .flexbox-container {
            display: flex;
            flex-wrap: wrap;
            <!-- margin: 30px; -->

        }
        .flexbox-header {
          display: flex;
          height: 300;
          width: 900;
        }
        .flexbox-item {
            display: flex;
            flex-wrap: wrap;
            <!-- flex-direction: column; -->
            <!-- margin: auto; -->
            <!-- align-items: center; -->
            <!-- justify-content: center; -->
            <!-- width: 200px; -->
            height: 230px !important;
            margin: 5px;
            <!-- align-items: stretch; -->
            <!-- align-items: center; -->
            border: 1px solid #333;
            background-color: #212124;
        }
        <!-- .flexbox-photobox { -->
        <!--     display: flex; -->
        <!--     align-items: center; -->
        <!--     justify-content: center; -->
        <!--     <!-1- flex-direction: column; -1-> -->
        <!--     height: 185px !important; -->
        <!--     flex-wrap: wrap; -->
        <!--     background-color: black; -->
        <!-- } -->
        .flexbox-photo {
            display: flex;
            width: 100%;
            <!-- height: 185px !important; -->
            <!-- margin: 3px; -->
            <!-- border: 1px solid #333; -->
            align-items: center;
            justify-content: center;
            background-color: #212124;
        }
        .flexbox-caption {
            display: flex;
            width: 100%;
            height: 25px !important;
            flex-direction: row;
            justify-content: left;
            align-items: center;
            <!-- margin: 3px; -->
            border: 1px solid #333;
            background-color: #212124;
            color:  #D7DBDD;
            font-family: Graphik Light, Helvetica, sans-serif;
            font-size: 0.72em;
        }
        .flexbox-site {
            width: 100%;
            height: 20px !important;
            <!-- margin: 3px; -->
            border: 1px solid #333;
            background-color: #212124;
            font-size: 0.65em;
            color: #D7DBDD;
        }

    </style>
</head>
<body style="background-color:#212124;">
<div class="flexbox-header"><img src="https://user-images.githubusercontent.com/968047/165564195-c6895d4b-10f1-4c85-ae5f-c26720d5afbb.png"></div>





<div class="flexbox-container">

<!-- between thiese lines -->

${output}


<!-- between thiese lines -->


   </div>
</body>
</html>`

fs.writeFileSync( 'output.html', htmlDoc )
// console.log(htmlDoc)

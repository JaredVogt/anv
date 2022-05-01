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
let output_white = ''

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
   
  output_white += theOne // console.log(theOne)
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

       }
        .flexbox-header {
          display: flex;
          height: 130px !important;
          align-items: center;
          justify-content: center;
          width: 1000px !important;
          background-image: url(https://user-images.githubusercontent.com/968047/166125988-756c4c0a-b2c1-41a8-9fe8-14e29f6ddf0a.png);
        }
        .flexbox-searchContainer {
          display: flex;
          align-items: center;
          justify-content: center;
            border: 0px solid black;
          height: 130px !important;

        }
        .flexbox-searchbar {
            border: 0px solid black;
          height: 70px !important;
        }
        .flexbox-item {
            display: flex;
            flex-wrap: wrap;
            height: 220px !important;
            margin: 5px;
            border: 0px solid #333;
            background-color: white;
        }
        .flexbox-photo {
            display: flex;
            height: 185px;
            width: 100%;
            justify-content: center;
            background-color: white;
        }
        .flexbox-caption {
            display: flex;
            width: 100%;
            height: 20px !important;
            flex-direction: row;
            justify-content: left;
            align-items: center;
            /*  margin: 3px; */ 
            /*  border: 0px solid #333; */
            font-family: Graphik Light, Helvetica, sans-serif;
            font-size: 0.72em;
        }
        .flexbox-site {
            width: 100%;
            height: 15px !important;
            /* border: 0px solid #333; */
            background-color: white;
            font-size: 0.65em;
        }


        * {
  box-sizing: border-box;
}

body {
  font: 16px Arial;  
}

/*the container must be positioned relative:*/
.autocomplete {
  position: relative;
  display: inline-block;
}

input {
  border: 0px solid transparent;
  background-color: #f1f2f2;
  color: #202124;
  padding: 15px;
  font-size: 15px;
}

input[type=text] {
  background-color: #303134;
  width: 100%;
}

input[type=submit] {
  background-color: DodgerBlue;
  color: #f1f2f2;
  cursor: pointer;
}

.autocomplete-items {
  position: absolute;
  border: 0px solid #303134;
  color: #3c4043;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 60px;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #f1f2f2; 
  border-bottom: 0px solid #303134; 
  border-left: 0px solid #303134; 
  border-right: 0px solid #303134; 
}

/*when hovering an item:*/
.autocomplete-items div:hover {
  background-color: gray; 
}

/*when navigating through the items using the arrow keys:*/
.autocomplete-active {
  background-color: gray !important; 
  color: #ffffff; 

}
  /* This is the new styling for the bar*/
.form {
  display: flex;
  flex-direction: row;
}
.search-field {
  width: 90%;
  padding: 10px 15px 10px 15px;
  border: none;
  outline: none;
}

.search-button {
  background: transparent;
  border: none;
  outline: 1px;
  margin-left: -33px;
}

.search-button img {
  width: 20px;
  height: 20px;
  object-fit: cover;
}

/* clears the ‘X’ from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }


    </style>
</head>
<body style="background-color: white;">
<div class="flexbox-header">

<div class="flexbox-searchContainer">
<div class="flexbox-searchbar">
<form action="" autocomplete="off" class="form">
  <div class="autocomplete" style="width:600px;">
        <input id="myInput" type="search" placeholder="Search" class="search-field" >
    <!-- <input id="myInput" type="text" name="myCountry" placeholder="Search"> -->
        <button type="submit" class="search-button" onclick="document.location = 'https://htmlpreview.github.io/?https://raw.githubusercontent.com/JaredVogt/anv/main/output_white.html'; return false">
          <img src="search_white.png">
        </button>
        </div>
  </div>
      </form>
</div>
</div>





<div class="flexbox-container">

<!-- between thiese lines -->

${output_white}


<!-- between thiese lines -->


   </div>

<!--  everything below this is the script for the autocomplete -->
<script>

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ['Sonja J Richards', 'Sonja J Richards Architect', 'Sonja J Richards - Little Rock', 'Seriously twisted pretzels', 'See how she runs', 'So you wanna be a millionaire', 'Son of a bitch, get me a drink']

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);
</script>


</body>
</html>`

fs.writeFileSync( 'output_white.html', htmlDoc )
// console.log(htmlDoc)

// Global variable
const TURN_ON = "הפעל";
const TURN_OFF = "הפסק";

const CLOCK_ACTIVITION_BUTTON = document.getElementById("activitionBtnText");

const TABLE_HEADER_CLASS = "tableHeader";
const TABLE_ROWS_CLASS = "tableRows";

const JSON_ID_KEY = "ID";
const JSON_NAME_KEY = "Name";
const JSON_PLACE_KEY = "Place";
const JSON_PHONE_KEY = "Phone";

const YOUNGER_ID = "מספר צעיר";
const YOUNGER_NAME = "שם צעיר";
const YOUNGER_PLACE = "מיקום מגורים";
const YOUNGER_PHONE = "טלפון";

const SPESIFIC_DIV = document.getElementById("accumulationList");

const TABLE_HEADER_NAME = "  שם:  ";
const TABLE_HEADER_HOBBY = "  תחביב:  ";
const TABLE_HEADER_BOOK = "  ספר:  ";

const TABLE_ROW_AQUA_CSS = " aquaBackground";

const ASC_DIRECTION = "asc";
const DESC_DIRECTION = "desc";

const SORT_UP_TO_DOWN = "sortUpToDown";
const SORT_DOWN_TO_UP = "sortDownToUp";

// Variables Definition
// Jsons Files
let EMPLOYEE = {};
let SPESIFIC_DETAILS = {};

// READ JSON FILE
fetch('EMPLOYEE.json')
  .then(response => response.json())
  .then(data => EMPLOYEE = data);

// Same id has EMPLOYEE
fetch('SPESIFIC_DETAILS.json')
  .then(response => response.json())
  .then(data => SPESIFIC_DETAILS = data);

let isClockWorking = true;
let timeVar = setInterval("clockFunction", 1000);

// ability btn true or false
let boolAccumulationBtn = false;

let clickOnceBool = false;

// Code Section

clockFunction = () => {
    let date = new Date();
    document.getElementById("timer").innerHTML = date.toLocaleTimeString();
}

// stop button function 
 stopClock = () => {
    if (!isClockWorking) {
        CLOCK_ACTIVITION_BUTTON.innerHTML = TURN_ON;
        clearInterval(timeVar);
        isClockWorking = true;
    }
    else {
        timeVar = setInterval(clockFunction, 500);
        CLOCK_ACTIVITION_BUTTON.innerHTML = TURN_OFF;
        isClockWorking = false;
    }
}
 
CreateTableFromJSON = ()  => {
    // EXTRACT VALUE FOR HTML HEADER. 
    // ('ID', 'Name', 'Place' and 'Phone')
    let arrayDisplayTable = [];
    for (i = 0; i < EMPLOYEE.length; i++) {
        for (let key in EMPLOYEE[i]) {
            if (arrayDisplayTable.indexOf(key) === -1) {
                if (arrayDisplayTable.length < 4) {
                    switch (key) {
                        case (JSON_ID_KEY) :
                            arrayDisplayTable.push(YOUNGER_ID);  
                            break;                          
                        case (JSON_NAME_KEY) :
                            arrayDisplayTable.push(YOUNGER_NAME);
                            break;                            
                        case (JSON_PLACE_KEY) :
                            arrayDisplayTable.push(YOUNGER_PLACE); 
                            break;      
                        case (JSON_PHONE_KEY) :
                            arrayDisplayTable.push(YOUNGER_PHONE);
                            break;
                        default :
                            break;
                    }
                }
            }
        }
    }
        
    // CREATE DYNAMIC TABLE.
    const table = document.createElement("table");
        
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    let tr = table.insertRow(-1);                   // TABLE ROW.

    
    for (let i = 0; i < arrayDisplayTable.length; i++) {
        let th = document.createElement("th");      // TABLE HEADER.
        tr.className = TABLE_HEADER_CLASS;
        th.innerHTML = arrayDisplayTable[i];

        // CREATE HTML DIV WITH ATRIBUTES
        let parentDiv = document.createElement("div");
        parentDiv.setAttribute("class", "sortingBtn");

        let sortingDivDownToUp = document.createElement("div");
        sortingDivDownToUp.setAttribute("class","idSortBtnDownToUp");
        sortingDivDownToUp.setAttribute("onclick", "sortTable(" + i + ", \"sortDownToUp\")");

        let sortingDivUpToDown = document.createElement("div");
        sortingDivUpToDown.setAttribute("class", "idSortBtnUpToDown");
        sortingDivUpToDown.setAttribute("onclick", "sortTable(" + i + ", \"sortUpToDown\")");

        if (i == 0 || i == 1) {
            parentDiv.appendChild(sortingDivDownToUp);
            parentDiv.appendChild(sortingDivUpToDown);
            th.appendChild(parentDiv);
            // th.innerHTML = arrayDisplayTable[i] +
            // "<div class = 'sortingBtn'><div class='idSortBtnDownToUp' onclick='sortTable(" + i + ", \"sortDownToUp\")'></div><div class ='idSortBtnUpToDown' onclick = 'sortTable(" + i + ", \"sortUpToDown\")'></div></div>";
        }
        
        tr.appendChild(th);
    }
        
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < EMPLOYEE.length; i++) {
        tr = table.insertRow(-1);
        tr.className = TABLE_ROWS_CLASS;
        let tabCell;

        for (let j = 0; j < arrayDisplayTable.length; j++) {
            tabCell = tr.insertCell(-1);
           
            switch (j) {
                case (0) :
                    tabCell.innerHTML = EMPLOYEE[i][JSON_ID_KEY];
                    break;    
                case (1) :
                    tabCell.innerHTML = EMPLOYEE[i][JSON_NAME_KEY];
                    break;
                case (2) :
                    tabCell.innerHTML = EMPLOYEE[i][JSON_PLACE_KEY];
                    break;           
                case (3) :
                    tabCell.innerHTML = EMPLOYEE[i][JSON_PHONE_KEY];
                    break;
                default :
                    break;
            }
        }
    }
                
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    const divContainer = document.getElementById("detailsTable");
    // Initialize the table
    divContainer.innerHTML = "";
    divContainer.appendChild(table); 
    
    clickListennerOnRow();  
}

clickListennerOnRow = () => {
    let index;
    let lastSelected;
    let arrayLastSelected = [];
    let table = document.getElementById("detailsTable");
    let tableRows = table.getElementsByClassName("tableRows");   
    let arrayOfTableRows = Array.prototype.slice.call( tableRows );
    
    arrayOfTableRows.forEach(tablerow => {
        tablerow.addEventListener("click", function() {
            index = this.rowIndex - 1;
            
            if (boolAccumulationBtn) {
                let newDiv = createAnotherDiv();
                this.className += TABLE_ROW_AQUA_CSS;
                arrayLastSelected.push(this);

                if (EMPLOYEE[index].ID == SPESIFIC_DETAILS[index].ID) {
                    newDiv.innerHTML = TABLE_HEADER_NAME + SPESIFIC_DETAILS[index].Name + TABLE_HEADER_HOBBY + 
                    SPESIFIC_DETAILS[index].Hobby + TABLE_HEADER_BOOK + SPESIFIC_DETAILS[index].Book;
                }
            }
            else {
                // Initialize Table rows classes
                for (i = 0; i < arrayLastSelected.length; i++) {
                    arrayLastSelected[i].className = TABLE_ROWS_CLASS;
                }
                arrayLastSelected.length = 0;

                SPESIFIC_DIV.innerHTML = "";
                this.className += TABLE_ROW_AQUA_CSS;  
                
                if (lastSelected == this) {
                    SPESIFIC_DIV.innerHTML = "";
                } 
                else {
                    if (EMPLOYEE[index].ID == SPESIFIC_DETAILS[index].ID) {
                        SPESIFIC_DIV.innerHTML = TABLE_HEADER_NAME + SPESIFIC_DETAILS[index].Name + TABLE_HEADER_HOBBY + 
                        SPESIFIC_DETAILS[index].Hobby + TABLE_HEADER_BOOK + SPESIFIC_DETAILS[index].Book;
                    }
                }

                if (lastSelected != undefined) {
                    lastSelected.className = TABLE_ROWS_CLASS;
                }
                
                lastSelected =  this;
            }
        });                    
    })
}

accumulationBtn = () => {
    // one click on btn or more
    if (!clickOnceBool) {
        boolAccumulationBtn = true;
        clickOnceBool = true;
    }
    else {
        boolAccumulationBtn = false;
        clickOnceBool = false;
    }
}

createAnotherDiv = () => {
    let parentElemnet = document.getElementById("accumulationList");
    const anotherDiv = document.createElement("div"); 
    let appendChildElement = parentElemnet.appendChild(anotherDiv); 
    return (appendChildElement);
}

sortTable = (i, whichSort) => {
    switch (i) {
        case (0) : 
            EMPLOYEE.sort(dynamicSort(JSON_ID_KEY, whichSort));
            SPESIFIC_DETAILS.sort(dynamicSort(JSON_ID_KEY, whichSort));
            break;
        case (1) :
            EMPLOYEE.sort(dynamicSort(JSON_NAME_KEY, whichSort));
            SPESIFIC_DETAILS.sort(dynamicSort(JSON_NAME_KEY, whichSort));
            break;
        default :
            console.log("try another way");
            break;
    }

    CreateTableFromJSON();
}

dynamicSort = (property, whichSort) => {
    let sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    if (whichSort === SORT_DOWN_TO_UP) {
        return function (a,b) {
            if(sortOrder == -1) {
                return b[property].localeCompare(a[property]);
            }
            else {
                return a[property].localeCompare(b[property]);
            }        
        }
    }
    else if (whichSort === SORT_UP_TO_DOWN) {
        return function (a,b) {
            if(sortOrder == -1) {
                return a[property].localeCompare(b[property]);
            }
            else {
                return b[property].localeCompare(a[property]);
            }        
        } 
    }
}

onClickOnListOfButton = () => {
    let buttons = [];
    let lastSelected;
    buttons = document.getElementsByClassName("listOfBtns");
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            if (typeof lastSelected != "undefined") {
                lastSelected.className = "listOfBtns";
            }

            this.className += " addingBorder";

            lastSelected = this;
        });
    }
}

hideDetails = () => {
    document.getElementById("detailsTable").innerHTML = "";
    document.getElementById("youngerBtn").style.border = "";
    document.getElementById("accumulationList").innerHTML = "";
}
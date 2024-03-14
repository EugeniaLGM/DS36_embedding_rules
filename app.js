//Create some constants we will use later to find out about the workbook structure

const viz = document.getElementById("ourviz");
let workbook;
let VizActiveSheet;
let listsheets;

//Log all the information about the workbook witha function

function logworkbookInformation() {
  //get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is "${workbook.name})`);

  //Get the array of dashboards and stand alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index[${index}] 
        is: "${element.name}`);
  });

  //We are only interested in the active sheet
  VizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet name is "${VizActiveSheet.name})`);

  //list all of the worksheets within the active sheet
  listsheets = VizActiveSheet.worksheets;
  listsheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index[${index}] 
    is: "${element.name}`);
  });

  saleMap = listsheets.find((ws) => ws.name == "SaleMap");
  totalsales = listsheets.find((ws) => ws.name == "Total Sales");
  salesbyproduct = listsheets.find((ws) => ws.name == "SalesByProduct");
  salesbysegment = listsheets.find((ws) => ws.name == "SalesBySegmanet");
}

//log the workbook information once the viz is interactive
viz.addEventListener("firstinteractive", logworkbookInformation);

//Tell js which button to look for
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const ClearFilterButton = document.getElementById("Clear_Filter");
const UndoButton = document.getElementById("Undo");

//Functions to do when buttons are clicked

function oregWashFunction() {
  //log what is pressed
  console.log(oregonWashingtonButton.value);

  //Apply the filter to all of the sheets
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalsales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function clearStateFilter() {
  saleMap.applyFilterAsync("State");
  totalsales.applyFilterAsync("State");
  salesByProduct.applyFilterAsync("State");
  salesBySegment.applyFilterAsync("State");
}

function undo() {
  viz.undoAsync();
}

oregonWashingtonButton.addEventListener("click", oregWashFunction);
oregonWashingtonButton.addEventListener("click", clearStateFilter);
oregonWashingtonButton.addEventListener("click", undo);

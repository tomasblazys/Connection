async function loadIntoTable(url, table, target) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const response = await fetch(url);
  const {
    headers,
    selected
  } = await response.json();

  //Clear the table

  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  for (const headerText of headers) {
    const headerElement = document.createElement("th");

    headerElement.textContent = headerText;
    tableHead.querySelector("tr").appendChild(headerElement);
  }

  for (const row of selected) {
    const rowElement = document.createElement("tr");

    for (const cellText of row) {
      const cellElement = document.createElement("td");

      cellElement.textContent = cellText;
      rowElement.appendChild(cellElement);
    }

    var query = rowElement.firstChild.textContent;
    tableBody.appendChild(rowElement);
    rowElement.classList.add("clickable");
    rowElement.setAttribute("onclick","window.location.assign('/details?ak=" + query +"');");
  }
};


loadIntoTable("/data.json", document.querySelector("table"));


// $(".clickable").click(function(e){
//          e.preventDefault();
//          document.location = "http://www.google.com/";
// });


// $(".clickable").click(function() {
//   window.open("www.google.lt");
//
// });

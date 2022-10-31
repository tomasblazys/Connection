async function loadIntoTable(url, table, target) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const response = await fetch(url);
  const {
    headers,
    selected
  } = await response.json();
  const count = headers.length;
  const [selectedArray] = selected;

  //Clear the table

  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const headerText = headers[i];
    const cellText = selectedArray[i];
    const headerElement = document.createElement("th");
    const rowElement = document.createElement("tr");
    const cellElement = document.createElement("td");
    tableBody.appendChild(rowElement);
    headerElement.textContent = headerText;
    cellElement.textContent = cellText;
    tableBody.lastChild.appendChild(headerElement);
    tableBody.lastChild.appendChild(cellElement);
  }
};

loadIntoTable("/data.json", document.querySelector("table"));

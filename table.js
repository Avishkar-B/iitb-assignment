var tableData = [
  {
    chemical_name: "Ammonium Persulfate",
    vendor: "LG Chem",
    density: "3535.92",
    viscosity: "60.63",
    packaging: "Bag",
    pack_size: "100.0",
    unit: "kg",
    quantity: "6495.18",
  },
  {
    chemical_name: "Caustic Potash",
    vendor: "Formosa",
    density: "3172.15",
    viscosity: "48.22",
    packaging: "Bag",
    pack_size: "100.0",
    unit: "kg",
    quantity: "8751.9",
  },
  {
    chemical_name: "Dimethylaminopropyl amino",
    vendor: "LG Chem",
    density: "8435.37",
    viscosity: "12.62",
    packaging: "Barrel",
    pack_size: "75.00",
    unit: "L",
    quantity: "5964.61",
  },
  {
    chemical_name: "Mono Ammonium Phosphate",
    vendor: "Sinopec",
    density: "1597.65",
    viscosity: "76.51",
    packaging: "Bag",
    pack_size: "105.00",
    unit: "kg",
    quantity: "8183.73",
  },
  {
    chemical_name: "Ferric Nitrate",
    vendor: "DowDuPont",
    density: "364.04",
    viscosity: "14.90",
    packaging: "Bag",
    pack_size: "105.00",
    unit: "kg",
    quantity: "4154.33",
  },
  {
    chemical_name: "n-Pentane",
    vendor: "Sinopec",
    density: "4535.26",
    viscosity: "66.76",
    packaging: "N/A",
    pack_size: "N/A",
    unit: "t",
    quantity: "6272.34",
  },
  {
    chemical_name: "Glycol Ether PM",
    vendor: "LG Chem",
    density: "6495.18",
    viscosity: "72.12",
    packaging: "Bag",
    pack_size: "250.00",
    unit: "kg",
    quantity: "8749.54",
  },
];
var formSubmitType = "add";
var selectedRowForEdit = null;
async function loadTableInHTML() {
  if (document.getElementById("table").getElementsByTagName("tbody")[0]) {
    document.getElementById("table").getElementsByTagName("tbody")[0].remove();
  }
  const tbodyElement = document.createElement("tbody");
  const tableElement = document.getElementById("table");
  tableData.forEach((row, index) => {
    const trElement = document.createElement("tr");
    const tdEle = document.createElement("td");
    tdEle.innerHTML = `<input  type="checkbox" value="" class='rowCheckBox' id="${
      index + "-rowCheckBox"
    }" >
    <button class="btn btn-text-primary bi bi-pencil" type="button"
                                onclick="toggleDialogVisibility(this, 'open', 'edit')"></button>`;
    const id = document.createElement("td");
    id.innerHTML = index + 1;
    trElement.appendChild(tdEle);
    trElement.appendChild(id);
    Object.values(row).forEach((v) => {
      const tdEle = document.createElement("td");
      tdEle.innerHTML = v;
      trElement.appendChild(tdEle);
    });
    tbodyElement.appendChild(trElement);
  });
  tableElement.appendChild(tbodyElement);
}

function onCheckboxClick(event, sourceID) {
  const rowCheckBoxList = document.querySelectorAll(".rowCheckBox");
  rowCheckBoxList.forEach((row) => {
    row.checked = event.checked;
  });
}
function shiftRows(event, direction) {
  const rowCheckBoxList = document.querySelectorAll(".rowCheckBox:checked");

  rowCheckBoxList.forEach((checkBox) => {
    if (checkBox.checked) {
      const row = checkBox.parentNode.parentNode;
      if ((direction = "up")) {
        row.parentNode.insertBefore(row, row.previousElementSibling);
      } else {
        row.parentNode.insertBefore(row.previousElementSibling, row);
      }
    }
  });
}

function removeRows(event) {
  const checkBoxesChecked = document.querySelectorAll(".rowCheckBox:checked");
  checkBoxesChecked.forEach((checkBox) => {
    if (checkBox.checked) {
      const row = checkBox.parentNode.parentNode;
      const tableBody = row.parentNode;
      tableBody.removeChild(row);
    }
  });
}

function editRowOnCheckboxSelect(event) {
  // const selectedRows = document.querySelectorAll(".rowCheckBox:checked");
  // selectedRows.forEach((row) => {
  //   row.parentElement.parentElement.childNodes.forEach((cell) => {
  //     cell.contentEditable = true;
  //   });
  // });
}

function toggleDialogVisibility(event, state, type) {
  const dialog = document.getElementById("dialogEle");
  const inputs = form.getElementsByTagName("input");
  for (const input of inputs) {
    input.value = "";
  }
  if (state == "open") {
    if (type == "edit") {
      const row = event.parentNode.parentNode.rowIndex;
      selectedRowForEdit = row;

      const rowCells = event.parentNode.parentNode.children;
      document.getElementById("recordID").value = rowCells[1].innerText;
      document.getElementById("chemical_name").value = rowCells[2].innerText;
      document.getElementById("vendor").value = rowCells[3].innerText;
      document.getElementById("density").value = rowCells[4].innerText;
      document.getElementById("viscosity").value = rowCells[5].innerText;
      document.getElementById("packaging").value = rowCells[6].innerText;
      document.getElementById("pack_size").value = rowCells[7].innerText;
      document.getElementById("unit").value = rowCells[8].innerText;
      document.getElementById("quantity").value = rowCells[9].innerText;
      formSubmitType = type;
    } else if (type == "add") {
      formSubmitType = type;
    }
    dialog.showModal();
  } else if (state == "close") {
    dialog.close();
  }
}

function formSubmit(event) {
  const form = document.getElementById("formid");
  // event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const tableBody = document.getElementsByTagName("tbody");
  const newRow = `
  <tr>
    <td>
    <input  type="checkbox" value="" class='rowCheckBox' id="rowCheckBox" >
    <button class="btn btn-text-primary bi bi-pencil" type="button" onclick="toggleDialogVisibility(this, 'open', 'edit')"></button>
    </td>
    <td>${data["id"]}</td>
    <td>${data["chemical_name"]}</td>
    <td>${data["vendor"]}</td>
    <td>${data["density"]}</td>
    <td>${data["viscosity"]}</td>
    <td>${data["packaging"]}</td>
    <td>${data["pack_size"]}</td>
    <td>${data["unit"]}</td>
    <td>${data["quantity"]}</td>
  </tr>
  `;
  if (formSubmitType == "add") {
    tableBody[0].insertAdjacentHTML("beforeend", newRow);
  } else {
    tableBody[0].rows[selectedRowForEdit - 1].innerHTML = newRow;
  }
  const dialog = document.getElementById("dialogEle");
  dialog.close();
  formSubmitType = "add";
}

const form = document.getElementById("formid");

let sortDirection = {};

function sortTable(colIndex) {
  const table = document.getElementById("table");
  const rowsArray = Array.from(table.rows).slice(1);
  if (!sortDirection[colIndex]) {
    sortDirection[colIndex] = "a";
  } else {
    sortDirection[colIndex] = sortDirection[colIndex] === "a" ? "d" : "a";
  }

  rowsArray.sort((prevRow, row) => {
    let prevCell = prevRow.cells[colIndex].innerText;
    let cell = row.cells[colIndex].innerText;
    if (prevCell < cell) {
      return sortDirection[colIndex] === "a" ? -1 : 1;
    }
    if (prevCell > cell) {
      return sortDirection[colIndex] === "d" ? 1 : -1;
    }
    return 0;
  });

  for (const row of rowsArray) {
    table.tBodies[0].appendChild(row);
  }
}

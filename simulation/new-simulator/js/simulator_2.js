// ===== Button and input =====
const getO = document.getElementById("o");
const getFo = document.getElementById("fo");

const checkBtn = document.getElementById("check-btn");
const tableBody = document.getElementById("table-body");

// ===== Create a td tag =====
const createTd = (value) => {
  const td = document.createElement("td");
  td.innerText = value;
  td.classList.add("border");
  td.classList.add("border-gray-400");
  return td;
};

// ===== Creating a row =====
const createRow = (o, fo, fault) => {
  const tr = document.createElement("tr");
  const td1 = createTd(o);
  tr.appendChild(td1);
  const td2 = createTd(fo);
  tr.appendChild(td2);
  const td3 = createTd(fault);
  if (fault == "No Fault") {
    td3.classList.add("bg-green-200");
  } else {
    td3.classList.add("bg-red-200");
  }
  tr.appendChild(td3);
  tableBody.appendChild(tr);
};

// ===== Validate Input =====
const checkNum = (num) => {
  if (!isNaN(num) && num != "" && (num == 1) | (num == 0)) {
    return true;
  } else {
    return false;
  }
};

// ===== Faults =====
const getResult = (o, fo) => {
  if (o==fo) {
    return "No Fault";
  } else if(o==0 && fo==1) {
    return "x SA1, y SA0, y SA1, z SA1, p SA1, q SA1, r SA1, c SA1";
  } else if(o==1 && fo==0) {
    return "x SA0, y SA0, z SA0, p SA0, q SA0, r SA0, c SA0";
  }
  else {
    return "Not SA0 or SA1 fault";
  }
};

// ===== Getting Result =====
checkBtn.addEventListener("click", () => {
  const o = getO.value;
  const fo = getFo.value;
  if (checkNum(o) && checkNum(fo)) {
    createRow(o, fo, getResult(o, fo));
  }
  getO.value = "";
  getFo.value = "";
});

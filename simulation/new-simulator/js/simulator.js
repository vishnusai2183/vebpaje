// ===== Button and input =====
const getX = document.getElementById("x");
const getY = document.getElementById("y");
const getY = document.getElementById("z");
const getA = document.getElementById("a");
const getB = document.getElementById("b");
const getC = document.getElementById("c");
const getD = document.getElementById("d");
const getE = document.getElementById("e");
const getF = document.getElementById("f");
const getG = document.getElementById("g");
const getH = document.getElementById("h");
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
const createRow = (x, y, fault, exps, expc, fRes) => {
  const tr = document.createElement("tr");
  const td1 = createTd(`${x} ${y}`);
  tr.appendChild(td1);
  const td2 = createTd(`${fault}`);
  tr.appendChild(td2);
  const td3 = createTd(exps);
  tr.appendChild(td3);
  const td4 = createTd(expc);
  tr.appendChild(td4);
  const td5 = createTd(fRes.s);

  // ===== Wrong Mark for sum =====
  if (exps != fRes.s) {
    td5.classList.add("bg-red-300");
  }
  tr.appendChild(td5);
  const td6 = createTd(fRes.c);

  // ===== Wrong Mark for carry =====
  if (expc != fRes.c) {
    td6.classList.add("bg-red-300");
  }
  tr.appendChild(td6);
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

// ===== x XOR y =====
const getSum = (x, y) => {
  if (x == 0 && y == 0) {
    return 0;
  } else if (x == 0 && y == 1) {
    return 1;
  } else if (x == 1 && y == 0) {
    return 1;
  } else if (x == 1 && y == 1) {
    return 0;
  }
};

// ===== x AND y =====
const getCarry = (x, y) => {
  if (x == 0 && y == 0) {
    return 0;
  } else if (x == 0 && y == 1) {
    return 0;
  } else if (x == 1 && y == 0) {
    return 0;
  } else if (x == 1 && y == 1) {
    return 1;
  }
};

// ===== return 1 or 0
const zeroOrOne = (v) => {
  let r;
  if (v.value == 0) {
    r = 0;
  } else {
    r = 1;
  }
  v.value = "";
  return r;
};

// ===== Fault =====
const getFault = () => {
  let fault = {};
  if (checkNum(getA.value)) {
    fault.f = "a";
    fault.v = zeroOrOne(getA);
  } else if (checkNum(getB.value)) {
    fault.f = "b";
    fault.v = zeroOrOne(getB);
  } else if (checkNum(getC.value)) {
    fault.f = "c";
    fault.v = zeroOrOne(getC);
  } else if (checkNum(getD.value)) {
    fault.f = "d";
    fault.v = zeroOrOne(getD);
  } else if (checkNum(getE.value)) {
    fault.f = "e";
    fault.v = zeroOrOne(getE);
  } else if (checkNum(getF.value)) {
    fault.f = "f";
    fault.v = zeroOrOne(getF);
  } else if (checkNum(getG.value)) {
    fault.f = "g";
    fault.v = zeroOrOne(getG);
  } else if (checkNum(getH.value)) {
    fault.f = "h";
    fault.v = zeroOrOne(getH);
  }
  return fault;
};

// ===== Fault Res =====
const getFaultRes = (x, y, flt) => {
  let tx = x;
  let ty = y;
  let res = {};
  if (flt.f == "a") {
    x = flt.v;
    res.s = getSum(x, y);
    res.c = getCarry(x, y);
  } else if (flt.f == "b") {
    y = flt.v;
    res.s = getSum(x, y);
    res.c = getCarry(x, y);
  } else if (flt.f == "c") {
    x = flt.v;
    res.s = getSum(x, y);
    res.c = getCarry(tx, ty);
  } else if (flt.f == "d") {
    y = flt.v;
    res.s = getSum(x, y);
    res.c = getCarry(tx, ty);
  } else if (flt.f == "e") {
    x = flt.v;
    res.s = getSum(tx, ty);
    res.c = getCarry(x, y);
  } else if (flt.f == "f") {
    y = flt.v;
    res.s = getSum(tx, ty);
    res.c = getCarry(x, y);
  } else if (flt.f == "g") {
    res.s = flt.v;
    res.c = getCarry(tx, ty);
  } else if (flt.f == "h") {
    res.s = getSum(tx, ty);
    res.c = flt.v;
  }
  return res;
};

// ===== Getting Result =====
checkBtn.addEventListener("click", () => {
  const x = getX.value;
  const y = getY.value;
  getX.value = "";
  getY.value = "";

  let faults = getFault();
  let fRes = {};
  if (Object.keys(faults) == 0) {
    faults = "N/A";
    fRes.s = getSum(x, y);
    fRes.c = getCarry(x, y);
  } else {
    fRes = getFaultRes(x, y, faults);
    faults = `${faults.f} SA${faults.v}`;
  }
  if (checkNum(x) && checkNum(x)) {
    createRow(x, y, faults, getSum(x, y), getCarry(x, y), fRes);
  }
});

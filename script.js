let out1 = document.getElementById("output1");
let out2 = document.getElementById("output2");
let container = document.getElementById("container");
let resultSection = document.getElementById("resultSection");
let historyList = document.getElementById("historyList");
let toast = document.getElementById("toast");
let body = document.body;
let toggleBtn = document.querySelector(".toggle");

body.classList.add("dark");

/* LOAD HISTORY */
window.onload = () => {
  let saved = JSON.parse(localStorage.getItem("history")) || [];
  historyList.innerHTML = "";
  saved.forEach(addToHistoryUI);
};

/* CONVERT */
function convertTemp() {
  let temp = parseFloat(document.getElementById("tempInput").value);
  let unit = document.getElementById("unit").value;

  if (isNaN(temp)) {
    resetUI();
    return;
  }

  let result1, result2;

  if (unit === "celsius") {
    let f = (temp * 9) / 5 + 32;
    let k = temp + 273.15;
    result1 = `Fahrenheit: ${f.toFixed(2)}`;
    result2 = `Kelvin: ${k.toFixed(2)}`;
  } else if (unit === "fahrenheit") {
    let c = ((temp - 32) * 5) / 9;
    let k = c + 273.15;
    result1 = `Celsius: ${c.toFixed(2)}`;
    result2 = `Kelvin: ${k.toFixed(2)}`;
  } else {
    let c = temp - 273.15;
    let f = (c * 9) / 5 + 32;
    result1 = `Celsius: ${c.toFixed(2)}`;
    result2 = `Fahrenheit: ${f.toFixed(2)}`;
  }

  out1.innerText = result1;
  out2.innerText = result2;

  container.classList.add("expanded");
  resultSection.classList.add("show");

  saveHistory(`${temp} ${unit} → ${result1}, ${result2}`);
}

/* RESET */
function resetUI() {
  out1.innerText = "";
  out2.innerText = "";
  container.classList.remove("expanded");
  resultSection.classList.remove("show");
}

/* CLEAR INPUT */
function clearInput() {
  document.getElementById("tempInput").value = "";
  resetUI();
}

/* HISTORY */
function saveHistory(text) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.unshift(text);
  if (history.length > 5) history = history.slice(0, 5);
  localStorage.setItem("history", JSON.stringify(history));

  historyList.innerHTML = "";
  history.forEach(addToHistoryUI);
}

function addToHistoryUI(text) {
  let li = document.createElement("li");
  li.innerText = text;
  historyList.appendChild(li);
}

function clearHistory() {
  localStorage.removeItem("history");
  historyList.innerHTML = "";
}

/* COPY */
function copyText(id) {
  let text = document.getElementById(id).innerText;
  if (!text) return;
  navigator.clipboard.writeText(text);
  showToast();
}

/* TOAST */
function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}

/* TOGGLE */
function toggleMode() {
  body.classList.toggle("dark");
  body.classList.toggle("light");
  toggleBtn.innerText = body.classList.contains("dark") ? "🌙" : "☀️";
}

/* EVENTS */
document.getElementById("tempInput").addEventListener("input", convertTemp);
document.getElementById("unit").addEventListener("change", convertTemp);

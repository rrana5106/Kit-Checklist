// ==============================
// 1) SELECT (get HTML elements)
// ==============================
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progress-text");
const formEl = document.getElementById("addItemForm");
const inputValue = document.getElementById("item-name");
const categoryElement = document.getElementById("category");

// alert container
const alertMsg = document.querySelector(".alertMsg");

// ✅ Each category has its own <ul> in HTML
const personalList = document.getElementById("personal-kit");
const bergenList = document.getElementById("bergen-kit");
const daySackList = document.getElementById("daysack-kit");

// creating Object for the category
const categoryObj = {
  Personal: personalList,
  Bergen: bergenList,
  Daysack: daySackList,
};

// Create the percent label once (we will update it later)
const progressPercentEl = document.createElement("span");
progressText.append(progressPercentEl);

// ==============================
// 2) ALERT: show pill message
// ==============================
function showAlert(messageText, color) {
  // remove old message first
  alertMsg.textContent = "";

  // create a new pill
  const messageEl = document.createElement("div");

// // add pill style
//   messageEl.classList.add("msgStyle");

  // add text
  messageEl.textContent = messageText;

  // set text color
  messageEl.style.color = color;

  // put pill inside alert container
  alertMsg.appendChild(messageEl);

  // auto hide the message after 3 seconds
   setTimeout(function () {
    alertMsg.textContent = "";
  }, 3000);
}

// ================================
// 3) function to add item to the list
// ================================
function addItemToList(text, targetList) {
  // Create li element
  const liEl = document.createElement("li");

  // remove bullet
  liEl.style.listStyleType = "none";

  // create remove button
  const btnEl = document.createElement("button");
  btnEl.textContent = "remove";
  btnEl.classList.add("remove-btn");

  // create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox-item");

  // create item text
  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("item");

  // Put them inside <li>
  liEl.append(checkbox, span, btnEl);

  // remove one item
  btnEl.addEventListener("click", function () {
    const confirmDel = confirm("Are you sure?");
    if (confirmDel === false) {
      return;
    }

    // remove only this item
    liEl.remove();

    // update app
    updateProgressBar();
    saveToLocalStorage();

    // show message
    showAlert("Item removed", "red");
  });

  targetList.append(liEl);
}

// ==============================
// 4) LISTEN: when form is submitted
// ==============================
formEl.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page refresh

  // Get selected category
  const category = categoryElement.value.trim();

  // Get typed text
  const text = inputValue.value.trim();

  // Find the correct list
  const targetList = categoryObj[category];

  // validation
  if (text === "" && !targetList) {
    showAlert("Please select the category and input the item name.", "red");
    return;
  }

  if (text === "") {
    showAlert("Please type the item name.", "red");
    return;
  }

  if (!targetList) {
    showAlert("Please select the category.", "red");
    return;
  }

  // success message
  showAlert(`Item successfully added to ${category}`, "green");

  // add item
  addItemToList(text, targetList);

  // save data
  saveToLocalStorage();

  // clear input
  inputValue.value = "";
  inputValue.focus();

  // update progress
  updateProgressBar();
});

// ==============================
// 5) LISTEN: one listener for ALL checkboxes
// ==============================
const allListsContainer = document.getElementById("all-lists") || document.body;

allListsContainer.addEventListener("change", function (event) {
  if (!event.target.classList.contains("checkbox-item")) return;

  updateTextStyle(event.target);
  updateProgressBar();
  saveToLocalStorage();
});

// ==============================
// 6) CHANGE: update progress bar
// ==============================
function updateProgressBar() {
  const allCheckboxes = document.querySelectorAll(".checkbox-item");

  let checkedCount = 0;

  allCheckboxes.forEach(function (cb) {
    if (cb.checked) {
      checkedCount += 1;
    }
  });

  let percent = 0;

  if (allCheckboxes.length > 0) {
    percent = (checkedCount / allCheckboxes.length) * 100;
  }

  progressBar.value = percent;
  progressPercentEl.textContent = Math.ceil(percent) + "%";
}

// ==============================
// 7) CHANGE: cross / uncross text
// ==============================
function updateTextStyle(checkbox) {
  const textEl = checkbox.nextElementSibling;

  if (!textEl) {
    return;
  }

  if (checkbox.checked) {
    textEl.classList.add("crossed");
  } else {
    textEl.classList.remove("crossed");
  }
}

// ==============================
// 8) STORAGE: save data to localStorage
// ==============================
function saveToLocalStorage() {
  // create empty object
  const data = {
    Personal: [],
    Bergen: [],
    Daysack: [],
  };

  // ---------- Personal ----------
  const personalItems = personalList.querySelectorAll("li");

  personalItems.forEach(function (li) {
    const checkbox = li.querySelector(".checkbox-item");
    const textEl = li.querySelector(".item");

    data.Personal.push({
      text: textEl.textContent,
      checked: checkbox.checked,
    });
  });

  // ---------- Bergen ----------
  const bergenItems = bergenList.querySelectorAll("li");

  bergenItems.forEach(function (li) {
    const checkbox = li.querySelector(".checkbox-item");
    const textEl = li.querySelector(".item");

    data.Bergen.push({
      text: textEl.textContent,
      checked: checkbox.checked,
    });
  });

  // ---------- Daysack ----------
  const daysackItems = daySackList.querySelectorAll("li");

  daysackItems.forEach(function (li) {
    const checkbox = li.querySelector(".checkbox-item");
    const textEl = li.querySelector(".item");

    data.Daysack.push({
      text: textEl.textContent,
      checked: checkbox.checked,
    });
  });

  // save as string
  localStorage.setItem("kitChecklist", JSON.stringify(data));
}

// ==============================
// 9) STORAGE: load data from localStorage
// ==============================
function loadFromLocalStorage() {
  const savedData = localStorage.getItem("kitChecklist");

  // if nothing saved, stop
  if (!savedData) return;

  // clear current lists first
  personalList.innerHTML = "";
  bergenList.innerHTML = "";
  daySackList.innerHTML = "";

  // convert string back to object
  const data = JSON.parse(savedData);

  // ---------- Personal ----------
  data.Personal.forEach(function (item) {
    addItemToList(item.text, personalList);

    const lastLi = personalList.lastElementChild;
    const checkbox = lastLi.querySelector(".checkbox-item");

    checkbox.checked = item.checked;
    updateTextStyle(checkbox);
  });

  // ---------- Bergen ----------
  data.Bergen.forEach(function (item) {
    addItemToList(item.text, bergenList);

    const lastLi = bergenList.lastElementChild;
    const checkbox = lastLi.querySelector(".checkbox-item");

    checkbox.checked = item.checked;
    updateTextStyle(checkbox);
  });

  // ---------- Daysack ----------
  data.Daysack.forEach(function (item) {
    addItemToList(item.text, daySackList);

    const lastLi = daySackList.lastElementChild;
    const checkbox = lastLi.querySelector(".checkbox-item");

    checkbox.checked = item.checked;
    updateTextStyle(checkbox);
  });

  updateProgressBar();
}

// ==============================
// 10) Run when page loads
// ==============================
loadFromLocalStorage();

document.querySelectorAll(".checkbox-item").forEach(function (cb) {
  updateTextStyle(cb);
});

updateProgressBar();

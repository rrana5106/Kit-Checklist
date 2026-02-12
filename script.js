// ==============================
// 1) SELECT (get HTML elements)
// ==============================
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progress-text");
const formEl = document.getElementById("addItemForm");
const inputValue = document.getElementById("item-name");
// const listEl = document.getElementById("person-kit");
const categoryElement = document.getElementById("category");

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

// ================================
// functon to add item to the list
// ================================
function addItemToList(text, targetList) {
  // Create li element
  const liEl = document.createElement("li");
  // adding list-style-type to "none"
  liEl.style.listStyleType = "none";

  // create input element
  const checkbox = document.createElement("input");
  // Setup checkbox
  checkbox.type = "checkbox";
  // add class checkbox-item
  checkbox.classList.add("checkbox-item");

  // create span element
  const span = document.createElement("span");
  // Setup text
  span.textContent = text;
  // add class to span
  span.classList.add("item");

  // Put them inside <li>
  liEl.append(checkbox, span);

  targetList.append(liEl);
}

// ==============================
// 2) LISTEN: when form is submitted
// ==============================
formEl.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page refresh

  // Get what use choose the category
  const category = categoryElement.value.trim();
  // Get what the user typed
  const text = inputValue.value.trim();
  // get the element
  const alertBox = document.querySelector(".alert");

  const targetList = categoryObj[category];

  if (text === "" && !targetList) {
    alertBox.textContent =
      "Please select the category and input the item name.";
    alertBox.style.color = "red";
    return;
  }
  if (text === "") {
    alertBox.textContent = "Please type the item name.";
    alertBox.style.color = "red";

    return;
  }

  if (!targetList) {
    alertBox.textContent = "Please select the category";
    alertBox.style.color = "red";
    return;
  }
  // ✅ clear alert message on success
  alertBox.textContent = `Item successfully added to ${category}`;
  alertBox.style.color = "green";

  addItemToList(text, targetList);

  // Clear the input after adding
  inputValue.value = "";

  // Update progress (new checkbox added means percent changes)
  updateProgressBar();
});

// ==============================
// 4) LISTEN: one listener for ALL checkboxes (event delegation)
// ==============================
// Put this on a common parent that contains ALL lists.
// If you don't have one, you can wrap your three ULs in a <div id="all-lists">...</div>
// and use that instead.
const allListsContainer = document.getElementById("all-lists") || document.body;

allListsContainer.addEventListener("change", function (event) {
  if (!event.target.classList.contains("checkbox-item")) return;

  updateTextStyle(event.target);
  updateProgressBar();
});

// ==============================
// 4) CHANGE: update progress bar
// ==============================
function updateProgressBar() {
  const allCheckboxes = document.querySelectorAll(".checkbox-item");

  let checkedCount = 0;

  allCheckboxes.forEach(function (cb) {
    if (cb.checked) {
      checkedCount += 1; // checkedCount = checkedCount + 1;
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
// 5) CHANGE: cross/uncross text
// ==============================
function updateTextStyle(checkbox) {
  const textEl = checkbox.nextElementSibling; // the <span> after checkbox
  // if text
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
// 5) STORAGE: adding to the local storage so the it can keep the data even we refresh the page
// ==============================
function saveToLocalStorage() {
  const data = {
    Personal: [],
    Bergen: [],
    Daysack: [],
  };
}

// Run once on page load (if you already have items in HTML)
document.querySelectorAll(".checkbox-item").forEach(function (cb) {
  updateTextStyle(cb);
});
updateProgressBar();

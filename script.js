/*
// 1) Get the elements we need
const checkboxes = document.querySelectorAll(".checkbox-item");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progress-text");
const categoryEl = document.getElementById("category");
const formEl = document.getElementById("addItemForm");
const inputValue = document.getElementById("item-name");
const personKit = document.getElementById("person-kit");

formEl.addEventListener("submit", function (event) {
  // prevent the default behavior of the form, from self reloading
  event.preventDefault();

  // creating  element
  const liElement = document.createElement("li");
  const inputEL = document.createElement("input");
  const itemTextEl = document.createElement("span");

  // setting attribute
  // inputEL.setAttribute("type", "checkbox");
  inputEL.type = "checkbox";

  // adding class
  inputEL.classList.add("checkbox-item");
  itemTextEl.classList.add("item");

  // adding the text content
  itemTextEl.textContent = inputValue.value;

  // appending or adding all the element in the
  liElement.append(inputEL, itemTextEl);
  // liElement.setAttribute("style", "list-style-type: none;");
  liElement.style.listStyleType = "none";

  personKit.append(liElement);

  // attach the event listener to the input
  inputEL.addEventListener("change", function () {
    updateTextStyle(inputEL);
    updateProgressBar();
  });
});

/*
// console.log(categoryEl.value);
// selecting the category
function selectingCategory() {
  if (categoryEl.value === "Personal") {
    console.log("Category: personal");
  }
  if (categoryEl.value === "Bergen") {
    console.log("Category: Bergen");
  }
  if (categoryEl.value === "Day-sack") {
    console.log("Category: Day-sack");
  }
}
*/
/*
// creating the element
const progressPercentEL = document.createElement("span");

progressText.append(progressPercentEL);

// 2) Update the progress bar (based on how many are checked)
function updateProgressBar() {
  // get all current checkboxes (old + new)
  const allCheckboxes = document.querySelectorAll(".checkbox-item");

  let checkedCount = 0;

  // Count checked checkboxes
  allCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      checkedCount = checkedCount + 1;
    }
  });

  // default progress
  let percent = 0;
  // Convert to percentage
  // const percent = (checkedCount / checkboxes.length) * 100;

  // calculate only if there is at least one checkbox
  if (allCheckboxes.length > 0) {
    percent = (checkedCount / allCheckboxes.length) * 100;
  }

  // Update the progress bar value
  progressBar.value = percent;

  // showing the percentage value beside the bar
  progressPercentEL.textContent = Math.ceil(percent) + "%";
}

// 3) Cross / uncross the text beside a checkbox
function updateTextStyle(checkbox) {
  const text = checkbox.nextElementSibling;

  if (checkbox.checked) {
    text.classList.add("crossed");
  } else {
    text.classList.remove("crossed");
  }
}

// 4) When any checkbox changes, update text + progress
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    updateTextStyle(checkbox);
    updateProgressBar();
  });
});

// 5) Run once when page loads (sets correct initial state)
checkboxes.forEach(function (checkbox) {
  updateTextStyle(checkbox);
});
updateProgressBar();
*/


// ==============================
// 1) SELECT (get HTML elements)
// ==============================
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progress-text");
const formEl = document.getElementById("addItemForm");
const inputValue = document.getElementById("item-name");
const listEl = document.getElementById("person-kit");

// Create the percent label once (we will update it later)
const progressPercentEl = document.createElement("span");
progressText.append(progressPercentEl);

// ==============================
// 2) LISTEN: when form is submitted
// ==============================
formEl.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page refresh

  // Get what the user typed
  const text = inputValue.value.trim();
  if (text === "") return; // don't add empty items

  // Create elements
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");

  // Setup checkbox
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox-item");

  // Setup text
  span.textContent = text;
  span.classList.add("item");

  // Put them inside <li>
  li.append(checkbox, span);
  li.style.listStyleType = "none";

  // Add <li> to the list
  listEl.append(li);

  // Clear the input after adding
  inputValue.value = "";

  // Update progress (new checkbox added means percent changes)
  updateProgressBar();
});

// ==============================
// 3) LISTEN: one listener for ALL checkboxes (event delegation)
// ==============================
listEl.addEventListener("change", function (event) {
  // Only react if the thing that changed is a checkbox-item
  if (!event.target.classList.contains("checkbox-item")) return;

  // event.target is the checkbox
  const checkbox = event.target;

  updateTextStyle(checkbox);
  updateProgressBar();
});

// ==============================
// 4) CHANGE: update progress bar
// ==============================
function updateProgressBar() {
  const allCheckboxes = document.querySelectorAll(".checkbox-item");

  let checkedCount = 0;
  allCheckboxes.forEach(function (cb) {
    if (cb.checked) checkedCount += 1;
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
  if (!textEl) return;

  if (checkbox.checked) {
    textEl.classList.add("crossed");
  } else {
    textEl.classList.remove("crossed");
  }
}

// Run once on page load (if you already have items in HTML)
document.querySelectorAll(".checkbox-item").forEach(function (cb) {
  updateTextStyle(cb);
});
updateProgressBar();


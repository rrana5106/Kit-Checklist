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
  const inputEL = document.createElement("input");
  const itemTextEl = document.createElement("span");

  // setting attribute
  inputEL.setAttribute("type", "checkbox");

  // adding class
  inputEL.classList.add("checkbox-item");
  itemTextEl.classList.add("item");

  // adding the text content
  itemTextEl.textContent = inputValue.value;

  // appending or adding all the element in the
  personKit.append(inputEL, itemTextEl);

  // attach the event listener to the input
  inputEL.addEventListener("change", function () {
    updateTextStyle(inputEL);
    updateProgressBar();
  });
});

// /*
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

// creating the element
const progressPercentEL = document.createElement("span");

progressText.append(progressPercentEL);

// 2) Update the progress bar (based on how many are checked)
function updateProgressBar() {
  let checkedCount = 0;

  // Count checked checkboxes
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      checkedCount = checkedCount + 1;
    }
  });

  // Convert to percentage
  const percent = (checkedCount / checkboxes.length) * 100;

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
// */

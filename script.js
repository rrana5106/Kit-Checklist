// 1) Get the elements we need
const checkboxes = document.querySelectorAll(".checkbox-item");
const progressBar = document.getElementById("progressBar");

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

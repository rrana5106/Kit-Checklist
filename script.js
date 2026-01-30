// get elements
const checkbox = document.getElementById("test");
const text = document.getElementById("labelText");
const progressBar = document.getElementById("progressBar");

// when checkbox changes
checkbox.addEventListener("change", function () {

  // if checkbox is checked
  if (checkbox.checked === true) {

    // cross the text
    text.classList.add("crossed");

    // fill the progress bar
    progressBar.style.width = "100%";

  } else {

    // remove cross from text
    text.classList.remove("crossed");

    // empty the progress bar
    progressBar.style.width = "0%";
  }
});
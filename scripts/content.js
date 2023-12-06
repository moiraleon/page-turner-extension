// Functions
function pageTurnForward() {
  const screenHeight = window.innerHeight;
  const currentScrollPosition = window.scrollY || window.pageYOffset;
  const newScrollPosition = currentScrollPosition + screenHeight;

  // Scroll the page to the new position without a smooth transition
  window.scrollTo({
      top: newScrollPosition,
      behavior: 'auto'
  });
}

function pageTurnBackward() {
  const screenHeight = window.innerHeight;
  const currentScrollPosition = window.scrollY || window.pageYOffset;
  const newScrollPosition = currentScrollPosition - screenHeight;

  // Scroll the page to the new position without a smooth transition
  window.scrollTo({
      top: newScrollPosition,
      behavior: 'auto'
  });
}
// Function to add styles to an element
function addStyles(element, styles) {
  for (const property in styles) {
      if (styles.hasOwnProperty(property)) {
          element.style[property] = styles[property];
      }
  }
}

// Insert left and right arrow icons
const arrowButtons = document.createElement("div");
arrowButtons.classList.add("arrow-buttons");

// Define styles
const arrowButtonsStyles = {
  zIndex: "5000",
  position: "absolute",
  right: "10px",
  bottom: "5%",
};

const leftArrowButton = document.createElement("button");
leftArrowButton.id = "leftArrow";
leftArrowButton.textContent = "←";
leftArrowButton.addEventListener("click", pageTurnBackward);

const rightArrowButton = document.createElement("button");
rightArrowButton.id = "rightArrow";
rightArrowButton.textContent = "→";
rightArrowButton.addEventListener("click", pageTurnForward);

arrowButtons.appendChild(leftArrowButton);
arrowButtons.appendChild(rightArrowButton);

document.body.appendChild(arrowButtons);

// Functions
function pageTurnForward() {
  const screenHeight = window.innerHeight;
  const currentScrollPosition = window.scrollY || window.pageYOffset;
  const scrollDepth = 0.8 * screenHeight;
  const newScrollPosition = currentScrollPosition + scrollDepth;

  // Scroll the page to the new position without a smooth transition
  window.scrollTo({
      top: newScrollPosition,
      behavior: 'auto'
  });
}

function pageTurnBackward() {
  const screenHeight = window.innerHeight;
  const currentScrollPosition = window.scrollY || window.pageYOffset;
  const scrollDepth = 0.8 * screenHeight;
  const newScrollPosition = currentScrollPosition - scrollDepth;

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

// Define styles for the arrowButtons div
const arrowButtonsStyles = {
  right: "100px",
  bottom: "50px",
  color: "black",
  position: "fixed",
  zIndex: "2147483646",
  width: "auto",
  minHeight: "49px",
  borderRadius: "4px 0 0 4px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  transition: "opacity 0.12s ease-in-out, width 0.12s ease-in-out",
  boxSizing: "border-box",
};

// Define button styles
const buttonStyles = `
  .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      border: 2px solid #3498db; /* Border color */
      border-radius: 5px;
      background-color: #3498db; /* Background color */
      color: #fff; /* Text color */
      margin: 2px;
      transition: background-color 0.3s, color 0.3s, border 0.3s;
  }

  .button:hover {
      background-color: #fff; /* Hover background color */
      color: #3498db; /* Hover text color */
      border: 2px solid #3498db; /* Hover border color */
  }
`;

// Create a style element and append it to the head
const styleElement = document.createElement("style");
styleElement.textContent = buttonStyles;
document.head.appendChild(styleElement);

// Add styles to the arrowButtons div
addStyles(arrowButtons, arrowButtonsStyles);

const leftArrowButton = document.createElement("button");
leftArrowButton.classList.add("button"); // Apply the button class
leftArrowButton.id = "leftArrow";
leftArrowButton.textContent = "←";
leftArrowButton.addEventListener("click", pageTurnBackward);

const rightArrowButton = document.createElement("button");
rightArrowButton.classList.add("button"); // Apply the button class
rightArrowButton.id = "rightArrow";
rightArrowButton.textContent = "→";
rightArrowButton.addEventListener("click", pageTurnForward);

arrowButtons.appendChild(leftArrowButton);
arrowButtons.appendChild(rightArrowButton);

document.body.appendChild(arrowButtons);

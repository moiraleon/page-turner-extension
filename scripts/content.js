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

// Insert left and right arrow icons
const arrowButtons = document.createElement("div");
arrowButtons.classList.add("arrow-buttons");

// Add styles to the arrowButtons div
arrowButtons.style.zIndex = "5000";
arrowButtons.style.position = "absolute";
arrowButtons.style.right = "10px";
arrowButtons.style.bottom = "50px";
arrowButtons.style.color = "black";

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

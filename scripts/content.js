// Dynamically insert Font Awesome CSS
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
document.head.appendChild(fontAwesomeLink);

// Function to update the displayed value
function updateScrollValue(scrollValueSpan, scrollPercentage) {
    scrollValueSpan.textContent = scrollPercentage * 10 + '%';
}

let scrollPercentage;
let scrollDepthDecimal;

// Event listener for the left button (decrement)
function leftButtonListener(scrollPercentage, scrollDepthDecimal, scrollValueSpan) {
    return function() {
        if (scrollPercentage > 1) {
            scrollPercentage--;
            scrollDepthDecimal = scrollPercentage / 10;
            updateScrollValue(scrollValueSpan, scrollPercentage);
            saveScrollPercentageToBackground(scrollPercentage);
            saveScrollDepthDecimalToBackground(scrollDepthDecimal);
        }
    };
}

// Event listener for the right button (increment)
function rightButtonListener(scrollPercentage, scrollDepthDecimal, scrollValueSpan) {
    return function() {
        if (scrollPercentage < 10) {
            scrollPercentage++;
            scrollDepthDecimal = scrollPercentage / 10;
            updateScrollValue(scrollValueSpan, scrollPercentage);
            saveScrollPercentageToBackground(scrollPercentage);
            saveScrollDepthDecimalToBackground(scrollDepthDecimal);
        }
    };
}

// Function to save the scrollPercentage to background script
function saveScrollPercentageToBackground(scrollPercentage) {
    console.log("call to save scroll percentage" + scrollPercentage);
    chrome.runtime.sendMessage({ action: 'setScrollPercentage', scrollPercentage: scrollPercentage });
}

// Function to save the scrollDepthDecimal to background script
function saveScrollDepthDecimalToBackground(scrollDepthDecimal) {
    chrome.runtime.sendMessage({ action: 'setScrollDepthDecimal', scrollDepthDecimal: scrollDepthDecimal });
}

// Function to retrieve the scrollDepthDecimal from background script
function retrieveScrollDepthDecimalFromBackground(callback) {
    chrome.runtime.sendMessage({ action: 'getScrollDepthDecimal' }, function(response) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        scrollDepthDecimal = response.scrollDepthDecimal || 0.8; // Default value if not found
        callback(scrollDepthDecimal);
    });
}

// Function to retrieve the scrollPercentage from background script
function retrieveScrollPercentageFromBackground(callback) {
    chrome.runtime.sendMessage({ action: 'getScrollPercentage' }, function(response) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        scrollPercentage = response.scrollPercentage || 8; // Default to 8 if not found
        callback(scrollPercentage);
    });
}

// Initialize scrollPercentage from background script
retrieveScrollPercentageFromBackground(function(initialScrollPercentage) {
    scrollPercentage = initialScrollPercentage; // Initial value
    scrollDepthDecimal = scrollPercentage / 10;

    const scrollValueSpan = document.querySelector('.scroll-value');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');

    // Event listeners
    leftButton.addEventListener('click', leftButtonListener(scrollPercentage, scrollDepthDecimal, scrollValueSpan));
    rightButton.addEventListener('click', rightButtonListener(scrollPercentage, scrollDepthDecimal, scrollValueSpan));

    // Initialize the displayed value
    updateScrollValue(scrollValueSpan, scrollPercentage);
});

// Function to scroll the page forward
function pageTurnForward() {
    // Function to retrieve scrollDepthDecimal from background script
    function retrieveScrollDepthDecimalFromBackground(callback) {
        chrome.runtime.sendMessage({ action: 'getScrollDepthDecimal' }, function(response) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            const scrollDepthDecimal = response.scrollDepthDecimal || 0.1; // Default to 0.1 if not found
            callback(scrollDepthDecimal);
        });
    }

    // Retrieve scrollDepthDecimal from background script
    retrieveScrollDepthDecimalFromBackground(function(initialScrollDepthDecimal) {
        const screenHeight = window.innerHeight;
        const currentScrollPosition = window.scrollY || window.pageYOffset;
        const scrollDepth = initialScrollDepthDecimal * screenHeight; // Use the retrieved value
        const newScrollPosition = currentScrollPosition + scrollDepth;

        // Update the scrollDepthDecimal here
        scrollDepthDecimal = initialScrollDepthDecimal;

        window.scrollTo({
            top: newScrollPosition,
            behavior: 'auto'
        });
    });
}

// Function to scroll the page backward
function pageTurnBackward() {
    // Function to retrieve scrollDepthDecimal from background script
    function retrieveScrollDepthDecimalFromBackground(callback) {
        chrome.runtime.sendMessage({ action: 'getScrollDepthDecimal' }, function(response) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            const scrollDepthDecimal = response.scrollDepthDecimal || 0.1; // Default to 0.1 if not found
            callback(scrollDepthDecimal);
        });
    }

    // Retrieve scrollDepthDecimal from background script
    retrieveScrollDepthDecimalFromBackground(function(initialScrollDepthDecimal) {
        const screenHeight = window.innerHeight;
        const currentScrollPosition = window.scrollY || window.pageYOffset;
        const scrollDepth = initialScrollDepthDecimal * screenHeight; // Use the retrieved value
        const newScrollPosition = currentScrollPosition - scrollDepth;

        // Update the scrollDepthDecimal here
        scrollDepthDecimal = initialScrollDepthDecimal;

        window.scrollTo({
            top: newScrollPosition,
            behavior: 'auto'
        });
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
arrowButtons.classList.add("pageify-arrow-buttons");

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
  .pageify-button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      border: 2px solid #3498db;
      border-radius: 5px;
      background-color: #3498db;
      color: #fff;
      margin: 2px;
      transition: background-color 0.3s, color 0.3s, border 0.3s;
  }

  .pageify-button:hover {
      background-color: #fff;
      color: #3498db;
      border: 2px solid #3498db;
  }

  .hidden {
    display: none !important;
}
`;

// Create a style element and append it to the head
const styleElement = document.createElement("style");
styleElement.textContent = buttonStyles;
document.head.appendChild(styleElement);

// Add styles to the arrowButtons div
addStyles(arrowButtons, arrowButtonsStyles);

const leftArrowButton = document.createElement("button");
leftArrowButton.classList.add("pageify-button");
leftArrowButton.id = "leftArrow";
leftArrowButton.textContent = "←";
leftArrowButton.addEventListener("click", pageTurnBackward);

const rightArrowButton = document.createElement("button");
rightArrowButton.classList.add("pageify-button");
rightArrowButton.id = "rightArrow";
rightArrowButton.textContent = "→";
rightArrowButton.addEventListener("click", pageTurnForward);

arrowButtons.appendChild(leftArrowButton);
arrowButtons.appendChild(rightArrowButton);

// Select the correct body element
const correctBody = document.querySelector('body:not(.extension-body)');
correctBody.appendChild(arrowButtons);

// Add toggle functionality for arrow buttons
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "toggleArrows") {
        arrowButtons.classList.toggle("hidden");
        sendResponse({ status: "arrows toggled" });
    }
});

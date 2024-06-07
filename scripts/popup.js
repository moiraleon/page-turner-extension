// Add the JavaScript for toggling visibility
function addToggleVisibilityListener() {
    const toggleIcon = document.getElementById('toggleIcon');
    const toggleText = document.querySelector('.toggle-text');

    toggleIcon.addEventListener('click', function() {
        const icon = this.querySelector('i');

        // Toggle the icon class and the text content
        if (icon.classList.contains('fa-eye')) {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
            toggleText.textContent = 'Visibility Hidden';
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
            toggleText.textContent = 'Visibility Show';
        }

        // Send message to content script to toggle arrows
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleArrows" });
        });
    });
}

// Call the function to add the listener
addToggleVisibilityListener();

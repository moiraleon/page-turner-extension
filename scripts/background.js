// Handle messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'setScrollPercentage') {
        // Handle storing scrollPercentage here
        chrome.storage.sync.set({ scrollPercentage: request.scrollPercentage });
        console.log("call to save scroll percentage in background" + request.scrollPercentage);
    } else if (request.action === 'setScrollDepthDecimal') {
        // Handle storing scrollDepthDecimal here
        chrome.storage.sync.set({ scrollDepthDecimal: request.scrollDepthDecimal });
        console.log("call to save scroll depth decimal in background" + request.scrollDepthDecimal);
    } else if (request.action === 'getScrollPercentage') {
        // Handle retrieving scrollPercentage here and send it back to content script
        chrome.storage.sync.get(['scrollPercentage'], function(result) {
            const scrollPercentage = result.scrollPercentage || 8;
            sendResponse({ scrollPercentage: scrollPercentage });
        });
        // Return true to indicate that sendResponse will be called asynchronously
        return true;
    }  else if (request.action === 'getScrollDepthDecimal') {
        // Handle retrieving scrollDepthDecimal here and send it back to content script
        chrome.storage.sync.get(['scrollDepthDecimal'], function(result) {
            const scrollDepthDecimal = result.scrollDepthDecimal || 0.8; // Default to 0.1 if not found
            sendResponse({ scrollDepthDecimal: scrollDepthDecimal });
        });
        // Return true to indicate that sendResponse will be called asynchronously
        return true;
    }
});



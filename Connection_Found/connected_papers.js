// ==UserScript==
// @name         Connected Papers  Script
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Bypasses limit in connectedpapers.com
// @author       Abhijeet
// @match        https://www.connectedpapers.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Clear localStorage
    localStorage.clear();
    console.log("localStorage has been cleared.");

    // Clear sessionStorage
    sessionStorage.clear();
    console.log("sessionStorage has been cleared.");

    // Clear cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
    console.log("Cookies have been cleared.");

    // Function to attempt to refresh the graph
    function refreshGraph() {
        // Wait for the page to fully load
        setTimeout(() => {
            // Look for the graph refresh button or relevant element
            const refreshButton = document.querySelector('button.refresh-graph-button'); // Replace with the correct selector
            if (refreshButton) {
                console.log("Refresh button found. Clicking it...");
                refreshButton.click(); // Simulate a click on the button
            } else {
                console.log("Refresh button not found. Unable to refresh the graph.");
            }
        }, 3000); // Adjust the delay as needed to ensure the page is fully loaded
    }

    // Function to remove the popup
    function removePopup() {
        // Select the popup element using its class or other attributes
        const popup = document.querySelector('.enforcer-popup');
        if (popup) {
            console.log("Popup found. Removing it...");
            popup.remove(); // Remove the popup from the DOM
        } else {
            console.log("Popup not found.");
        }
    }

    // Run the functions after the page loads
    window.addEventListener('load', () => {
        removePopup(); // Remove the popup
        refreshGraph(); // Attempt to refresh the graph
    });

    // Optional: Use a MutationObserver to handle dynamic content for the popup
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                removePopup(); // Remove the popup if it appears dynamically
            }
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
})();

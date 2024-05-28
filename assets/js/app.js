/*
    Author: Mario Sedlak
    Web:    mase.sk
    Github: https://github.com/mase-sk
    Date:   27.5.2024
    Ver:    0_init
    
    License: You are not allowed to use this design and code
             or any part of it in your own project!
*/

/* 
    Name:    Dark Mode Switcher
    Version: 1
 */

// DOM elements
const darkModeBtn = document.getElementById("dark-mode-btn");
const darkModeIcon = document.getElementById("dark-mode-icon");
const html = document.querySelector("html");
const brandLogo = document.getElementById("brand-logo");
// const brandLogoOffcanvas = document.getElementById("brand-logo-offcanvas"); // Assuming this is commented out for now
// Default mode preference
const defaultMode = "dark";
// Retrieve stored preference or use default
let darkMode = localStorage.getItem("darkMode") !== null 
               ? JSON.parse(localStorage.getItem("darkMode"))
               : (defaultMode === "dark");

// Apply initial dark mode setup
applyDarkMode(darkMode);
// Toggle dark mode and save preference
const toggleDarkMode = () => {
  darkMode = !darkMode;
  applyDarkMode(darkMode);
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
};

// Function to apply dark mode settings
function applyDarkMode(enabled) {
  html.classList.toggle("dark-mode", enabled);
  html.classList.toggle("light-mode", !enabled);
  darkModeIcon.classList.replace(enabled ? "fa-moon" : "fa-sun", enabled ? "fa-sun" : "fa-moon");
  brandLogo.src = enabled ? "./assets/img/logo/logo-light.png" : "./assets/img/logo/logo-dark.png";
  //brandLogoOffcanvas.src = brandLogo.src; // Reuse the same source
}
// Event listener for dark mode toggle button
darkModeBtn.addEventListener("click", toggleDarkMode);
// Variable to control auto switching behavior
let autoSwitchStatus = "off";
// Function for automatic switching based on time
const autoSwitchTime = (summerStartHour, summerEndHour, winterStartHour, winterEndHour) => {
  // If auto switching is off, exit the function
  if (autoSwitchStatus === "off") return;
  
  const date = new Date();
  const month = date.getMonth();
  const hour = date.getUTCHours() + 1;
  const isSummer = month >= 4 && month <= 9;
  const shouldEnableDarkMode = isSummer 
                             ? (hour >= summerStartHour || hour < summerEndHour)
                             : (hour >= winterStartHour || hour < winterEndHour);
  // Toggle dark mode if necessary
  if (shouldEnableDarkMode !== darkMode) {
    toggleDarkMode();
  }
};
// Example: Auto-switch between
// 21:00-06:00 (summer)
// 20:00-07:00 (winter)
autoSwitchTime(21, 6, 20, 7);



/*
 * ==========================================================================
 * SCRIPT.JS - Main JavaScript for Kedar Phadke's Portfolio
 * ==========================================================================
 *
 * This file contains all the interactive functionality:
 *
 * 1. Mobile Menu Toggle
 * 2. Smooth Scrolling Navigation
 * 3. Scroll Animations (Intersection Observer)
 * 4. Navbar Shadow on Scroll
 * 5. Contact Modal Functions
 * 6. Form Submission Handler
 * 7. Dark Mode Toggle (NEW)
 *
 * The code is organized into logical sections with comments explaining
 * what each part does for learning purposes.
 */


/* ==========================================================================
   1. MOBILE MENU TOGGLE
   ==========================================================================
   Shows/hides the navigation menu on mobile devices.
   Called when the hamburger button is clicked.
*/
function toggleMenu() {
    // Get the navigation links container
    const navLinks = document.getElementById('navLinks');

    // Toggle the 'active' class - if it has it, remove it; if not, add it
    // The CSS uses this class to show/hide the mobile menu
    navLinks.classList.toggle('active');
}


/* ==========================================================================
   2. SMOOTH SCROLLING NAVIGATION
   ==========================================================================
   When clicking a nav link (like #about), smoothly scroll to that section
   instead of jumping instantly.
*/

// Get all links that start with "#" (internal page links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    // Add a click event listener to each link
    anchor.addEventListener('click', function(e) {
        // Prevent the default jump behavior
        e.preventDefault();

        // Get the target section (e.g., "#about" -> the about section element)
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        // If the target exists, scroll to it smoothly
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',  // Smooth animation instead of instant jump
                block: 'start'       // Align to the top of the viewport
            });
        }

        // Close mobile menu if it's open (for mobile users)
        document.getElementById('navLinks').classList.remove('active');
    });
});


/* ==========================================================================
   3. SCROLL ANIMATIONS (Intersection Observer)
   ==========================================================================
   Elements with the 'animate-on-scroll' class start invisible.
   When they scroll into view, we add the 'visible' class to animate them in.

   The Intersection Observer API is more performant than scroll events
   because it doesn't fire on every pixel scrolled.
*/

// Configuration options for the observer
const observerOptions = {
    threshold: 0.1,                    // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px'   // Trigger 50px before element enters viewport
};

// Create the observer with a callback function
const observer = new IntersectionObserver((entries) => {
    // Loop through all observed elements
    entries.forEach(entry => {
        // If the element is now visible in the viewport
        if (entry.isIntersecting) {
            // Add the 'visible' class to trigger the CSS animation
            entry.target.classList.add('visible');

            // Optional: Stop observing once animated (uncomment to use)
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Find all elements with 'animate-on-scroll' class and observe them
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});


/* ==========================================================================
   4. NAVBAR SHADOW ON SCROLL
   ==========================================================================
   Adds a stronger shadow to the navbar when the user scrolls down,
   making it more prominent against the content below.
*/
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');

    // Check if user has scrolled more than 100 pixels from the top
    if (window.scrollY > 100) {
        // Add stronger shadow when scrolled
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        // Use lighter shadow when at top
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});


/* ==========================================================================
   5. CONTACT MODAL FUNCTIONS
   ==========================================================================
   Controls the popup contact form - opening, closing, and handling
   clicks outside the modal.
*/

/**
 * Opens the contact modal
 * Called when user clicks email link or "Send a Message" button
 */
function openModal() {
    // Add 'active' class to show the modal (CSS handles the visibility)
    document.getElementById('contactModal').classList.add('active');

    // Prevent the page from scrolling while modal is open
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the contact modal
 * Called when user clicks X button, clicks outside, or presses Escape
 */
function closeModal() {
    // Remove 'active' class to hide the modal
    document.getElementById('contactModal').classList.remove('active');

    // Re-enable page scrolling
    document.body.style.overflow = '';

    // Reset the form fields
    document.getElementById('contactForm').reset();

    // Clear any status messages
    const formStatus = document.getElementById('formStatus');
    formStatus.className = 'form-status';
    formStatus.textContent = '';
}

// Close modal when clicking the dark overlay (outside the modal box)
document.getElementById('contactModal').addEventListener('click', function(e) {
    // Check if the click was on the overlay itself, not the modal content
    // 'this' refers to the modal-overlay, 'e.target' is what was clicked
    if (e.target === this) {
        closeModal();
    }
});

// Close modal when pressing the Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});


/* ==========================================================================
   6. FORM SUBMISSION HANDLER
   ==========================================================================
   Handles the contact form submission.
   Currently shows a simulated success - will be updated to use Resend API.
*/

/**
 * Handles form submission
 * @param {Event} event - The form submit event
 */
function handleSubmit(event) {
    // Prevent the default form submission (which would reload the page)
    event.preventDefault();

    // Get references to UI elements
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    // Collect form data into an object
    const formData = {
        email: document.getElementById('senderEmail').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    /*
     * TODO: Replace this setTimeout with actual Resend API call
     *
     * Example with fetch (requires backend):
     *
     * fetch('/api/send-email', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify(formData)
     * })
     * .then(response => response.json())
     * .then(data => {
     *     // Handle success
     * })
     * .catch(error => {
     *     // Handle error
     * });
     */

    // Simulate API call with a delay (remove this when adding real API)
    setTimeout(() => {
        // Show success message
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';

        // Reset button state
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;

        // Clear the form
        document.getElementById('contactForm').reset();

        // Auto-close modal after showing success message
        setTimeout(() => {
            closeModal();
        }, 2000);

    }, 1500); // 1.5 second simulated delay
}


/* ==========================================================================
   7. DARK MODE TOGGLE
   ==========================================================================
   Allows users to switch between light and dark color schemes.

   How it works:
   - Clicking the toggle button adds/removes 'dark-mode' class on <body>
   - CSS rules in styles.css change colors when this class is present
   - User's preference is saved to localStorage
   - On page load, we check localStorage and apply the saved preference

   localStorage is a browser feature that stores data even after the
   browser is closed. It's perfect for remembering user preferences.
*/

/**
 * Initialize theme on page load
 * This runs immediately when the script loads to prevent flash of wrong theme
 */
function initializeTheme() {
    // Check if user has a saved preference in localStorage
    const savedTheme = localStorage.getItem('theme');

    // Check if user's operating system prefers dark mode
    // This is a media query that returns true if OS is set to dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine which theme to use:
    // 1. If user has a saved preference, use that
    // 2. Otherwise, use the OS preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
    }
}

/**
 * Toggle between light and dark mode
 * Called when user clicks the theme toggle button
 */
function toggleTheme() {
    // Toggle the 'dark-mode' class on the body element
    // classList.toggle() adds the class if missing, removes if present
    document.body.classList.toggle('dark-mode');

    // Check if dark mode is now active
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Save the user's preference to localStorage
    // This will persist even after closing the browser
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Log for debugging (can be removed in production)
    console.log(`Theme switched to: ${isDarkMode ? 'dark' : 'light'} mode`);
}

// Initialize theme as soon as possible to prevent flash of wrong theme
// This runs when the script is first loaded
initializeTheme();

// Optional: Listen for OS theme changes and update automatically
// This handles cases where user changes their OS theme while on the page
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't set a manual preference
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
});


/* ==========================================================================
   NOTES FOR DEVELOPERS
   ==========================================================================

   This JavaScript file is intentionally kept simple and uses vanilla JS
   (no frameworks like React or Vue) for learning purposes.

   Key concepts used:
   - DOM manipulation (getElementById, querySelector, classList)
   - Event listeners (click, scroll, keydown, submit)
   - Intersection Observer API (for scroll animations)
   - CSS class toggling for showing/hiding elements
   - localStorage for persisting user preferences (dark mode)

   To extend this code:
   1. Add form validation before submission
   2. Integrate with Resend API (requires backend)
   3. Add loading spinners or animations
   4. Implement localStorage to save form drafts
*/

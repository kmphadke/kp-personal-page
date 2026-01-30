/*
 * ==========================================================================
 * SCRIPT.JS - Main JavaScript for Kedar Phadke's Portfolio
 * ==========================================================================
 *
 * This file contains all the interactive functionality:
 *
 * 1. Mobile Menu Toggle
 * 2. Smooth Scrolling Navigation
 * 3. Scroll Animations (Intersection Observer) - with detailed explanation
 * 4. Navbar Shadow on Scroll & Scroll-to-Top Button
 * 5. Contact Modal Functions
 * 6. Form Validation & Submission (with localStorage storage)
 * 6b. Experience Timeline - Scroll Detection & Synchronization
 * 7. Dark Mode Toggle
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
        // Get the target section (e.g., "#about" -> the about section element)
        const targetId = this.getAttribute('href');

        // Skip if href is just "#" (not a valid section link - these are used for modals)
        if (targetId === '#' || targetId.length <= 1) {
            return;  // Let the default behavior happen (or onclick handler)
        }

        // Prevent the default jump behavior (only for actual section links)
        e.preventDefault();

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

   What is Intersection Observer?
   ==============================
   The Intersection Observer API provides a way to asynchronously observe
   changes in the intersection of a target element with an ancestor element
   or with the document's viewport.

   In simpler terms: It tells you when an element becomes visible on screen.

   Why use it instead of scroll events?
   ====================================
   Traditional approach (scroll events):
     window.addEventListener('scroll', () => {
         // This runs on EVERY pixel scrolled - very inefficient!
         // Checking element positions here can cause "jank" (stuttering)
     });

   Intersection Observer advantages:
   - Runs asynchronously (doesn't block the main thread)
   - Browser optimizes when callbacks fire (not every pixel)
   - More accurate - you specify exactly when to trigger
   - Better for battery life on mobile devices

   How it works:
   =============
   1. Create an observer with options (when to trigger)
   2. Define a callback function (what to do when triggered)
   3. Tell the observer which elements to watch
   4. When elements enter/exit the viewport, the callback fires

   The callback receives "entries" - an array of observed elements
   that have changed their intersection state.
*/

// Configuration options for the observer
const observerOptions = {
    /*
        threshold: What percentage of the element must be visible to trigger
        =====================================================================
        - 0 = Trigger as soon as even 1 pixel is visible
        - 0.1 = Trigger when 10% is visible (our choice - good for fade-ins)
        - 0.5 = Trigger when half the element is visible
        - 1 = Trigger only when 100% of element is visible

        You can also pass an array: [0, 0.25, 0.5, 0.75, 1]
        This would fire the callback at each of those thresholds.
    */
    threshold: 0.15,

    /*
        rootMargin: Adjust the "detection zone" of the viewport
        =======================================================
        Format: 'top right bottom left' (like CSS margin)

        '0px 0px -80px 0px' means:
        - The detection zone is shrunk by 80px from the bottom
        - Elements trigger BEFORE they fully enter the viewport
        - This creates a more natural "anticipation" effect

        Positive values expand the zone (trigger earlier)
        Negative values shrink the zone (trigger later)
    */
    rootMargin: '0px 0px -80px 0px'
};

/*
    Create the Intersection Observer
    =================================
    The constructor takes two arguments:
    1. Callback function - runs when intersection changes
    2. Options object - configures when to trigger
*/
const observer = new IntersectionObserver((entries, observerInstance) => {
    /*
        The callback receives:
        - entries: Array of IntersectionObserverEntry objects
        - observerInstance: Reference to the observer itself

        Each entry contains:
        - entry.target: The DOM element being observed
        - entry.isIntersecting: Boolean - is it currently visible?
        - entry.intersectionRatio: How much is visible (0 to 1)
        - entry.boundingClientRect: Element's position/size
        - entry.intersectionRect: The visible portion's position/size
    */

    // Loop through all elements that changed intersection state
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            /*
                Element is entering the viewport (scrolling into view)
                ======================================================
                Add the 'visible' class to trigger the fade-in animation.
                The CSS transition handles the actual animation.
            */
            entry.target.classList.add('visible');
        } else {
            /*
                Element is leaving the viewport (scrolling out of view)
                =======================================================
                Remove the 'visible' class to reset the element.
                This allows the animation to play again when scrolling back.

                The element returns to its initial state:
                - opacity: 0 (invisible)
                - transform: translateY(40px) (shifted down)

                When it comes back into view, it will animate in again.
            */
            entry.target.classList.remove('visible');
        }

        /*
            Note: We're NOT using observerInstance.unobserve() here
            =======================================================
            If we stopped observing after the first animation, elements
            would only animate once. By continuing to observe, we can
            detect when elements leave AND re-enter the viewport.

            This creates a "repeating" animation effect - elements animate
            every time they scroll into view, whether going up or down.

            Trade-off: This uses slightly more resources than one-time
            animations, but the effect is minimal for a reasonable number
            of animated elements (under 50 or so).
        */
    });
}, observerOptions);

/*
    Start observing all elements with 'animate-on-scroll' class
    ============================================================
    querySelectorAll returns a NodeList (array-like) of matching elements.
    forEach loops through each one and tells the observer to watch it.

    In the HTML, elements look like:
    <div class="skill-category animate-on-scroll">...</div>

    The CSS makes them start invisible:
    .animate-on-scroll { opacity: 0; transform: translateY(40px); }

    When visible class is added, they animate in:
    .animate-on-scroll.visible { opacity: 1; transform: translateY(0); }
*/
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});


/* ==========================================================================
   4. NAVBAR SHADOW ON SCROLL & SCROLL-TO-TOP BUTTON
   ==========================================================================

   This section handles two scroll-related features:
   1. Navbar shadow - gets stronger as you scroll down
   2. Scroll-to-top button - appears after scrolling down 300px

   Both features use the same scroll event listener for efficiency.
   Combining related scroll logic prevents multiple listeners from
   running simultaneously.
*/

// Get references to elements we'll be manipulating
const nav = document.querySelector('nav');
const scrollToTopBtn = document.getElementById('scrollToTop');

/*
    Scroll Event Listener
    =====================
    This runs whenever the user scrolls the page.

    Note: Scroll events CAN be expensive because they fire frequently.
    For complex logic, consider using:
    - requestAnimationFrame() to throttle updates
    - Intersection Observer (like we use for animations)

    For simple checks like these, scroll events are fine.
*/
window.addEventListener('scroll', () => {
    // Get current scroll position (pixels from top)
    const scrollPosition = window.scrollY;

    /*
        Navbar Shadow Effect
        ====================
        When user scrolls past 100px, add a more prominent shadow
        to make the navbar stand out from the content.
    */
    if (scrollPosition > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }

    /*
        Scroll-to-Top Button Visibility
        ================================
        Show the button after user scrolls down 300px.
        This prevents it from appearing immediately on page load.

        The CSS handles the actual show/hide animation:
        - .scroll-to-top { opacity: 0; visibility: hidden; }
        - .scroll-to-top.visible { opacity: 1; visibility: visible; }
    */
    if (scrollPosition > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

/*
    Scroll to Top Function
    ======================
    Smoothly scrolls the page back to the top when the button is clicked.

    window.scrollTo() options:
    - top: 0 = scroll to the very top (0 pixels from top)
    - behavior: 'smooth' = animate the scroll instead of jumping
*/
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*
    Alternative: scrollIntoView approach
    ====================================
    Another way to scroll to top is to scroll to a specific element:

    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });

    Or if you have an element at the top:
    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });

    window.scrollTo() is simpler when you just want to go to the top.
*/


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
   6. FORM VALIDATION & SUBMISSION
   ==========================================================================

   This section handles:
   - Real-time form validation
   - Visual feedback for errors (red borders, error messages)
   - Storing submitted messages in localStorage
   - Success/error status messages

   Form Validation Approach:
   =========================
   We use custom JavaScript validation instead of HTML5 validation because:
   1. Better control over error message styling
   2. Consistent experience across browsers
   3. Can add complex validation rules (like email format checking)
   4. Real-time feedback as user types

   The 'novalidate' attribute on the form disables browser validation.
*/

/**
 * Validation Rules Configuration
 * ===============================
 * Define validation rules for each field in one place.
 * This makes it easy to modify rules without changing validation logic.
 */
const validationRules = {
    senderName: {
        required: true,
        minLength: 2,
        maxLength: 100,
        errorMessages: {
            required: 'Please enter your name',
            minLength: 'Name must be at least 2 characters',
            maxLength: 'Name must be less than 100 characters'
        }
    },
    senderEmail: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // Basic email regex
        errorMessages: {
            required: 'Please enter your email address',
            pattern: 'Please enter a valid email address (e.g., name@example.com)'
        }
    },
    subject: {
        required: true,
        minLength: 3,
        maxLength: 200,
        errorMessages: {
            required: 'Please enter a subject',
            minLength: 'Subject must be at least 3 characters',
            maxLength: 'Subject must be less than 200 characters'
        }
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 5000,
        errorMessages: {
            required: 'Please enter your message',
            minLength: 'Message must be at least 10 characters',
            maxLength: 'Message must be less than 5000 characters'
        }
    }
};

/**
 * Validate a single field against its rules
 * ==========================================
 * @param {string} fieldId - The ID of the input field
 * @param {string} value - The current value of the field
 * @returns {object} - { isValid: boolean, errorMessage: string }
 *
 * This function checks a field's value against all applicable rules
 * and returns the first error found (or success if all pass).
 */
function validateField(fieldId, value) {
    const rules = validationRules[fieldId];

    // If no rules defined for this field, it's valid
    if (!rules) {
        return { isValid: true, errorMessage: '' };
    }

    // Trim whitespace from value for validation
    const trimmedValue = value.trim();

    /*
        Check each rule in order of importance:
        1. Required - field must not be empty
        2. MinLength - minimum character count
        3. MaxLength - maximum character count
        4. Pattern - regex pattern match (for email)
    */

    // Rule: Required
    if (rules.required && trimmedValue === '') {
        return {
            isValid: false,
            errorMessage: rules.errorMessages.required
        };
    }

    // Rule: Minimum Length
    if (rules.minLength && trimmedValue.length < rules.minLength) {
        return {
            isValid: false,
            errorMessage: rules.errorMessages.minLength
        };
    }

    // Rule: Maximum Length
    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
        return {
            isValid: false,
            errorMessage: rules.errorMessages.maxLength
        };
    }

    // Rule: Pattern (regex)
    if (rules.pattern && !rules.pattern.test(trimmedValue)) {
        return {
            isValid: false,
            errorMessage: rules.errorMessages.pattern
        };
    }

    // All rules passed
    return { isValid: true, errorMessage: '' };
}

/**
 * Show validation error for a field
 * ==================================
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message to display
 *
 * This function:
 * 1. Adds error styling to the input (red border)
 * 2. Shows the error message below the field
 * 3. Triggers a shake animation for emphasis
 */
function showFieldError(input, message) {
    // Add error class to input (red border)
    input.classList.add('error');
    input.classList.remove('valid');

    // Find the error message element (sibling span)
    const errorSpan = input.parentElement.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('visible');
    }

    // Trigger shake animation
    input.classList.add('shake');
    // Remove shake class after animation completes
    setTimeout(() => input.classList.remove('shake'), 500);
}

/**
 * Clear validation error for a field
 * ====================================
 * @param {HTMLElement} input - The input element
 * @param {boolean} showValid - Whether to show valid styling (green border)
 */
function clearFieldError(input, showValid = false) {
    // Remove error styling
    input.classList.remove('error');

    // Optionally add valid styling
    if (showValid) {
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
    }

    // Hide the error message
    const errorSpan = input.parentElement.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.classList.remove('visible');
        // Clear text after fade out
        setTimeout(() => {
            if (!errorSpan.classList.contains('visible')) {
                errorSpan.textContent = '';
            }
        }, 200);
    }
}

/**
 * Validate the entire form
 * =========================
 * @returns {boolean} - True if all fields are valid
 *
 * Loops through all fields and validates each one.
 * Returns false if ANY field fails validation.
 */
function validateForm() {
    const fields = ['senderName', 'senderEmail', 'subject', 'message'];
    let isFormValid = true;
    let firstInvalidField = null;

    fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        const result = validateField(fieldId, input.value);

        if (!result.isValid) {
            showFieldError(input, result.errorMessage);
            isFormValid = false;
            // Track first invalid field for focus
            if (!firstInvalidField) {
                firstInvalidField = input;
            }
        } else {
            clearFieldError(input, true);  // Show green border for valid fields
        }
    });

    // Focus the first invalid field so user knows where to start fixing
    if (firstInvalidField) {
        firstInvalidField.focus();
    }

    return isFormValid;
}

/**
 * Set up real-time validation on input fields
 * =============================================
 * Add event listeners to validate fields as user types.
 * This provides immediate feedback without waiting for form submission.
 */
function setupRealtimeValidation() {
    const fields = ['senderName', 'senderEmail', 'subject', 'message'];

    fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);

        // Validate on blur (when user leaves the field)
        input.addEventListener('blur', () => {
            const result = validateField(fieldId, input.value);
            if (!result.isValid && input.value.trim() !== '') {
                showFieldError(input, result.errorMessage);
            } else if (input.value.trim() !== '') {
                clearFieldError(input, true);
            }
        });

        // Clear error styling when user starts typing
        input.addEventListener('input', () => {
            // Only clear if there was an error
            if (input.classList.contains('error')) {
                const result = validateField(fieldId, input.value);
                if (result.isValid) {
                    clearFieldError(input, true);
                }
            }
        });
    });
}

// Initialize real-time validation when page loads
setupRealtimeValidation();

/*
    EmailJS Configuration
    ======================
    EmailJS allows sending emails directly from client-side JavaScript.

    HOW IT WORKS:
    1. EmailJS SDK is loaded in the HTML <head>
    2. We initialize it with a Public Key (safe to expose)
    3. When form is submitted, we send data to EmailJS servers
    4. EmailJS uses YOUR email service (Yahoo) to send the email
    5. The email arrives in your inbox

    SECURITY NOTE:
    The Public Key is safe to expose - it only allows sending emails
    through YOUR pre-configured templates. Attackers cannot:
    - Access your email account
    - Send emails to arbitrary addresses
    - Modify the email template
*/
const EMAILJS_CONFIG = {
    serviceId: 'service_4p3l7ij',
    templateId: 'template_nexpz1u',
    publicKey: 'Yw0G8w77v-LGyC0a9'
};

// Initialize EmailJS with your public key
emailjs.init(EMAILJS_CONFIG.publicKey);

/**
 * Handle form submission
 * =======================
 * @param {Event} event - The form submit event
 *
 * This function:
 * 1. Prevents default form submission
 * 2. Validates all fields
 * 3. If valid, sends email via EmailJS
 * 4. Also saves message to localStorage for backup
 * 5. Shows success/error message
 */
function handleSubmit(event) {
    // Prevent the default form submission (would reload the page)
    event.preventDefault();

    // Get references to UI elements
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    // Clear any previous status message
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    // Validate all fields
    if (!validateForm()) {
        // Validation failed - show error status
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fix the errors above and try again.';
        return;  // Stop here, don't submit
    }

    // Collect form data for localStorage
    const formData = {
        id: Date.now(),
        name: document.getElementById('senderName').value.trim(),
        email: document.getElementById('senderEmail').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        date: new Date().toISOString()
    };

    /*
        EmailJS Template Parameters
        ============================
        These must match the variable names in your EmailJS template:
        {{from_name}}, {{from_email}}, {{subject}}, {{message}}
    */
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
    };

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    /*
        Send Email via EmailJS
        =======================
        emailjs.send() returns a Promise:
        - .then() runs if email sent successfully
        - .catch() runs if there's an error
    */
    emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey  // Pass public key directly (more reliable than init)
    )
    .then(function(response) {
        // SUCCESS - Email was sent
        console.log('EmailJS Success:', response.status, response.text);

        // Also save to localStorage as backup
        saveMessageToStorage(formData);

        // Show success message
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';

        // Reset button state
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;

        // Clear the form and validation states
        document.getElementById('contactForm').reset();
        ['senderName', 'senderEmail', 'subject', 'message'].forEach(fieldId => {
            clearFieldError(document.getElementById(fieldId), false);
        });

        // Auto-close modal after showing success
        setTimeout(() => {
            closeModal();
        }, 2500);
    })
    .catch(function(error) {
        // ERROR - Something went wrong
        console.error('EmailJS Error:', error);

        // Show error message
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Failed to send message. Please try again or email me directly.';

        // Reset button state
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    });
}

/**
 * Save a message to localStorage
 * ===============================
 * @param {object} message - The message object to save
 *
 * localStorage stores data as strings, so we:
 * 1. Get existing messages array (or create empty array)
 * 2. Add new message to the beginning (most recent first)
 * 3. Convert back to string and save
 */
function saveMessageToStorage(message) {
    // Get existing messages from localStorage
    // JSON.parse converts the string back to an array
    // If nothing exists, start with empty array
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    // Add new message at the beginning (unshift adds to start of array)
    messages.unshift(message);

    // Save back to localStorage
    // JSON.stringify converts the array to a string
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

/**
 * Get all messages from localStorage
 * ====================================
 * @returns {array} - Array of message objects
 */
function getMessagesFromStorage() {
    return JSON.parse(localStorage.getItem('contactMessages')) || [];
}

/**
 * Delete a single message from localStorage
 * ==========================================
 * @param {number} messageId - The ID of the message to delete
 */
function deleteMessage(messageId) {
    // Get all messages
    let messages = getMessagesFromStorage();

    // Filter out the message with matching ID
    messages = messages.filter(msg => msg.id !== messageId);

    // Save the filtered array back to localStorage
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Re-render the messages list
    renderMessagesList();
}

/**
 * Clear all messages from localStorage
 * ======================================
 * Called when user clicks "Clear All" button.
 */
function clearAllMessages() {
    // Confirm before deleting (destructive action)
    if (confirm('Are you sure you want to delete all messages? This cannot be undone.')) {
        localStorage.removeItem('contactMessages');
        renderMessagesList();
    }
}

/**
 * Format a date string for display
 * ==================================
 * @param {string} isoDate - ISO date string
 * @returns {string} - Formatted date like "Jan 29, 2026 at 3:45 PM"
 */
function formatDate(isoDate) {
    const date = new Date(isoDate);

    // Format options for toLocaleDateString
    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    return date.toLocaleDateString('en-US', options).replace(',', ' at');
}

/**
 * Render the messages list in the modal
 * ======================================
 * Gets messages from localStorage and creates HTML for each one.
 */
function renderMessagesList() {
    const messages = getMessagesFromStorage();
    const messagesList = document.getElementById('messagesList');
    const messagesEmpty = document.getElementById('messagesEmpty');
    const messageCount = document.getElementById('messageCount');
    const clearBtn = document.getElementById('clearMessagesBtn');

    // Update message count
    const count = messages.length;
    messageCount.textContent = `${count} message${count !== 1 ? 's' : ''}`;

    // Enable/disable clear button
    clearBtn.disabled = count === 0;

    // Show empty state or messages
    if (count === 0) {
        messagesList.innerHTML = '';
        messagesEmpty.classList.add('visible');
    } else {
        messagesEmpty.classList.remove('visible');

        // Build HTML for each message
        messagesList.innerHTML = messages.map(msg => `
            <div class="message-card" data-id="${msg.id}">
                <div class="message-header">
                    <div class="message-sender">
                        <div class="message-name">${escapeHtml(msg.name)}</div>
                        <div class="message-email">${escapeHtml(msg.email)}</div>
                    </div>
                    <div class="message-date">${formatDate(msg.date)}</div>
                    <button class="message-delete" onclick="deleteMessage(${msg.id})" title="Delete message">&times;</button>
                </div>
                <div class="message-subject">${escapeHtml(msg.subject)}</div>
                <div class="message-body">${escapeHtml(msg.message)}</div>
            </div>
        `).join('');
    }
}

/**
 * Escape HTML to prevent XSS attacks
 * ====================================
 * @param {string} text - Raw text that might contain HTML
 * @returns {string} - Safe text with HTML entities escaped
 *
 * IMPORTANT: Always escape user input before displaying it!
 * This prevents Cross-Site Scripting (XSS) attacks where
 * malicious users could inject JavaScript into their message.
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Open the messages modal
 * ========================
 * Called when user clicks "View Messages" button.
 */
function openMessagesModal() {
    // Render fresh messages list
    renderMessagesList();

    // Show the modal
    document.getElementById('messagesModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close the messages modal
 * =========================
 */
function closeMessagesModal() {
    document.getElementById('messagesModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Close messages modal when clicking overlay
document.getElementById('messagesModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMessagesModal();
    }
});

// Close messages modal with Escape key (extend existing listener)
// Note: The existing keydown listener for contact modal is already set up,
// but we need to also handle the messages modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMessagesModal();
    }
});


/* ==========================================================================
   6b. EXPERIENCE TIMELINE - Scroll Detection & Synchronization
   ==========================================================================

   HOW THE SCROLL DETECTION WORKS:
   ================================
   This code synchronizes the sticky timeline navigation with the experience
   cards as the user scrolls. When a card comes into view, its corresponding
   dot in the timeline is highlighted.

   INTERSECTION OBSERVER APPROACH:
   ================================
   We use Intersection Observer (not scroll events) because:
   1. More performant - doesn't fire on every pixel scrolled
   2. Precise control over when detection triggers
   3. Can specify exactly how much of element must be visible

   The observer watches each experience card. When a card enters the
   "detection zone" (defined by rootMargin), it becomes the "active" card
   and its timeline dot is highlighted.

   ROOTMARGIN EXPLAINED:
   =====================
   rootMargin: '-30% 0px -60% 0px' means:
   - Top: Shrink detection zone by 30% from top
   - Right: No change (0px)
   - Bottom: Shrink detection zone by 60% from bottom
   - Left: No change (0px)

   This creates a "trigger zone" in the upper-middle portion of the viewport.
   A card is considered "active" when it enters this zone, which typically
   happens when the card is prominently visible on screen.

   Visual representation of viewport with this rootMargin:
   ┌─────────────────────────┐
   │      (ignored 30%)      │
   ├─────────────────────────┤
   │                         │
   │    DETECTION ZONE       │  <-- Cards detected here
   │       (10% of viewport) │
   │                         │
   ├─────────────────────────┤
   │      (ignored 60%)      │
   └─────────────────────────┘
*/

/**
 * Initialize Experience Timeline Scroll Detection
 * =================================================
 * Sets up Intersection Observer to watch experience cards and
 * synchronize the timeline navigation.
 */
function initExperienceTimeline() {
    // Get all experience cards and timeline nav items
    const expCards = document.querySelectorAll('.exp-card');
    const timelineNavItems = document.querySelectorAll('.timeline-nav-item');

    // Exit early if elements don't exist (prevents errors)
    if (expCards.length === 0 || timelineNavItems.length === 0) {
        return;
    }

    /*
        Observer Configuration
        =======================
        - threshold: 0 means trigger as soon as any part is visible
        - rootMargin: Creates a narrow detection band in upper-middle of viewport
          This ensures only one card is "active" at a time
    */
    const observerOptions = {
        threshold: 0,
        rootMargin: '-30% 0px -60% 0px'
    };

    /*
        Track the currently active card
        ================================
        We use this to prevent unnecessary DOM updates when the same
        card is repeatedly detected (which can happen with observer)
    */
    let currentActiveIndex = 0;

    /**
     * Update which timeline nav item is active
     * @param {number} index - The index of the card that's now active
     */
    function setActiveTimelineItem(index) {
        // Skip if already active (prevents unnecessary repaints)
        if (currentActiveIndex === index) return;

        currentActiveIndex = index;

        // Remove 'active' class from all nav items
        timelineNavItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add 'active' class to the corresponding nav item
        const activeNavItem = document.querySelector(
            `.timeline-nav-item[data-index="${index}"]`
        );
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }

    /*
        Create the Intersection Observer
        ==================================
        Watches each experience card and updates the timeline when
        a card enters the detection zone.
    */
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            /*
                Only act when a card is ENTERING the detection zone
                (isIntersecting = true), not when it's leaving.

                This prevents the highlight from jumping around as
                cards exit the zone.
            */
            if (entry.isIntersecting) {
                // Get the index from the card's data attribute
                const index = parseInt(entry.target.dataset.index, 10);
                setActiveTimelineItem(index);
            }
        });
    }, observerOptions);

    // Start observing each experience card
    expCards.forEach(card => {
        timelineObserver.observe(card);
    });

    /*
        Click-to-Scroll on Timeline Nav Items
        ======================================
        Clicking a timeline dot scrolls to the corresponding card.
        This provides a secondary navigation method.
    */
    timelineNavItems.forEach(navItem => {
        navItem.addEventListener('click', () => {
            const index = navItem.dataset.index;
            const targetCard = document.querySelector(`.exp-card[data-index="${index}"]`);

            if (targetCard) {
                // Calculate offset to account for fixed navbar
                const navbarHeight = document.querySelector('nav').offsetHeight;
                const cardTop = targetCard.getBoundingClientRect().top + window.scrollY;
                const scrollTarget = cardTop - navbarHeight - 30; // 30px extra padding

                // Smooth scroll to the card
                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize when DOM is ready
// Using DOMContentLoaded ensures all HTML elements exist before we try to access them
document.addEventListener('DOMContentLoaded', initExperienceTimeline);

// Also try to initialize immediately in case DOMContentLoaded already fired
// (This handles cases where script is loaded after DOM is ready)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initExperienceTimeline();
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
   - Event listeners (click, scroll, keydown, submit, blur, input)
   - Intersection Observer API (for performant scroll animations)
   - CSS class toggling for showing/hiding elements
   - localStorage for persisting data (theme preference, messages)
   - Smooth scrolling (scrollTo, scrollIntoView)
   - Form validation with regex patterns
   - XSS prevention with HTML escaping

   Animation techniques demonstrated:
   1. Intersection Observer - Efficient scroll-triggered animations
   2. CSS transitions - Smooth opacity and transform changes
   3. Class-based animations - Adding/removing 'visible' class
   4. Shake animation - CSS keyframes for form validation feedback

   Form Validation concepts:
   1. Configuration-based rules - Easy to modify validation rules
   2. Real-time validation - Feedback as user types
   3. Visual feedback - Error/success states with colors
   4. Accessibility - Focus management for errors

   Security concepts:
   1. XSS Prevention - Always escape user input before displaying
   2. Input validation - Sanitize and validate all form inputs

   localStorage usage:
   1. Theme preference - Remember dark/light mode choice
   2. Contact messages - Store form submissions locally
   3. JSON serialization - Convert objects to/from strings

   To extend this code:
   1. Integrate with Resend API or other email service (requires backend)
   2. Add more complex validation (phone numbers, URLs)
   3. Implement localStorage to save form drafts
   4. Add export/import functionality for messages
   5. Add search/filter for messages list
*/

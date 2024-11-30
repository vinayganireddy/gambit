(function () {
    emailjs.init("NXOjuisn3YtwoKdCw"); // Replace with your valid Public Key
})();

let isSending = false; // Flag to prevent multiple submissions

function sendEmail(e) {
    e.preventDefault(); // Prevent form from reloading the page

    // Check if form is already being submitted
    if (isSending) return; // If true, don't submit again
    
    isSending = true; // Set flag to true, indicating form is being submitted
    
    // Collect form data
    const name = document.querySelector('input[placeholder="Name"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const phone = document.querySelector('input[placeholder="Phone Number"]').value;
    const message = document.querySelector('textarea[placeholder="Massage"]').value;
    
    // Form validation
    if (!validateForm(name, email, phone, message)) {
        isSending = false; // Reset flag to allow submission again if validation fails
        return; // Stop submission if validation fails
    }

    // Disable the submit button
    const submitButton = document.querySelector('.send_bt');
    submitButton.disabled = true;

    // Send email using EmailJS
    emailjs.send("service_n4m83jd", "template_a8qo6um", {
        to_name: "satish",
        name: name,
        email: email,
        phone: phone,
        message: message,
    })
    .then(() => {
        alert("Your message has been sent successfully!");
        resetForm();  // Reset the form inputs after successful submission
    })
    .catch((error) => {
        console.error("Failed to send message:", error);
        alert("An error occurred while sending your message. Please try again.");
    })
    .finally(() => {
        // Re-enable the submit button and reset the flag after the request completes
        submitButton.disabled = false;
        isSending = false;
    });
}

// Validate form fields
function validateForm(name, email, phone, message) {
    // Validate Name: Should not be empty
    if (!name.trim()) {
        alert("Name is required.");
        return false;
    }

    // Validate Email: Should be in a valid format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate Phone Number: Should be numeric and at least 10 digits
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on your phone format
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number (10 digits).");
        return false;
    }

    // Validate Message: Should not be empty
    if (!message.trim()) {
        alert("Message cannot be empty.");
        return false;
    }

    // If all validations pass
    return true;
}

// Reset form fields after successful submission
function resetForm() {
    // Select the form elements and clear their values
    document.querySelector('input[placeholder="Name"]').value = '';
    document.querySelector('input[placeholder="Email"]').value = '';
    document.querySelector('input[placeholder="Phone Number"]').value = '';
    document.querySelector('textarea[placeholder="Massage"]').value = '';
}

document.getElementById("contactForm").addEventListener("submit", sendEmail);

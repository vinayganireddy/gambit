(function () {
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
})();

async function sendEmail(e) {
    e.preventDefault(); // Prevent page refresh

    // Collect form data
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
    };

    try {
        // Send email using EmailJS
        const response = await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData);
        alert("Message sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to send the message. Please try again.");
    }
}
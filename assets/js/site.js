document.addEventListener("DOMContentLoaded", () => {
    // Modal and Video Player References
    const videoModal = document.getElementById("videoModal");
    const videoPlayer = videoModal.querySelector("video");

    // WhatsApp Button and Contact Section References
    const whatsappButton = document.getElementById("whatsappButton");
    const contactSection = document.getElementById("contact");

    // Event Listener: Play Video When Modal is Shown
    videoModal.addEventListener("shown.bs.modal", () => {
        if (videoPlayer) {
            videoPlayer.play();
        }
    });

    // Event Listener: Pause and Reset Video When Modal is Hidden
    videoModal.addEventListener("hidden.bs.modal", () => {
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.currentTime = 0; // Reset the video to the start
        }
    });

    // Event Listener: Show WhatsApp Button When Contact Section is in View
    window.addEventListener("scroll", () => {
        if (isInViewport(contactSection)) {
            whatsappButton.style.display = "flex";
        } else {
            whatsappButton.style.display = "none";
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelector(anchor.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Toggle Content Visibility (e.g., "Learn More")
    document.querySelectorAll(".toggle-content").forEach(button => {
        button.addEventListener("click", () => {
            const extraContent = button.parentElement.querySelector(".extra-content");
            if (extraContent.style.display === "none" || !extraContent.style.display) {
                extraContent.style.display = "block";
                button.textContent = "Show Less";
            } else {
                extraContent.style.display = "none";
                button.textContent = "Learn More";
            }
        });
    });

    // Form Submission Handler with Validation
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const sendEmailButton = document.querySelector("#sendEmailButton");

        if (!validateForm({ subject, message, phone, name, email })) return;

        // Sending Form Data
        sendEmailButton.textContent = "Sending...";
        sendEmailButton.disabled = true;

        try {
            const response = await fetch("/send-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, message, phone, name, email }),
            });

            if (response.ok) {
                displayNotification("Message sent successfully!", "green");
            } else {
                displayNotification("Failed to send message.", "red");
            }
        } catch (error) {
            displayNotification("An error occurred. Please try again later.", "red");
        } finally {
            sendEmailButton.textContent = "Send Message";
            sendEmailButton.disabled = false;
        }
    });

    // Utility Functions

    /**
     * Check if an element is in the viewport
     * @param {HTMLElement} element 
     * @returns {boolean}
     */
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    /**
     * Validate Form Inputs
     * @param {Object} formData 
     * @returns {boolean}
     */
    function validateForm({ subject, message, phone, name, email }) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^0[76]\d{8}$/; // Starts with 0, second digit is 7 or 6, followed by 8 digits

        if (!name || name.length < 3 || name.length > 20) {
            displayNotification("Name must be between 3 and 20 characters.", "orange");
            return false;
        }
        if (!subject || subject.length < 3 || subject.length > 20) {
            displayNotification("Subject must be between 3 and 20 characters.", "orange");
            return false;
        }
        if (!message || message.length < 3 || message.length > 300) {
            displayNotification("Message must be between 3 and 300 characters.", "orange");
            return false;
        }
        if (!email || !emailRegex.test(email)) {
            displayNotification("Provide a valid email address.", "orange");
            return false;
        }
        if (!phone || !phoneRegex.test(phone)) {
            displayNotification("Provide a valid phone number.", "orange");
            return false;
        }

        return true;
    }

    /**
     * Display Notifications
     * @param {string} message 
     * @param {string} backgroundColor 
     */
    function displayNotification(message, backgroundColor) {
        const notification = document.querySelector("#notification");
        notification.style.display = "block";
        notification.textContent = message;
        notification.style.backgroundColor = backgroundColor;
        notification.style.color = "whitesmoke";

        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    }
});

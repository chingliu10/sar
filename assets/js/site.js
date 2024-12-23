document.addEventListener("DOMContentLoaded", () => {
    // Modal and Video Player References
    const videoModal = document.getElementById("videoModal");
    const videoPlayer = videoModal?.querySelector("video");

    // WhatsApp Button and Contact Section References
    const whatsappButton = document.getElementById("whatsappButton");
    const contactSection = document.getElementById("contact");

    // Event Listener: Play Video When Modal is Shown
    videoModal?.addEventListener("shown.bs.modal", () => videoPlayer?.play());

    // Event Listener: Pause and Reset Video When Modal is Hidden
    videoModal?.addEventListener("hidden.bs.modal", () => {
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
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
        anchor.addEventListener("click", event => {
            event.preventDefault();
            document.querySelector(anchor.getAttribute("href"))?.scrollIntoView({
                behavior: "smooth",
            });
        });
    });


    const serviceData = {
        "Life Insurance": {
            title: "Life Insurance",
            content: `
                <p class="mb-4">Life insurance provides financial security for beneficiaries in the event of the policyholder's death.</p>
                <div>
                    <ul>
                        <li><strong>Term Life Insurance:</strong> Affordable coverage for a specified period.</li>
                        <li><strong>Whole Life Insurance:</strong> Lifetime protection with a savings component.</li>
                        <li><strong>Customizable Riders:</strong> Options such as accidental death benefits or critical illness coverage.</li>
                    </ul>
                    <p><strong>Key Benefits:</strong> Ensures your loved ones' financial stability, provides tax benefits, and offers flexible premium payment options.</p>
                </div>
            `,
        },
        "Health Insurance": {
            title: "Health Insurance",
            content: `
                <p class="mb-4">Comprehensive health insurance to cover medical expenses, ensuring peace of mind for you and your family.</p>
                <div>
                    <ul>
                        <li><strong>Individual and Family Plans:</strong> Coverage for medical treatments, hospitalizations, and outpatient care.</li>
                        <li><strong>Corporate Health Insurance:</strong> Group plans for businesses to protect employees.</li>
                        <li><strong>Key Benefits:</strong> Access to a wide network of hospitals with cashless claim options. Coverage for pre-existing conditions and preventive healthcare.</li>
                    </ul>
                </div>
            `,
        },
        "Vehicle Insurance": {
            title: "Vehicle Insurance",
            content: `
                <p class="mb-4">Protect your vehicle against accidents, theft, and damages with our comprehensive car insurance policies.</p>
                <div>
                    <ul>
                        <li><strong>Comprehensive Plans:</strong> Covers both own vehicle damage and third-party liabilities.</li>
                        <li><strong>Third-Party Liability Plans:</strong> Mandatory coverage for damages caused to others.</li>
                        <li><strong>Key Benefits:</strong> 24/7 roadside assistance and quick claim settlements to get you back on the road faster.</li>
                    </ul>
                </div>
            `,
        },
        "Property Insurance": {
            title: "Property Insurance",
            content: `
                <p class="mb-4">Safeguard your home, office, and valuable assets against risks like fire, theft, and natural disasters.</p>
                <div>
                    <ul>
                        <li><strong>Home Insurance:</strong> Coverage for residential properties and contents.</li>
                        <li><strong>Commercial Property Insurance:</strong> Tailored protection for offices, warehouses, and retail spaces.</li>
                        <li><strong>Key Benefits:</strong> Comprehensive coverage with optional add-ons like flood protection. Assistance with valuation and risk assessment.</li>
                    </ul>
                </div>
            `,
        },
        "Bond Insurance": {
            title: "Bond Insurance",
            content: `
                <p class="mb-4">Provides coverage for goods and vessels during transit by sea, air, or land.</p>
                <div>
                    <ul>
                        <li><strong>Performance Bonds:</strong> Guarantees project completion.</li>
                        <li><strong>Bid Bonds:</strong> Protects against financial loss if a bidder fails to honor their contract.</li>
                        <li><strong>Payment Bonds:</strong> Ensures subcontractors and suppliers are paid.</li>
                        <li><strong>Maintenance Bonds:</strong> Covers defects or issues post-project completion.</li>
                        <li><strong>Key Benefits:</strong> Mitigates risks, enhances credibility, ensures compliance, and provides financial support for contractual obligations.</li>
                    </ul>
                </div>
            `,
        },
        "Business Insurance": {
            title: "Business Insurance",
            content: `
                <p class="mb-4">Designed to safeguard organizations from financial losses due to unforeseen events.</p>
                <div>
                    <ul>
                        <li><strong>General Liability Insurance:</strong> Protection against third-party claims.</li>
                        <li><strong>Professional Liability Insurance:</strong> Coverage for errors and omissions.</li>
                        <li><strong>Business Interruption Insurance:</strong> Compensates for lost income during operational downtime.</li>
                        <li><strong>Key Benefits:</strong> Customized policies for specific industries and affordable premiums for SMEs.</li>
                    </ul>
                </div>
            `,
        },
        "Marine Insurance": {
            title: "Marine Insurance",
            content: `
                <p class="mb-4">Provides coverage for goods and vessels during transit by sea, air, or land.</p>
                <div>
                    <ul>
                        <li><strong>Cargo Insurance:</strong> Protection for goods against loss or damage.</li>
                        <li><strong>Hull Insurance:</strong> Coverage for physical damage to ships and boats.</li>
                        <li><strong>Key Benefits:</strong> Comprehensive protection for importers, exporters, and logistics companies. Assistance with claim documentation and processing.</li>
                    </ul>
                </div>
            `,
        },
    };
    

    // Modal Elements
    const modal = document.getElementById("serviceModal");
    const modalTitle = modal.querySelector(".modal-title");
    const modalBody = modal.querySelector(".modal-body");
    const closeModalButton = modal.querySelector(".slideServiceModalBtnClose");
    const backdrop = document.getElementById("modalBackdrop");

    // Open Modal on Button Click
    document.querySelectorAll(".btn[data-title]").forEach(button => {
        button.addEventListener("click", () => {
            const title = button.getAttribute("data-title");
            const service = serviceData[title];

            if (service) {
                modalTitle.textContent = service.title;
                modalBody.innerHTML = service.content;
                modal.classList.add("active");
            }
        });
    });

    // Close Modal Handlers
     // Open Modal on Button Click
     document.querySelectorAll(".btn[data-title]").forEach(button => {
        button.addEventListener("click", () => {
            const title = button.getAttribute("data-title");
            const service = serviceData[title]; // Assuming serviceData is defined elsewhere

            if (service) {
                modalTitle.textContent = service.title;
                modalBody.innerHTML = service.content;

                // Show modal and backdrop
                modal.classList.add("active");
                backdrop.classList.add("active");
            }
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove("active");
        backdrop.classList.remove("active");
    };

    // Close Modal on Close Button
    closeModalButton.addEventListener("click", closeModal);

    // Close Modal on Clicking Backdrop
    backdrop.addEventListener("click", closeModal);

    // Optional: Close Modal on Esc Key
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModal();
    });

    // Utility: Check if an Element is in the Viewport
    function isInViewport(element) {
        const rect = element?.getBoundingClientRect();
        return rect?.top <= window.innerHeight && rect?.bottom >= 0;
    }

    // Utility: Form Validation
    function validateForm({ subject, message, phone, name, email }) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^0[76]\d{8}$/;

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

    // Utility: Display Notifications
    function displayNotification(message, backgroundColor) {
        const notification = document.querySelector("#notification");
        if (!notification) return;
        notification.style.display = "block";
        notification.textContent = message;
        notification.style.backgroundColor = backgroundColor;
        notification.style.color = "whitesmoke";

        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    }

    // Form Submission Handler
    const form = document.querySelector("form");
    form?.addEventListener("submit", async event => {
        event.preventDefault();

        const subject = document.getElementById("subject")?.value.trim();
        const message = document.getElementById("message")?.value.trim();
        const phone = document.getElementById("phone")?.value.trim();
        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const sendEmailButton = document.querySelector("#sendEmailButton");

        if (!validateForm({ subject, message, phone, name, email })) return;

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
});

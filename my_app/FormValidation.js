document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let recommendation = document.getElementById("recommendation").value;
    let isValid = true;

    const patterns = {
        name: /^[A-Za-z\s]+$/, // Only letters and spaces for Name
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Valid email format
        phone: /^\(\d{3}\) \d{3}-\d{4}$/, // Phone number format (XXX) XXX-XXXX
        recommendation: /^(?!.*<.*>).*$/ // Prevent HTML tags in the recommendation
    };

    const errorMessages = {
        name: "Name should contain only letters and spaces.",
        email: "Please enter a valid email address (e.g., user@example.com).",
        phone: "Phone number should be in the format (XXX) XXX-XXXX.",
        recommendation: "Please avoid using HTML tags in the recommendation."
    };

    let errorTriggered = false;
    ["name", "email", "phone", "recommendation"].forEach(field => {
        const input = document.getElementById(field);
        const errorSpan = document.getElementById(`${field}-error`);

        if (!patterns[field].test(input.value)) {
            errorSpan.textContent = errorMessages[field];
            isValid = false;
            errorTriggered = true;
        } else {
            errorSpan.textContent = "";
        }
    });

    if (isValid) {
        alert("Form submitted successfully!");
    }
});

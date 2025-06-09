// Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      navLinks.classList.remove("active");
    }
  });

  // Check if user is logged in
  checkAuthStatus();
});

// Authentication Status Check
function checkAuthStatus() {
  const user = localStorage.getItem("user");
  const loginBtn = document.querySelector(".login-btn");

  if (user) {
    const userData = JSON.parse(user);
    if (loginBtn) {
      loginBtn.textContent = "Profile";
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // logout();
        profile();
      });
    }
  }
}

// Logout Function
function logout() {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
}

function profile() {
  window.location.href = "../pages/profile.html";
}
// Form Validation
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      showError(input, "This field is required");
      isValid = false;
    } else {
      clearError(input);
    }

    // Email validation
    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        showError(input, "Please enter a valid email address");
        isValid = false;
      }
    }

    // Phone validation
    if (input.type === "tel" && input.value) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(input.value)) {
        showError(input, "Please enter a valid 10-digit phone number");
        isValid = false;
      }
    }
  });

  return isValid;
}

// Show Error Message
function showError(input, message) {
  const formGroup = input.closest(".form-group");
  const error =
    formGroup.querySelector(".error-message") || document.createElement("div");
  error.className = "error-message";
  error.style.color = "red";
  error.style.fontSize = "0.8rem";
  error.style.marginTop = "0.25rem";
  error.textContent = message;

  if (!formGroup.querySelector(".error-message")) {
    formGroup.appendChild(error);
  }

  input.style.borderColor = "red";
}

// Clear Error Message
function clearError(input) {
  const formGroup = input.closest(".form-group");
  const error = formGroup.querySelector(".error-message");
  if (error) {
    error.remove();
  }
  input.style.borderColor = "#ddd";
}

// Show Alert Message
function showAlert(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;

  document.body.insertBefore(alertDiv, document.body.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

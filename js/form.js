// Contact Form with EmailJS and Email Validation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init('vefIw0jvSsW-R7JvJ');
    
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Email validation function
    function isValidEmail(email) {
        // Basic regex pattern for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.classList.add('invalid');
            // Create error message if it doesn't exist
            if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please enter a valid email address';
                this.parentNode.insertBefore(errorMessage, this.nextElementSibling);
            }
        } else {
            this.classList.remove('invalid');
            // Remove error message if it exists
            const errorMessage = this.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        }
    });
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        // Check if name is empty
        if (!nameInput.value.trim()) {
            markAsInvalid(nameInput, 'Name is required');
            isValid = false;
        } else {
            markAsValid(nameInput);
        }
        
        // Check if email is valid
        if (!emailInput.value.trim()) {
            markAsInvalid(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            markAsInvalid(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            markAsValid(emailInput);
        }
        
        // Check if subject is empty
        if (!subjectInput.value.trim()) {
            markAsInvalid(subjectInput, 'Subject is required');
            isValid = false;
        } else {
            markAsValid(subjectInput);
        }
        
        // Check if message is empty
        if (!messageInput.value.trim()) {
            markAsInvalid(messageInput, 'Message is required');
            isValid = false;
        } else {
            markAsValid(messageInput);
        }
        
        // Stop submission if validation fails
        if (!isValid) {
            return;
        }
        
        // Disable the submit button and change text while sending
        submitButton.disabled = true;
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        
        // Advanced email validation via an API (optional)
        validateEmailAddress(emailInput.value)
            .then(function(isValidEmail) {
                if (!isValidEmail) {
                    markAsInvalid(emailInput, 'This email address appears to be invalid or non-existent');
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    return Promise.reject('Invalid email');
                }
                
                // Get form data
                const formData = {
                    from_name: nameInput.value,
                    from_email: emailInput.value,
                    subject: subjectInput.value,
                    message: messageInput.value
                };
                
                // Send email using EmailJS
                return emailjs.send('service-2001-steve', 'template_0xvu7tb', formData);
            })
            .then(function() {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                // Only show error if it's not our validation error
                if (error !== 'Invalid email') {
                    console.error('EmailJS error:', error);
                    showNotification('Failed to send message. Please try again.', 'error');
                }
            })
            .finally(function() {
                // Re-enable the submit button and restore original text
                if (submitButton.disabled) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }
            });
    });
    
    // Helper function to mark input as invalid
    function markAsInvalid(input, message) {
        input.classList.add('invalid');
        // Create error message if it doesn't exist
        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            input.parentNode.insertBefore(errorMessage, input.nextElementSibling);
        } else {
            input.nextElementSibling.textContent = message;
        }
    }
    
    // Helper function to mark input as valid
    function markAsValid(input) {
        input.classList.remove('invalid');
        // Remove error message if it exists
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
    
    // Advanced email validation function using an API (free tier)
    function validateEmailAddress(email) {
        // Option 1: Simple domain check (this is basic but doesn't ensure deliverability)
        return new Promise((resolve) => {
            const domain = email.split('@')[1];
            
            if (!domain) {
                resolve(false);
                return;
            }
            
            // Check if domain has MX records (this is a more reliable check but requires server-side)
            // Since we're client-side only, we'll use a simpler approach
            const commonDomains = [
                'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
                'aol.com', 'icloud.com', 'protonmail.com', 'mail.com',
                'zoho.com', 'yandex.com', 'gmx.com', 'live.com'
            ];
            
            // If using a common domain, consider it probably valid
            if (commonDomains.includes(domain.toLowerCase())) {
                resolve(true);
                return;
            }
            
            // For other domains, we'll do a simple check if the domain looks valid
            // This is not perfect but better than nothing for client-side
            if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain)) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
        
        // Option 2: For production use with server component
        // Use a proper email validation API like:
        // - Abstract API (abstractapi.com)
        // - Email Validator (emailvalidator.co)
        // - ZeroBounce
        // But these require API keys and server-side implementation
    }
    
    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Animate out after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(-20px)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
});



//FOR DYNAMIC CURRENT YEAR

document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
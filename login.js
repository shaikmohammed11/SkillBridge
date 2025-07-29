// Login Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const otpInput = document.getElementById('otp');
    const passwordToggle = document.getElementById('passwordToggle');
    const otpToggle = document.getElementById('otpToggle');
    const otpGroup = document.getElementById('otpGroup');
    const submitBtn = document.getElementById('submitBtn');
    const errorContainer = document.getElementById('errorContainer');
    const errorMessage = document.getElementById('errorMessage');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const forgotPasswordLink = document.getElementById('forgotPassword');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const otpPattern = /^\d{6}$/;

    // Initialize form
    initializeForm();

    // Event listeners
    function initializeForm() {
        // Password visibility toggle
        passwordToggle.addEventListener('click', togglePasswordVisibility);
        
        // OTP toggle
        otpToggle.addEventListener('click', toggleOTPField);
        
        // Form submission
        loginForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', clearFieldError);
        passwordInput.addEventListener('blur', validatePassword);
        passwordInput.addEventListener('input', clearFieldError);
        otpInput.addEventListener('input', validateOTP);
        
        // Forgot password handler
        forgotPasswordLink.addEventListener('click', handleForgotPassword);
        
        // Clear error when user starts typing
        [emailInput, passwordInput, otpInput].forEach(input => {
            input.addEventListener('input', hideGlobalError);
        });

        // Auto-populate from localStorage if remember me was checked
        loadRememberedCredentials();
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update icon (toggle between eye and eye-slash)
        const eyeIcon = passwordToggle.querySelector('.eye-icon');
        if (type === 'text') {
            eyeIcon.innerHTML = `
                <path d="M1 10s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 7L16 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 7L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
            passwordToggle.setAttribute('aria-label', 'Hide password');
        } else {
            eyeIcon.innerHTML = `
                <path d="M1 10s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
            `;
            passwordToggle.setAttribute('aria-label', 'Show password');
        }
    }

    // Toggle OTP field visibility
    function toggleOTPField(e) {
        e.preventDefault();
        
        if (otpGroup.style.display === 'none' || otpGroup.style.display === '') {
            otpGroup.style.display = 'block';
            otpToggle.textContent = 'Hide OTP field';
            otpInput.focus();
        } else {
            otpGroup.style.display = 'none';
            otpToggle.textContent = 'Need OTP? Click here';
            otpInput.value = '';
            clearFieldError('otp');
        }
    }

    // Email validation
    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('email-error');
        
        if (!email) {
            showFieldError('email', 'Email address is required');
            return false;
        }
        
        if (!emailPattern.test(email)) {
            showFieldError('email', 'Please enter a valid email address');
            return false;
        }
        
        clearFieldError('email');
        return true;
    }

    // Password validation
    function validatePassword() {
        const password = passwordInput.value;
        const errorElement = document.getElementById('password-error');
        
        if (!password) {
            showFieldError('password', 'Password is required');
            return false;
        }
        
        if (password.length < 8) {
            showFieldError('password', 'Password must be at least 8 characters long');
            return false;
        }
        
        if (!passwordPattern.test(password)) {
            showFieldError('password', 'Password must contain uppercase, lowercase, number, and special character');
            return false;
        }
        
        clearFieldError('password');
        return true;
    }

    // OTP validation
    function validateOTP() {
        const otp = otpInput.value.trim();
        const isVisible = otpGroup.style.display !== 'none';
        
        if (!isVisible) return true; // OTP is optional when hidden
        
        if (otp && !otpPattern.test(otp)) {
            showFieldError('otp', 'OTP must be exactly 6 digits');
            return false;
        }
        
        clearFieldError('otp');
        return true;
    }

    // Show field-specific error
    function showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement && inputElement) {
            errorElement.textContent = message;
            inputElement.classList.add('error');
            inputElement.setAttribute('aria-invalid', 'true');
        }
    }

    // Clear field-specific error
    function clearFieldError(fieldName) {
        if (typeof fieldName === 'string') {
            const errorElement = document.getElementById(`${fieldName}-error`);
            const inputElement = document.getElementById(fieldName);
            
            if (errorElement && inputElement) {
                errorElement.textContent = '';
                inputElement.classList.remove('error');
                inputElement.setAttribute('aria-invalid', 'false');
            }
        } else {
            // Handle event object
            const target = fieldName.target;
            const fieldName2 = target.name;
            clearFieldError(fieldName2);
        }
    }

    // Show global error message
    function showGlobalError(message) {
        errorMessage.textContent = message;
        errorContainer.style.display = 'flex';
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Focus on first invalid field
        const firstError = loginForm.querySelector('.form-input[aria-invalid="true"]');
        if (firstError) {
            firstError.focus();
        }
    }

    // Hide global error message
    function hideGlobalError() {
        errorContainer.style.display = 'none';
    }

    // Handle form submission
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Clear previous errors
        hideGlobalError();
        ['email', 'password', 'otp'].forEach(clearFieldError);
        
        // Validate all fields
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isOTPValid = validateOTP();
        
        if (!isEmailValid || !isPasswordValid || !isOTPValid) {
            showGlobalError('Please correct the errors above and try again.');
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        try {
            // Prepare form data
            const formData = {
                email: emailInput.value.trim(),
                password: passwordInput.value,
                otp: otpInput.value.trim() || null,
                rememberMe: rememberMeCheckbox.checked
            };
            
            // Simulate API call
            const result = await authenticateUser(formData);
            
            if (result.success) {
                // Handle successful login
                handleLoginSuccess(result, formData.rememberMe);
            } else {
                // Handle login failure
                handleLoginFailure(result.error);
            }
            
        } catch (error) {
            console.error('Login error:', error);
            showGlobalError('An unexpected error occurred. Please try again.');
        } finally {
            setLoadingState(false);
        }
    }

    // Simulate user authentication
    async function authenticateUser(formData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Demo authentication logic
        const validCredentials = {
            'john.doe@skillbridge.com': 'SkillBridge2024!',
            'jane.smith@skillbridge.com': 'Learning123!',
            'demo@skillbridge.com': 'Demo123!'
        };
        
        const { email, password, otp } = formData;
        
        // Check credentials
        if (validCredentials[email] && validCredentials[email] === password) {
            // If OTP is provided, validate it
            if (otp && otp !== '123456') {
                return {
                    success: false,
                    error: 'Invalid OTP. Please try again.'
                };
            }
            
            return {
                success: true,
                user: {
                    email: email,
                    name: getNameFromEmail(email),
                    token: generateAuthToken()
                }
            };
        } else {
            return {
                success: false,
                error: 'Invalid email or password. Please check your credentials and try again.'
            };
        }
    }

    // Handle successful login
    function handleLoginSuccess(result, rememberMe) {
        const { user } = result;
        
        // Store user data
        sessionStorage.setItem('skillbridge_user', JSON.stringify(user));
        sessionStorage.setItem('skillbridge_token', user.token);
        
        // Handle remember me
        if (rememberMe) {
            localStorage.setItem('skillbridge_remember_email', user.email);
        } else {
            localStorage.removeItem('skillbridge_remember_email');
        }
        
        // Show success message briefly
        showGlobalError('Login successful! Redirecting to dashboard...');
        errorContainer.style.background = '#dcfce7';
        errorContainer.style.borderColor = '#bbf7d0';
        errorContainer.style.color = '#166534';
        
        // Redirect to dashboard with HTTPS
        setTimeout(() => {
            const protocol = window.location.protocol === 'https:' ? 'https:' : 'https:';
            const host = window.location.host;
            const dashboardUrl = `${protocol}//${host}/dashboard.html`;
            window.location.href = dashboardUrl;
        }, 1000);
    }

    // Handle login failure
    function handleLoginFailure(error) {
        showGlobalError(error);
        
        // Focus on email field for retry
        emailInput.focus();
        emailInput.select();
    }

    // Set loading state
    function setLoadingState(isLoading) {
        const btnText = submitBtn.querySelector('.btn-text');
        const loadingSpinner = submitBtn.querySelector('.loading-spinner');
        
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.opacity = '0';
            loadingSpinner.style.display = 'block';
            submitBtn.setAttribute('aria-busy', 'true');
        } else {
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            loadingSpinner.style.display = 'none';
            submitBtn.setAttribute('aria-busy', 'false');
        }
    }

    // Handle forgot password
    function handleForgotPassword(e) {
        e.preventDefault();
        
        // In a real application, this would navigate to a password reset page
        alert('Password reset functionality would be implemented here.\n\nFor demo purposes, use:\n• demo@skillbridge.com / Demo123!\n• john.doe@skillbridge.com / SkillBridge2024!\n• jane.smith@skillbridge.com / Learning123!');
    }

    // Load remembered credentials
    function loadRememberedCredentials() {
        const rememberedEmail = localStorage.getItem('skillbridge_remember_email');
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMeCheckbox.checked = true;
            passwordInput.focus();
        }
    }

    // Utility functions
    function getNameFromEmail(email) {
        const names = {
            'john.doe@skillbridge.com': 'John Doe',
            'jane.smith@skillbridge.com': 'Jane Smith',
            'demo@skillbridge.com': 'Demo User'
        };
        return names[email] || email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    function generateAuthToken() {
        return 'sk_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
    }

    // Security enhancements
    
    // Prevent form submission on Enter in password field if validation fails
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (validatePassword()) {
                submitBtn.click();
            }
        }
    });

    // Auto-clear sensitive data on page unload
    window.addEventListener('beforeunload', function() {
        passwordInput.value = '';
        otpInput.value = '';
    });

    // Detect and warn about insecure connections
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        console.warn('⚠️ Insecure connection detected. SkillBridge should be accessed via HTTPS.');
    }

    // Demo instructions
    console.log('🎯 SkillBridge Login Demo');
    console.log('📧 Test credentials:');
    console.log('• demo@skillbridge.com / Demo123!');
    console.log('• john.doe@skillbridge.com / SkillBridge2024!');
    console.log('• jane.smith@skillbridge.com / Learning123!');
    console.log('🔐 Demo OTP: 123456');
});

// Additional utility functions for enhanced UX

// Smooth focus transitions
function enhanceFocusExperience() {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Call enhancement function
document.addEventListener('DOMContentLoaded', enhanceFocusExperience);

// Handle browser back button to prevent cached login state
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was loaded from cache, clear sensitive fields
        document.getElementById('password').value = '';
        document.getElementById('otp').value = '';
    }
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Announce form validation results to screen readers
    const originalShowFieldError = window.showFieldError;
    
    // Add live region for dynamic announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);
    
    // Enhanced error announcements
    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
    };
});
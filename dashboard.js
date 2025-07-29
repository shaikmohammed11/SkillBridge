// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Initialize dashboard
    initializeDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize components
    initializeComponents();
});

// Authentication check
function checkAuthentication() {
    const user = sessionStorage.getItem('skillbridge_user');
    const token = sessionStorage.getItem('skillbridge_token');
    
    if (!user || !token) {
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const userData = JSON.parse(user);
        updateUserInterface(userData);
    } catch (error) {
        console.error('Error parsing user data:', error);
        window.location.href = 'index.html';
    }
}

// Initialize dashboard
function initializeDashboard() {
    // Set up personalized greeting
    setupPersonalizedGreeting();
    
    // Initialize statistics
    initializeStats();
    
    // Set up quick start tabs
    setupQuickStartTabs();
    
    // Initialize navigation cards
    setupNavigationCards();
    
    // Set up profile dropdown
    setupProfileDropdown();
    
    // Initialize mobile menu
    setupMobileMenu();
    
    console.log('🎯 SkillBridge Dashboard Loaded Successfully');
}

// Setup personalized greeting
function setupPersonalizedGreeting() {
    const user = JSON.parse(sessionStorage.getItem('skillbridge_user'));
    const welcomeMessage = document.getElementById('welcomeMessage');
    const welcomeSubtitle = document.getElementById('welcomeSubtitle');
    const userName = document.getElementById('userName');
    const userInitials = document.getElementById('userInitials');
    
    if (user && user.name) {
        // Update user profile
        userName.textContent = user.name;
        userInitials.textContent = getInitials(user.name);
        
        // Create personalized greeting based on time
        const greeting = getTimeBasedGreeting();
        const firstName = user.name.split(' ')[0];
        
        welcomeMessage.textContent = `${greeting}, ${firstName}!`;
        
        // Update subtitle with personalized message
        const subtitles = [
            "Welcome back to your learning journey. Let's continue building your skills today.",
            "Ready to unlock new opportunities? Your mentors are waiting to help you grow.",
            "Great to see you again! Let's make today a productive learning day.",
            "Your dedication to growth is inspiring. What will you learn today?"
        ];
        
        const randomSubtitle = subtitles[Math.floor(Math.random() * subtitles.length)];
        welcomeSubtitle.textContent = randomSubtitle;
    }
}

// Get time-based greeting
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) {
        return 'Good morning';
    } else if (hour < 17) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}

// Get user initials
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
}

// Initialize statistics with animation
function initializeStats() {
    const stats = [
        { element: document.querySelector('.stat-number:nth-child(1)'), target: 7, suffix: '' },
        { element: document.querySelector('.stat-number:nth-child(2)'), target: 89, suffix: '%' },
        { element: document.querySelector('.stat-number:nth-child(3)'), target: 12, suffix: '' }
    ];
    
    // Find actual stat number elements
    const statNumbers = document.querySelectorAll('.stat-number');
    const actualStats = [
        { element: statNumbers[0], target: 7, suffix: '' },
        { element: statNumbers[1], target: 89, suffix: '%' },
        { element: statNumbers[2], target: 12, suffix: '' }
    ];
    
    actualStats.forEach((stat, index) => {
        if (stat.element) {
            animateNumber(stat.element, 0, stat.target, 2000, stat.suffix);
        }
    });
}

// Animate number counter
function animateNumber(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current + suffix;
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Setup quick start tabs
function setupQuickStartTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Announce to screen readers
            announceToScreenReader(`Switched to ${button.textContent} tab`);
        });
    });
}

// Setup navigation cards
function setupNavigationCards() {
    const navCards = document.querySelectorAll('.nav-card');
    
    navCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const href = card.getAttribute('href');
            
            if (href && href !== '#') {
                // In a real application, this would navigate to the appropriate section
                handleNavigation(href);
            }
        });
        
        // Add keyboard navigation
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

// Handle navigation
function handleNavigation(href) {
    const navigationMap = {
        '#mentorship': 'Mentorship Sessions',
        '#goals': 'Learning Goals',
        '#policies': 'Organizational Policies',
        '#progress': 'Progress & Feedback'
    };
    
    const pageName = navigationMap[href] || href;
    
    // Show notification
    showNotification(`Navigation to ${pageName} would be implemented here.`, 'info');
    
    // In a real application, you would:
    // 1. Update the URL
    // 2. Load the appropriate content
    // 3. Update the navigation state
    
    console.log(`Navigating to: ${pageName}`);
}

// Setup profile dropdown
function setupProfileDropdown() {
    const profileBtn = document.querySelector('.profile-btn');
    const dropdown = document.getElementById('profileDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (!profileBtn || !dropdown) return;
    
    // Toggle dropdown
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
        
        // Update aria-expanded
        const isOpen = dropdown.classList.contains('show');
        profileBtn.setAttribute('aria-expanded', isOpen);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
            profileBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle dropdown items
    const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.textContent.includes('Sign Out')) {
                e.preventDefault();
                handleLogout();
            } else {
                // Handle other dropdown actions
                const action = item.textContent.trim();
                showNotification(`${action} functionality would be implemented here.`, 'info');
            }
            
            dropdown.classList.remove('show');
            profileBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Keyboard navigation for dropdown
    profileBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('show');
            profileBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Handle logout
function handleLogout() {
    // Clear user data
    sessionStorage.removeItem('skillbridge_user');
    sessionStorage.removeItem('skillbridge_token');
    
    // Show logout message
    showNotification('Logging out...', 'success');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('show');
        
        if (isOpen) {
            navMenu.classList.remove('show');
            mobileToggle.setAttribute('aria-expanded', 'false');
        } else {
            navMenu.classList.add('show');
            mobileToggle.setAttribute('aria-expanded', 'true');
        }
        
        // Animate hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.transform = isOpen ? 'none' : getHamburgerTransform(index);
        });
    });
}

// Get hamburger icon transform
function getHamburgerTransform(index) {
    switch (index) {
        case 0: return 'rotate(45deg) translate(5px, 5px)';
        case 1: return 'opacity(0)';
        case 2: return 'rotate(-45deg) translate(7px, -6px)';
        default: return 'none';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Quick start card actions
    const cardActions = document.querySelectorAll('.card-action');
    cardActions.forEach(action => {
        action.addEventListener('click', (e) => {
            e.preventDefault();
            const href = action.getAttribute('href');
            handleNavigation(href);
        });
    });
    
    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotifications);
    }
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', handlePopState);
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Initialize components
function initializeComponents() {
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize lazy loading for images
    initializeLazyLoading();
    
    // Initialize accessibility enhancements
    initializeAccessibility();
}

// Show notifications modal
function showNotifications() {
    const notifications = [
        {
            id: 1,
            title: 'New Mentor Match',
            message: 'Sarah Johnson is available for a JavaScript mentoring session',
            time: '2 hours ago',
            type: 'success'
        },
        {
            id: 2,
            title: 'Goal Milestone',
            message: 'Congratulations! You\'ve completed 75% of your React learning goal',
            time: '1 day ago',
            type: 'info'
        },
        {
            id: 3,
            title: 'Session Reminder',
            message: 'Your Python mentoring session starts in 30 minutes',
            time: '3 days ago',
            type: 'warning'
        }
    ];
    
    showNotificationModal(notifications);
}

// Show notification modal
function showNotificationModal(notifications) {
    // Create modal HTML
    const modalHTML = `
        <div class="notification-modal" id="notificationModal">
            <div class="modal-overlay" onclick="closeNotificationModal()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Notifications</h3>
                    <button class="close-btn" onclick="closeNotificationModal()" aria-label="Close notifications">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    ${notifications.map(notification => `
                        <div class="notification-item ${notification.type}">
                            <div class="notification-content">
                                <h4>${notification.title}</h4>
                                <p>${notification.message}</p>
                                <span class="notification-time">${notification.time}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="markAllAsRead()">Mark All as Read</button>
                    <button class="btn-primary" onclick="closeNotificationModal()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addNotificationModalStyles();
    
    // Focus management
    const modal = document.getElementById('notificationModal');
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.focus();
}

// Close notification modal
function closeNotificationModal() {
    const modal = document.getElementById('notificationModal');
    if (modal) {
        modal.remove();
    }
}

// Mark all notifications as read
function markAllAsRead() {
    showNotification('All notifications marked as read', 'success');
    
    // Update notification badge
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.style.display = 'none';
    }
    
    closeNotificationModal();
}

// Show toast notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `toast-notification ${type}`;
    notification.innerHTML = `
        <div class="toast-content">
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add styles if not already added
    addToastStyles();
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
        element.addEventListener('focus', showTooltip);
        element.addEventListener('blur', hideTooltip);
    });
}

// Show tooltip
function showTooltip(e) {
    const text = e.target.getAttribute('data-tooltip');
    if (!text) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.id = 'active-tooltip';
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    // Add styles
    addTooltipStyles();
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.getElementById('active-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize lazy loading
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize accessibility enhancements
function initializeAccessibility() {
    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation enhancements
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add skip link styles
    addSkipLinkStyles();
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    // Escape key handlers
    if (e.key === 'Escape') {
        // Close any open modals or dropdowns
        closeNotificationModal();
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
    
    // Tab trap for modals
    if (e.key === 'Tab') {
        const modal = document.querySelector('.notification-modal');
        if (modal) {
            trapFocus(e, modal);
        }
    }
}

// Trap focus within element
function trapFocus(e, element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
    }
}

// Handle browser back/forward
function handlePopState(e) {
    // Handle state changes if implementing SPA navigation
    console.log('Navigation state changed:', e.state);
}

// Handle visibility change
function handleVisibilityChange() {
    if (document.hidden) {
        // Page is hidden (user switched tabs)
        console.log('Dashboard hidden');
    } else {
        // Page is visible (user returned to tab)
        console.log('Dashboard visible');
        // Refresh any time-sensitive data
        updateDashboardData();
    }
}

// Update dashboard data
function updateDashboardData() {
    // In a real application, this would refresh data from the server
    console.log('Refreshing dashboard data...');
}

// Utility function for screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Dynamic styles addition functions
function addNotificationModalStyles() {
    if (document.getElementById('notification-modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'notification-modal-styles';
    styles.textContent = `
        .notification-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .modal-header h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
        }
        .close-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: #6b7280;
            padding: 0.5rem;
            border-radius: 8px;
        }
        .close-btn:hover {
            background: #f3f4f6;
        }
        .modal-body {
            padding: 1rem 1.5rem;
        }
        .notification-item {
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1rem;
            border-left: 4px solid #3b82f6;
        }
        .notification-item.success {
            background: #f0fdf4;
            border-left-color: #10b981;
        }
        .notification-item.warning {
            background: #fffbeb;
            border-left-color: #f59e0b;
        }
        .notification-item.info {
            background: #eff6ff;
            border-left-color: #3b82f6;
        }
        .notification-content h4 {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #1f2937;
        }
        .notification-content p {
            color: #6b7280;
            margin-bottom: 0.5rem;
        }
        .notification-time {
            font-size: 0.875rem;
            color: #9ca3af;
        }
        .modal-footer {
            padding: 1.5rem;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        }
        .btn-primary, .btn-secondary {
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            border: none;
        }
        .btn-primary {
            background: #3b82f6;
            color: white;
        }
        .btn-secondary {
            background: #f3f4f6;
            color: #374151;
        }
    `;
    
    document.head.appendChild(styles);
}

function addToastStyles() {
    if (document.getElementById('toast-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'toast-styles';
    styles.textContent = `
        .toast-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            border-left: 4px solid #3b82f6;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        .toast-notification.show {
            transform: translateX(0);
        }
        .toast-notification.success {
            border-left-color: #10b981;
        }
        .toast-notification.warning {
            border-left-color: #f59e0b;
        }
        .toast-notification.error {
            border-left-color: #ef4444;
        }
        .toast-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.5rem;
        }
        .toast-message {
            color: #374151;
            font-weight: 500;
        }
        .toast-close {
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #6b7280;
            cursor: pointer;
            margin-left: 1rem;
        }
    `;
    
    document.head.appendChild(styles);
}

function addTooltipStyles() {
    if (document.getElementById('tooltip-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'tooltip-styles';
    styles.textContent = `
        .tooltip {
            position: absolute;
            background: #1f2937;
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            font-size: 0.875rem;
            z-index: 1000;
            pointer-events: none;
        }
        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid transparent;
            border-top-color: #1f2937;
        }
    `;
    
    document.head.appendChild(styles);
}

function addSkipLinkStyles() {
    if (document.getElementById('skip-link-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'skip-link-styles';
    styles.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #3b82f6;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
        }
        .skip-link:focus {
            top: 6px;
        }
        .sr-only {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
        }
    `;
    
    document.head.appendChild(styles);
}

// Global functions for HTML onclick handlers
window.closeNotificationModal = closeNotificationModal;
window.markAllAsRead = markAllAsRead;
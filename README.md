# SkillBridge Web Portal

A modern, responsive web application that connects users with micro-mentors for focused learning sessions. Built with HTML5, CSS3, and vanilla JavaScript with a focus on accessibility and user experience.

## 🎯 Overview

SkillBridge is a web-based platform that connects users with micro-mentors (experienced professionals or AI agents) for short, focused sessions. It uses AI to match users with mentors based on skill needs, availability, and learning goals.

## ✨ Features

### 🔐 Secure Login Interface
- **Modern Design**: Clean, intuitive interface with glassmorphism effects
- **Comprehensive Validation**: Real-time form validation with accessible error messages
- **Optional OTP Support**: Two-factor authentication for enhanced security
- **Remember Me**: Persistent login preferences
- **Password Visibility Toggle**: User-friendly password input experience
- **HTTPS Redirect**: Automatic secure connection enforcement

### 🏠 Personalized Dashboard
- **Dynamic Greeting**: Time-based personalized welcome messages
- **Live Statistics**: Animated progress indicators and learning metrics
- **SkillBridge Introduction**: Comprehensive platform overview with key features
- **Quick Start Guide**: Separate onboarding flows for new joiners and GenC members
- **Navigation Cards**: Quick access to core platform features
- **Responsive Design**: Optimized for all device sizes

### 🎨 Modern UI/UX
- **Accessibility First**: WCAG 2.1 compliant with screen reader support
- **Mobile Responsive**: Seamless experience across all devices
- **Smooth Animations**: Engaging micro-interactions and transitions
- **High Contrast Support**: Accommodates users with visual preferences
- **Reduced Motion Support**: Respects user accessibility preferences
- **Keyboard Navigation**: Full keyboard accessibility support

### 🔧 Technical Features
- **Vanilla JavaScript**: No framework dependencies, lightweight and fast
- **Modern CSS**: CSS Grid, Flexbox, and custom properties
- **Progressive Enhancement**: Works without JavaScript for core functionality
- **Security Headers**: HTTPS enforcement and secure session management
- **Performance Optimized**: Lazy loading and efficient resource management

## 🚀 Quick Start

### Demo Credentials

Use these credentials to test the login functionality:

| Email | Password | Description |
|-------|----------|-------------|
| `demo@skillbridge.com` | `Demo123!` | General demo user |
| `john.doe@skillbridge.com` | `SkillBridge2024!` | Sample professional user |
| `jane.smith@skillbridge.com` | `Learning123!` | Sample learner user |

**Optional OTP**: `123456` (when OTP field is enabled)

### Local Setup

1. **Clone or Download** the project files
2. **Serve the files** using a local web server:
   
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (with http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open your browser** and navigate to:
   - `http://localhost:8000` (or the port shown in your terminal)
   - Start with `index.html` for the login page

4. **Test the application**:
   - Use any of the demo credentials above
   - Try the OTP functionality by clicking "Need OTP? Click here"
   - Navigate through the dashboard features

## 📁 Project Structure

```
skillbridge-portal/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── styles.css             # Login page styles
├── dashboard.css          # Dashboard styles
├── login.js              # Login functionality
├── dashboard.js          # Dashboard functionality
├── README.md             # Project documentation
└── LICENSE               # Project license
```

## 🎮 Features Walkthrough

### Login Experience
1. **Enter Credentials**: Use any demo email/password combination
2. **Enable OTP**: Click "Need OTP? Click here" to test two-factor authentication
3. **Form Validation**: Try invalid inputs to see real-time validation
4. **Remember Me**: Check the box to persist login preferences
5. **Responsive Design**: Test on different screen sizes

### Dashboard Experience
1. **Personalized Greeting**: Notice the time-based greeting and dynamic content
2. **Statistics Animation**: Watch the animated counter on page load
3. **SkillBridge Overview**: Learn about the platform's core features
4. **Quick Start Tabs**: Switch between "New Joiners" and "GenC Members"
5. **Navigation Cards**: Explore different platform sections
6. **Profile Menu**: Access user settings and logout functionality
7. **Notifications**: Click the notification bell to see sample notifications

### Accessibility Features
1. **Keyboard Navigation**: Tab through all interactive elements
2. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
3. **High Contrast**: Enable high contrast mode in your OS
4. **Reduced Motion**: Test with motion preferences disabled
5. **Focus Management**: Notice clear focus indicators

## 🛠 Customization

### Branding
- Update colors in CSS custom properties (`:root` section)
- Replace the SVG logo with your brand logo
- Modify text content in HTML files

### Authentication
- Replace the demo authentication logic in `login.js`
- Integrate with your backend API
- Update redirect URLs and session management

### Features
- Add new navigation items to the dashboard
- Extend the quick start guide with additional steps
- Customize the notification system

## 🔒 Security Considerations

### Current Implementation
- **Client-side demo**: Authentication is simulated for demonstration
- **Session storage**: User data stored temporarily in browser
- **HTTPS enforcement**: Warns about insecure connections
- **Input validation**: Comprehensive client-side validation

### Production Recommendations
- Implement server-side authentication
- Use secure HTTP-only cookies for sessions
- Add CSRF protection
- Implement proper password hashing
- Add rate limiting for login attempts
- Use environment variables for configuration

## 📱 Browser Support

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+

## 🎯 Accessibility Standards

This project follows WCAG 2.1 AA guidelines:

- ✅ **Perceivable**: Clear visual hierarchy, sufficient color contrast
- ✅ **Operable**: Full keyboard navigation, no seizure-inducing content
- ✅ **Understandable**: Clear language, predictable functionality
- ✅ **Robust**: Valid HTML, cross-browser compatibility

## 🤝 Contributing

1. **Report Issues**: Use the issue tracker for bugs or feature requests
2. **Submit Pull Requests**: Follow the existing code style
3. **Improve Accessibility**: Help make the app more inclusive
4. **Add Features**: Extend functionality while maintaining simplicity

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🔗 Related Resources

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)

## 💡 Future Enhancements

- [ ] Progressive Web App (PWA) capabilities
- [ ] Dark mode theme toggle
- [ ] Multi-language support (i18n)
- [ ] Advanced search and filtering
- [ ] Real-time chat integration
- [ ] Calendar scheduling system
- [ ] Video call integration
- [ ] Progress tracking analytics
- [ ] Mobile app companion

---

**Built with ❤️ for the SkillBridge learning community**

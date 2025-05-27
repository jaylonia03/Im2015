// Store prediction tool password in localStorage
const PREDICTION_TOOL_PASSWORD_KEY = 'predictionToolPassword';
const DEFAULT_TOOL_PASSWORD = 'predict123'; // Default password
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'hahaha'
};

// Initialize prediction tool password if not set
if (!localStorage.getItem(PREDICTION_TOOL_PASSWORD_KEY)) {
    localStorage.setItem(PREDICTION_TOOL_PASSWORD_KEY, DEFAULT_TOOL_PASSWORD);
}

// Initialize usage statistics if not set
if (!localStorage.getItem('totalCalculations')) {
    localStorage.setItem('totalCalculations', '0');
    localStorage.setItem('lastCalculation', 'Never');
    localStorage.setItem('uniqueVisitors', '0');
}

// Initialize admin settings if not set
if (!localStorage.getItem('maintenanceMode')) {
    localStorage.setItem('maintenanceMode', 'false');
    localStorage.setItem('darkMode', 'true');
    localStorage.setItem('passwordProtection', 'true');
}

// Function to get current prediction tool password
function getToolPassword() {
    return localStorage.getItem(PREDICTION_TOOL_PASSWORD_KEY);
}

// Function to update prediction tool password
function updateToolPassword(newPassword) {
    localStorage.setItem(PREDICTION_TOOL_PASSWORD_KEY, newPassword);
    return true;
}

// Function to verify admin credentials
function verifyAdminCredentials(username, password) {
    return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

// Function to calculate the prediction result
function calculatePrediction(number) {
    // Convert to number in case it's a string
    const num = parseInt(number);
    
    // Calculate sum of digits
    const sumOfDigits = String(num).split('').reduce((sum, digit) => {
        return sum + parseInt(digit);
    }, 0);
    
    // Apply formula: (Current Number × 2) - (Sum of Digits of Current Number)
    const result = (num * 2) - sumOfDigits;
    
    return {
        result: result,
        isEven: result % 2 === 0
    };
}

// Function to format a number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to check password strength
function checkPasswordStrength(password) {
    if (password.length < 4) return 0;
    if (password.length < 6) return 1;
    if (password.length < 8) return 2;
    if (!/\d/.test(password)) return 2;
    if (!/[A-Z]/.test(password)) return 3;
    return 4;
}

// Function to get password strength text
function getPasswordStrengthText(strength) {
    const texts = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
    return texts[strength] || 'Weak';
}

// Function to get password strength color
function getPasswordStrengthColor(strength) {
    const colors = ['#d63031', '#fdcb6e', '#00b894', '#0984e3', '#6c5ce7'];
    return colors[strength] || '#d63031';
}

// Function to get usage statistics
function getUsageStatistics() {
    return {
        totalCalculations: localStorage.getItem('totalCalculations') || '0',
        lastCalculation: localStorage.getItem('lastCalculation') || 'Never',
        uniqueVisitors: localStorage.getItem('uniqueVisitors') || '0'
    };
}

// Function to update usage statistics
function updateUsageStatistics() {
    // Get current total
    let total = parseInt(localStorage.getItem('totalCalculations')) || 0;
    total++;
    
    // Update total
    localStorage.setItem('totalCalculations', total.toString());
    
    // Update last calculation time
    const now = new Date();
    localStorage.setItem('lastCalculation', now.toLocaleString());
    
    // Update unique visitors (simplified version)
    let unique = parseInt(localStorage.getItem('uniqueVisitors')) || 0;
    if (!sessionStorage.getItem('visitorCounted')) {
        unique++;
        localStorage.setItem('uniqueVisitors', unique.toString());
        sessionStorage.setItem('visitorCounted', 'true');
    }
}

// Function to check if maintenance mode is enabled
function isMaintenanceMode() {
    return localStorage.getItem('maintenanceMode') === 'true';
}

// Function to check if password protection is enabled
function isPasswordProtected() {
    return localStorage.getItem('passwordProtection') !== 'false';
}

// Function to check if dark mode is enabled
function isDarkMode() {
    return localStorage.getItem('darkMode') !== 'false';
}

// Function to get current settings
function getSettings() {
    return {
        maintenanceMode: isMaintenanceMode(),
        darkMode: isDarkMode(),
        passwordProtection: isPasswordProtected(),
        themeColor: localStorage.getItem('themeColor') || '#6c5ce7',
        emailAlerts: localStorage.getItem('emailAlerts') === 'true',
        adminEmail: localStorage.getItem('adminEmail') || ''
    };
}

// Function to save settings
function saveSettings(settings) {
    localStorage.setItem('maintenanceMode', settings.maintenanceMode.toString());
    localStorage.setItem('darkMode', settings.darkMode.toString());
    localStorage.setItem('passwordProtection', settings.passwordProtection.toString());
    if (settings.themeColor) localStorage.setItem('themeColor', settings.themeColor);
    localStorage.setItem('emailAlerts', settings.emailAlerts.toString());
    if (settings.adminEmail) localStorage.setItem('adminEmail', settings.adminEmail);
    return true;
}

// Function to generate mock activity logs
function generateMockLogs(count = 20) {
    const activities = [
        'Calculation performed',
        'Admin login',
        'Password changed',
        'Settings updated',
        'System maintenance'
    ];
    
    const logs = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
        const daysAgo = Math.floor(Math.random() * 30);
        const hoursAgo = Math.floor(Math.random() * 24);
        const minutesAgo = Math.floor(Math.random() * 60);
        
        const date = new Date(now);
        date.setDate(date.getDate() - daysAgo);
        date.setHours(date.getHours() - hoursAgo);
        date.setMinutes(date.getMinutes() - minutesAgo);
        
        logs.push({
            timestamp: date.toLocaleString(),
            event: activities[Math.floor(Math.random() * activities.length)],
            details: 'Sample activity details',
            ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            type: ['calculation', 'login', 'system'][Math.floor(Math.random() * 3)]
        });
    }
    
    // Sort by date (newest first)
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Function to check if user is on admin page
function isAdminPage() {
    return window.location.pathname.includes('admin.html');
}

// Function to check if user is on prediction page
function isPredictionPage() {
    return window.location.pathname.includes('prediction.html');
}

// Function to check if user is on landing page
function isLandingPage() {
    return window.location.pathname === '/' || window.location.pathname.includes('index.html');
}

// Apply theme color from settings
function applyThemeColor() {
    const settings = getSettings();
    document.documentElement.style.setProperty('--primary-color', settings.themeColor);
    
    // Calculate darker shade for --primary-dark
    const darkerShade = shadeColor(settings.themeColor, -20);
    document.documentElement.style.setProperty('--primary-dark', darkerShade);
}

// Helper function to shade a color
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1,3), 16);
    let G = parseInt(color.substring(3,5), 16);
    let B = parseInt(color.substring(5,7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    const RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

// Initialize theme color when script loads
applyThemeColor();

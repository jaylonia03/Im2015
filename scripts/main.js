// Store prediction tool password in localStorage
const PREDICTION_TOOL_PASSWORD_KEY = 'predictionToolPassword';
const DEFAULT_TOOL_PASSWORD = 'predict123'; // Default password

// Initialize prediction tool password if not set
if (!localStorage.getItem(PREDICTION_TOOL_PASSWORD_KEY)) {
    localStorage.setItem(PREDICTION_TOOL_PASSWORD_KEY, DEFAULT_TOOL_PASSWORD);
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
        isEven: result % 2 === 0,
        steps: `(${num} × 2) - (${String(num).split('').join(' + ')}) = ${result}`
    };
}

// Function to format a number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to check if user is on the admin page
function isAdminPage() {
    return window.location.pathname.includes('admin.html');
}

// Function to check if user is on the prediction page
function isPredictionPage() {
    return window.location.pathname.includes('prediction.html');
}

// Function to check if user is on the landing page
function isLandingPage() {
    return window.location.pathname === '/' || window.location.pathname.includes('index.html');
}

// Function to simulate getting usage statistics
function getUsageStatistics() {
    return {
        totalCalculations: localStorage.getItem('totalCalculations') || 0,
        lastCalculation: localStorage.getItem('lastCalculation') || 'Never'
    };
}

// Function to update usage statistics
function updateUsageStatistics() {
    // Get current total
    let total = parseInt(localStorage.getItem('totalCalculations')) || 0;
    total++;
    
    // Update total
    localStorage.setItem('totalCalculations', total);
    
    // Update last calculation time
    const now = new Date();
    localStorage.setItem('lastCalculation', now.toLocaleString());
}

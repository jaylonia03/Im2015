// Password protection for the prediction tool
document.addEventListener('DOMContentLoaded', () => {
    // Default prediction tool password (admin can change this)
    let predictionPassword = "im2015predict";
    
    // Check if we're on the password gate page
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const enteredPassword = document.getElementById('toolPassword').value;
            
            if (enteredPassword === predictionPassword) {
                // Store session flag (simple implementation without backend)
                sessionStorage.setItem('predictionToolAuthenticated', 'true');
                window.location.href = 'tool.html';
            } else {
                alert('Incorrect password. Please try again.');
            }
        });
    }
    
    // Check if we're on the tool page and require authentication
    if (window.location.pathname.includes('tool.html')) {
        const isAuthenticated = sessionStorage.getItem('predictionToolAuthenticated') === 'true';
        
        if (!isAuthenticated) {
            window.location.href = 'prediction.html';
        }
    }
    
    // Prediction tool calculation
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const currentNumber = parseInt(document.getElementById('currentNumber').value);
            
            if (isNaN(currentNumber)) {
                alert('Please enter a valid number');
                return;
            }
            
            // Calculate the result (confidential formula)
            const sumOfDigits = String(currentNumber).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
            const result = (currentNumber * 2) - sumOfDigits;
            
            // Display the result
            const resultValue = document.getElementById('resultValue');
            const resultType = document.getElementById('resultType');
            const analysisText = document.getElementById('analysisText');
            
            resultValue.textContent = result;
            
            if (result % 2 === 0) {
                resultType.textContent = 'EVEN RESULT';
                resultType.style.background = 'linear-gradient(to right, #4facfe, #00f2fe)';
                analysisText.textContent = `The prediction result ${result} is an even number. This suggests a balanced outcome with equal potential for variation.`;
            } else {
                resultType.textContent = 'ODD RESULT';
                resultType.style.background = 'linear-gradient(to right, #f83600, #f9d423)';
                analysisText.textContent = `The prediction result ${result} is an odd number. This indicates a more dynamic outcome with potential for significant variation.`;
            }
            
            // Add animation
            resultValue.style.animation = 'none';
            setTimeout(() => {
                resultValue.style.animation = 'fadeIn 0.5s ease-out';
            }, 10);
        });
    }
    
    // Check for password in URL (for admin testing)
    const urlParams = new URLSearchParams(window.location.search);
    const debugPassword = urlParams.get('debug_pwd');
    if (debugPassword === 'dev123') {
        sessionStorage.setItem('predictionToolAuthenticated', 'true');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Apply theme color
    applyThemeColor();
    
    // Check maintenance mode
    if (isMaintenanceMode()) {
        alert('The prediction tool is currently under maintenance. Please try again later.');
        window.location.href = 'index.html';
        return;
    }
    
    // Check password protection
    const passwordProtected = isPasswordProtected();
    
    // DOM Elements
    const passwordOverlay = document.getElementById('passwordOverlay');
    const predictionMain = document.getElementById('predictionMain');
    const toolPasswordInput = document.getElementById('toolPassword');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const passwordError = document.getElementById('passwordError');
    const currentNumberInput = document.getElementById('currentNumber');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultSection = document.getElementById('resultSection');
    const resultValue = document.getElementById('resultValue');
    const resultType = document.getElementById('resultType');
    const typeBadge = document.getElementById('typeBadge');
    const copyResultBtn = document.getElementById('copyResultBtn');
    const newCalculationBtn = document.getElementById('newCalculationBtn');
    
    // Check if password is already verified in this session
    const passwordVerified = !passwordProtected || sessionStorage.getItem('passwordVerified') === 'true';

    if (passwordVerified) {
        passwordOverlay.style.display = 'none';
        predictionMain.style.display = 'block';
    } else {
        passwordOverlay.style.display = 'flex';
        predictionMain.style.display = 'none';
    }

    // Handle password submission
    submitPasswordBtn.addEventListener('click', function() {
        const enteredPassword = toolPasswordInput.value.trim();
        const correctPassword = getToolPassword();

        if (enteredPassword === correctPassword) {
            // Password is correct
            sessionStorage.setItem('passwordVerified', 'true');
            passwordOverlay.style.display = 'none';
            predictionMain.style.display = 'block';
        } else {
            // Password is incorrect
            passwordError.textContent = 'Incorrect password. Please try again.';
            toolPasswordInput.focus();
        }
    });

    // Also allow Enter key to submit password
    toolPasswordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitPasswordBtn.click();
        }
    });

    // Handle calculation
    calculateBtn.addEventListener('click', function() {
        const currentNumber = currentNumberInput.value.trim();
        
        if (!currentNumber) {
            alert('Please enter a current number');
            currentNumberInput.focus();
            return;
        }
        
        if (isNaN(currentNumber)) {
            alert('Please enter a valid number');
            currentNumberInput.focus();
            return;
        }
        
        // Perform calculation
        const calculation = calculatePrediction(currentNumber);
        
        // Display results
        resultValue.textContent = formatNumber(calculation.result);
        typeBadge.textContent = calculation.isEven ? 'EVEN' : 'ODD';
        typeBadge.className = 'type-badge ' + (calculation.isEven ? 'even' : 'odd');
        
        // Show result container
        resultSection.style.display = 'block';
        
        // Update usage statistics
        updateUsageStatistics();
        
        // Scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Also allow Enter key to calculate
    currentNumberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateBtn.click();
        }
    });
    
    // Copy result to clipboard
    copyResultBtn.addEventListener('click', function() {
        const result = resultValue.textContent;
        if (result !== '--') {
            navigator.clipboard.writeText(result)
                .then(() => {
                    const originalText = copyResultBtn.innerHTML;
                    copyResultBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        copyResultBtn.innerHTML = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        }
    });
    
    // New calculation button
    newCalculationBtn.addEventListener('click', function() {
        currentNumberInput.value = '';
        resultSection.style.display = 'none';
        currentNumberInput.focus();
    });
    
    // Focus on input when page loads
    if (passwordVerified) {
        currentNumberInput.focus();
    } else {
        toolPasswordInput.focus();
    }
});

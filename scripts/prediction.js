document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const passwordPrompt = document.getElementById('passwordPrompt');
    const predictionContent = document.getElementById('predictionContent');
    const toolPasswordInput = document.getElementById('toolPassword');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const passwordError = document.getElementById('passwordError');
    const currentNumberInput = document.getElementById('currentNumber');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultValue = document.getElementById('resultValue');
    const resultType = document.getElementById('resultType');
    const typeBadge = document.getElementById('typeBadge');
    const calculationSteps = document.getElementById('calculationSteps');
    const stepsText = document.getElementById('stepsText');

    // Check if password is already verified in this session
    const passwordVerified = sessionStorage.getItem('passwordVerified') === 'true';

    if (passwordVerified) {
        passwordPrompt.style.display = 'none';
        predictionContent.style.display = 'block';
    } else {
        passwordPrompt.style.display = 'flex';
        predictionContent.style.display = 'none';
    }

    // Handle password submission
    submitPasswordBtn.addEventListener('click', function() {
        const enteredPassword = toolPasswordInput.value.trim();
        const correctPassword = getToolPassword();

        if (enteredPassword === correctPassword) {
            // Password is correct
            sessionStorage.setItem('passwordVerified', 'true');
            passwordPrompt.style.display = 'none';
            predictionContent.style.display = 'block';
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
        
        // Style based on even/odd
        if (calculation.isEven) {
            typeBadge.className = 'type-badge even';
            document.querySelector('.result-card').style.background = 'linear-gradient(135deg, #00b894, #55efc4)';
        } else {
            typeBadge.className = 'type-badge odd';
            document.querySelector('.result-card').style.background = 'linear-gradient(135deg, #d63031, #e17055)';
        }
        
        // Show calculation steps
        ##stepsT?ext.textCon?tent = calcu?lation.steps;##
        
        // Show result container
        resultContainer.style.display = 'block';
        
        // Update usage statistics
        updateUsageStatistics();
        
        // Scroll to results
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Also allow Enter key to calculate
    currentNumberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateBtn.click();
        }
    });
});

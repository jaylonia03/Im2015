document.addEventListener('DOMContentLoaded', function() {
    // Check if authenticated
    if (sessionStorage.getItem('prediction_authenticated') !== 'true') {
        window.location.href = 'predict.html';
        return;
    }

    // Elements
    const currentNumberInput = document.getElementById('currentNumber');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultValue = document.getElementById('resultValue');
    const resultType = document.getElementById('resultType');
    const inputNumber = document.getElementById('inputNumber');
    const sumDigits = document.getElementById('sumDigits');
    const calculation = document.getElementById('calculation');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');

    // History array
    let calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];

    // Display history
    function displayHistory() {
        if (calculationHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">No calculations yet</div>';
            return;
        }

        historyList.innerHTML = '';
        calculationHistory.slice().reverse().forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <span class="history-number">${item.input}</span>
                <span class="history-result">${item.result} (${item.type})</span>
            `;
            historyList.appendChild(historyItem);
        });
    }

    // Calculate sum of digits
    function sumOfDigits(number) {
        return String(number).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }

    // Calculate prediction
    function calculatePrediction(number) {
        const sumDigits = sumOfDigits(number);
        const result = (number * 2) - sumDigits;
        return {
            result: result,
            sumDigits: sumDigits,
            type: result % 2 === 0 ? 'Even' : 'Odd'
        };
    }

    // Update UI with result
    function updateResultUI(input, resultData) {
        resultValue.textContent = resultData.result;
        resultType.textContent = resultData.type;
        inputNumber.textContent = input;
        sumDigits.textContent = resultData.sumDigits;
        calculation.textContent = `(${input} × 2) - ${resultData.sumDigits} = ${resultData.result}`;
        
        // Add to history
        calculationHistory.push({
            input: input,
            result: resultData.result,
            type: resultData.type,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 20 items
        if (calculationHistory.length > 20) {
            calculationHistory = calculationHistory.slice(-20);
        }
        
        // Save to localStorage
        localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
        
        // Update history display
        displayHistory();
    }

    // Calculate button click
    calculateBtn.addEventListener('click', function() {
        const number = parseInt(currentNumberInput.value);
        
        if (isNaN(number)) {
            alert('Please enter a valid number');
            return;
        }
        
        const resultData = calculatePrediction(number);
        updateResultUI(number, resultData);
    });

    // Clear history
    clearHistoryBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all calculation history?')) {
            calculationHistory = [];
            localStorage.removeItem('calculationHistory');
            displayHistory();
        }
    });

    // Allow Enter key to trigger calculation
    currentNumberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateBtn.click();
        }
    });

    // Initialize
    displayHistory();
});

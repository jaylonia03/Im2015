// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the landing page
    if (document.querySelector('.landing-container')) {
        initLandingPage();
    }
    
    // Check if we're on the prediction page
    if (document.querySelector('.prediction-container')) {
        initPredictionPage();
    }
});

// Landing Page Functions
function initLandingPage() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6a11cb"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6a11cb",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Handle predict now button click
    const predictBtn = document.getElementById('predictBtn');
    if (predictBtn) {
        predictBtn.addEventListener('click', function() {
            // Store that user has seen the landing page
            localStorage.setItem('hasSeenLanding', 'true');
            window.location.href = 'prediction.html';
        });
    }
}

// Prediction Page Functions
function initPredictionPage() {
    // Check if password is required
    checkPasswordRequirement();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize calculation functionality
    initCalculator();
}

function checkPasswordRequirement() {
    // Check if password is set in localStorage
    const toolPassword = localStorage.getItem('toolPassword') || 'default123';
    const passwordModal = document.getElementById('passwordModal');
    const submitPassword = document.getElementById('submitPassword');
    const passwordError = document.getElementById('passwordError');
    
    // Show modal if password is required
    passwordModal.style.display = 'flex';
    
    submitPassword.addEventListener('click', function() {
        const enteredPassword = document.getElementById('toolPassword').value;
        
        if (enteredPassword === toolPassword) {
            passwordModal.style.display = 'none';
            // Store session (valid for this browser session)
            sessionStorage.setItem('passwordValid', 'true');
        } else {
            passwordError.textContent = 'Incorrect password. Please try again.';
        }
    });
    
    // Also allow Enter key to submit
    document.getElementById('toolPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitPassword.click();
        }
    });
}

function initCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    const currentNumberInput = document.getElementById('currentNumber');
    const resultValue = document.getElementById('resultValue');
    const resultType = document.getElementById('resultType');
    const historyList = document.getElementById('historyList');
    
    // Load calculation history from localStorage
    let calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    updateHistoryList(calculationHistory);
    
    calculateBtn.addEventListener('click', function() {
        const currentNumber = parseInt(currentNumberInput.value);
        
        if (isNaN(currentNumber)) {
            alert('Please enter a valid number');
            return;
        }
        
        // Calculate the result (using the secret formula)
        const result = calculateResult(currentNumber);
        
        // Display the result
        resultValue.textContent = result;
        
        // Determine if result is odd or even
        const isEven = result % 2 === 0;
        resultType.textContent = isEven ? 'Even' : 'Odd';
        resultType.style.color = isEven ? '#28a745' : '#dc3545';
        
        // Add to history
        const calculation = {
            input: currentNumber,
            result: result,
            type: isEven ? 'Even' : 'Odd',
            timestamp: new Date().toLocaleString()
        };
        
        calculationHistory.unshift(calculation);
        if (calculationHistory.length > 10) {
            calculationHistory = calculationHistory.slice(0, 10);
        }
        
        localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
        updateHistoryList(calculationHistory);
        
        // Increment total calculations count (for admin panel)
        incrementTotalCalculations();
    });
    
    // Also allow Enter key to calculate
    currentNumberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateBtn.click();
        }
    });
}

function calculateResult(number) {
    // The secret formula: (Current Number × 2) - (Sum of Digits of Current Number)
    const sumOfDigits = String(number).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    return (number * 2) - sumOfDigits;
}

function updateHistoryList(history) {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<li class="empty-history">No calculations yet</li>';
        return;
    }
    
    history.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="history-input">${item.input} → ${item.result}</span>
            <span class="history-type ${item.type.toLowerCase()}">${item.type}</span>
            <span class="history-time">${item.timestamp}</span>
        `;
        historyList.appendChild(li);
    });
}

function incrementTotalCalculations() {
    let total = parseInt(localStorage.getItem('totalCalculations')) || 0;
    total++;
    localStorage.setItem('totalCalculations', total.toString());
}

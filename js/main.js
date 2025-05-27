// Store prediction password in localStorage
const PREDICTION_PASSWORD_KEY = 'im2015_prediction_password';
const DEFAULT_PREDICTION_PASSWORD = 'predict123'; // Initial password

// Initialize prediction password if not set
if (!localStorage.getItem(PREDICTION_PASSWORD_KEY)) {
    localStorage.setItem(PREDICTION_PASSWORD_KEY, DEFAULT_PREDICTION_PASSWORD);
}

// Password gate functionality
if (document.getElementById('passwordForm')) {
    document.getElementById('passwordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const enteredPassword = document.getElementById('toolPassword').value;
        const correctPassword = localStorage.getItem(PREDICTION_PASSWORD_KEY);
        
        if (enteredPassword === correctPassword) {
            // Store session flag
            sessionStorage.setItem('prediction_authenticated', 'true');
            window.location.href = 'tool.html';
        } else {
            document.getElementById('errorMessage').textContent = 'Incorrect password. Please try again.';
            document.getElementById('errorMessage').style.display = 'block';
        }
    });
}

// Check authentication for tool page
if (window.location.pathname.includes('tool.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        if (sessionStorage.getItem('prediction_authenticated') !== 'true') {
            window.location.href = 'predict.html';
        }
    });
}

// Landing page animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate features on scroll
    const features = document.querySelectorAll('.feature');
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'all 0.5s ease';
        featureObserver.observe(feature);
    });
    
    // Glowing circle animation
    const glowingCircle = document.querySelector('.glowing-circle');
    if (glowingCircle) {
        setInterval(() => {
            glowingCircle.style.opacity = Math.random() * 0.3 + 0.5;
        }, 2000);
    }
});

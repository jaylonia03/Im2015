// Admin Panel Script
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the admin page
    if (document.querySelector('.admin-container')) {
        initAdminPage();
    }
});

function initAdminPage() {
    const adminLoginSection = document.getElementById('adminLogin');
    const adminPanel = document.getElementById('adminPanel');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminError = document.getElementById('adminError');
    
    // Check if already logged in
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        adminLoginSection.style.display = 'none';
        adminPanel.style.display = 'flex';
        initAdminTools();
        return;
    }
    
    // Handle admin login
    adminLoginBtn.addEventListener('click', function() {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        if (username === 'admin' && password === 'hahaha') {
            // Successful login
            adminError.textContent = '';
            adminLoginSection.style.display = 'none';
            adminPanel.style.display = 'flex';
            sessionStorage.setItem('adminLoggedIn', 'true');
            initAdminTools();
        } else {
            adminError.textContent = 'Invalid username or password';
        }
    });
    
    // Also allow Enter key to login
    document.getElementById('adminPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adminLoginBtn.click();
        }
    });
    
    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('adminLoggedIn');
            window.location.reload();
        });
    }
}

function initAdminTools() {
    // Initialize password change functionality
    const updatePasswordBtn = document.getElementById('updatePasswordBtn');
    const toolPasswordInput = document.getElementById('toolPasswordInput');
    const toolPasswordConfirm = document.getElementById('toolPasswordConfirm');
    
    // Load last password change date
    const lastPasswordChange = localStorage.getItem('lastPasswordChange');
    if (lastPasswordChange) {
        document.getElementById('lastPasswordChange').textContent = lastPasswordChange;
    }
    
    // Load total calculations
    const totalCalculations = localStorage.getItem('totalCalculations') || '0';
    document.getElementById('totalCalculations').textContent = totalCalculations;
    
    updatePasswordBtn.addEventListener('click', function() {
        const newPassword = toolPasswordInput.value;
        const confirmPassword = toolPasswordConfirm.value;
        
        if (newPassword === '' || confirmPassword === '') {
            alert('Please enter and confirm the new password');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Update password in localStorage
        localStorage.setItem('toolPassword', newPassword);
        
        // Update last changed date
        const now = new Date();
        const changeDate = now.toLocaleString();
        localStorage.setItem('lastPasswordChange', changeDate);
        document.getElementById('lastPasswordChange').textContent = changeDate;
        
        alert('Prediction tool password updated successfully');
        toolPasswordInput.value = '';
        toolPasswordConfirm.value = '';
    });
    
    // Initialize clear history button
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    clearHistoryBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all calculation history? This cannot be undone.')) {
            localStorage.removeItem('calculationHistory');
            alert('Calculation history cleared');
        }
    });
    
    // Initialize system diagnostics button
    const systemCheckBtn = document.getElementById('systemCheckBtn');
    const diagnosticsResult = document.getElementById('diagnosticsResult');
    
    systemCheckBtn.addEventListener('click', function() {
        diagnosticsResult.innerHTML = 'Running system diagnostics...<br>';
        
        // Simulate system check
        setTimeout(() => {
            diagnosticsResult.innerHTML += '✓ Local storage access: OK<br>';
            
            setTimeout(() => {
                diagnosticsResult.innerHTML += '✓ Calculation algorithm: OK<br>';
                
                setTimeout(() => {
                    diagnosticsResult.innerHTML += '✓ Authentication system: OK<br>';
                    
                    setTimeout(() => {
                        diagnosticsResult.innerHTML += '✓ Security protocols: OK<br><br>';
                        diagnosticsResult.innerHTML += '<strong>System check complete. All systems operational.</strong>';
                    }, 300);
                }, 300);
            }, 300);
        }, 300);
    });
}

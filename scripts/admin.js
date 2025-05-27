document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginPanel = document.getElementById('loginPanel');
    const adminContent = document.getElementById('adminContent');
    const adminUsernameInput = document.getElementById('adminUsername');
    const adminPasswordInput = document.getElementById('adminPassword');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLoginError = document.getElementById('adminLoginError');
    const logoutBtn = document.getElementById('logoutBtn');
    const currentToolPassword = document.getElementById('currentToolPassword');
    const newToolPasswordInput = document.getElementById('newToolPassword');
    const confirmToolPasswordInput = document.getElementById('confirmToolPassword');
    const updatePasswordBtn = document.getElementById('updatePasswordBtn');
    const passwordUpdateSuccess = document.getElementById('passwordUpdateSuccess');
    const passwordUpdateError = document.getElementById('passwordUpdateError');
    const totalCalculations = document.getElementById('totalCalculations');
    const lastCalculation = document.getElementById('lastCalculation');
    const maintenanceMode = document.getElementById('maintenanceMode');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');

    // Admin credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'hahaha';

    // Check if admin is already logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

    if (isLoggedIn) {
        loginPanel.style.display = 'none';
        adminContent.style.display = 'block';
        loadAdminData();
    } else {
        loginPanel.style.display = 'flex';
        adminContent.style.display = 'none';
    }

    // Handle admin login
    adminLoginBtn.addEventListener('click', function() {
        const username = adminUsernameInput.value.trim();
        const password = adminPasswordInput.value.trim();

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Login successful
            sessionStorage.setItem('adminLoggedIn', 'true');
            loginPanel.style.display = 'none';
            adminContent.style.display = 'block';
            loadAdminData();
        } else {
            // Login failed
            adminLoginError.textContent = 'Invalid username or password';
            adminPasswordInput.focus();
        }
    });

    // Also allow Enter key to login
    adminUsernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adminLoginBtn.click();
        }
    });

    adminPasswordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adminLoginBtn.click();
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin.html';
    });

    // Load admin data
    function loadAdminData() {
        // Show current tool password (masked)
        const currentPassword = getToolPassword();
        currentToolPassword.textContent = '*'.repeat(currentPassword.length);
        
        // Load usage statistics
        const stats = getUsageStatistics();
        totalCalculations.textContent = stats.totalCalculations;
        lastCalculation.textContent = stats.lastCalculation;
        
        // Load settings
        maintenanceMode.checked = localStorage.getItem('maintenanceMode') === 'true';
        darkModeToggle.checked = localStorage.getItem('darkMode') !== 'false';
        
        // Apply dark mode if enabled
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
        }
    }

    // Handle password update
    updatePasswordBtn.addEventListener('click', function() {
        const newPassword = newToolPasswordInput.value.trim();
        const confirmPassword = confirmToolPasswordInput.value.trim();
        
        if (!newPassword || !confirmPassword) {
            passwordUpdateError.textContent = 'Please enter and confirm the new password';
            return;
        }
        
        if (newPassword !== confirmPassword) {
            passwordUpdateError.textContent = 'Passwords do not match';
            return;
        }
        
        if (newPassword.length < 4) {
            passwordUpdateError.textContent = 'Password must be at least 4 characters';
            return;
        }
        
        // Update password
        updateToolPassword(newPassword);
        
        // Show success message
        passwordUpdateError.textContent = '';
        passwordUpdateSuccess.textContent = 'Prediction tool password updated successfully!';
        
        // Clear inputs
        newToolPasswordInput.value = '';
        confirmToolPasswordInput.value = '';
        
        // Update displayed password
        currentToolPassword.textContent = '*'.repeat(newPassword.length);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            passwordUpdateSuccess.textContent = '';
        }, 3000);
    });

    // Handle settings save
    saveSettingsBtn.addEventListener('click', function() {
        // Save maintenance mode
        localStorage.setItem('maintenanceMode', maintenanceMode.checked);
        
        // Save dark mode
        localStorage.setItem('darkMode', darkModeToggle.checked);
        
        // Apply dark mode
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Show success message (you could add this if you want)
        alert('Settings saved successfully!');
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
});

// Add dark mode styles if enabled
if (localStorage.getItem('darkMode') !== 'false') {
    document.addEventListener('DOMContentLoaded', function() {
        const style = document.createElement('style');
        style.textContent = `
            .dark-mode {
                background-color: #1a1a1a;
                color: #f0f0f0;
            }
            
            .dark-mode .tool-card,
            .dark-mode .login-box,
            .dark-mode .prediction-form {
                background-color: #2d2d2d;
                color: #f0f0f0;
            }
            
            .dark-mode p,
            .dark-mode .calculation-steps {
                color: #b0b0b0;
            }
            
            .dark-mode input {
                background-color: #3d3d3d;
                color: #f0f0f0;
                border-color: #4d4d4d;
            }
            
            .dark-mode .calculation-steps {
                background-color: #252525;
                border-left-color: var(--primary-color);
            }
        `;
        document.head.appendChild(style);
    });
}

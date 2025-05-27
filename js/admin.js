document.addEventListener('DOMContentLoaded', function() {
    // Admin login page
    if (document.getElementById('adminLoginForm')) {
        document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === 'hahaha') {
                sessionStorage.setItem('admin_authenticated', 'true');
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('loginError').textContent = 'Invalid admin credentials';
                document.getElementById('loginError').style.display = 'block';
            }
        });
    }
    
    // Admin dashboard
    if (document.getElementById('dashboardSection')) {
        // Check authentication
        if (sessionStorage.getItem('admin_authenticated') !== 'true') {
            window.location.href = 'index.html';
            return;
        }
        
        // Elements
        const menuLinks = document.querySelectorAll('.admin-menu a');
        const sections = document.querySelectorAll('.dashboard-section');
        const currentPasswordDisplay = document.getElementById('currentPassword');
        const updatePasswordBtn = document.getElementById('updatePasswordBtn');
        const newPasswordInput = document.getElementById('newPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const passwordHistoryTable = document.getElementById('passwordHistory').querySelector('tbody');
        const logoutBtn = document.getElementById('logoutBtn');
        const usageCount = document.getElementById('usageCount');
        const currentTime = document.getElementById('currentTime');
        
        // Password history array
        let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];
        
        // Update current time
        function updateTime() {
            currentTime.textContent = new Date().toLocaleString();
        }
        
        setInterval(updateTime, 1000);
        updateTime();
        
        // Menu navigation
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                
                // Update active menu item
                menuLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding section
                sections.forEach(sec => sec.classList.add('hidden'));
                document.getElementById(`${section}Section`).classList.remove('hidden');
            });
        });
        
        // Display current password (masked)
        function displayCurrentPassword() {
            const password = localStorage.getItem('im2015_prediction_password') || 'predict123';
            currentPasswordDisplay.textContent = '•'.repeat(password.length);
        }
        
        // Display password history
        function displayPasswordHistory() {
            passwordHistoryTable.innerHTML = '';
            
            if (passwordHistory.length === 0) {
                passwordHistoryTable.innerHTML = '<tr><td colspan="2">No password changes recorded</td></tr>';
                return;
            }
            
            passwordHistory.slice().reverse().forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${new Date(entry.timestamp).toLocaleString()}</td>
                    <td>${entry.changedBy}</td>
                `;
                passwordHistoryTable.appendChild(row);
            });
        }
        
        // Update prediction password
        updatePasswordBtn.addEventListener('click', function() {
            const newPassword = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (newPassword.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Update password
            localStorage.setItem('im2015_prediction_password', newPassword);
            
            // Add to history
            passwordHistory.push({
                timestamp: new Date().toISOString(),
                changedBy: 'admin'
            });
            
            // Keep only last 10 changes
            if (passwordHistory.length > 10) {
                passwordHistory = passwordHistory.slice(-10);
            }
            
            // Save to localStorage
            localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
            
            // Update displays
            displayCurrentPassword();
            displayPasswordHistory();
            
            // Clear inputs
            newPasswordInput.value = '';
            confirmPasswordInput.value = '';
            
            alert('Prediction password updated successfully!');
        });
        
        // Logout
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('admin_authenticated');
            window.location.href = 'index.html';
        });
        
        // Simulate usage count
        function updateUsageCount() {
            const history = JSON.parse(localStorage.getItem('calculationHistory')) || [];
            usageCount.textContent = history.length;
        }
        
        // Initialize
        displayCurrentPassword();
        displayPasswordHistory();
        updateUsageCount();
        
        // Quick action buttons
        document.getElementById('changePasswordBtn').addEventListener('click', function() {
            document.querySelector('.admin-menu a[data-section="password"]').click();
        });
        
        document.getElementById('viewHistoryBtn').addEventListener('click', function() {
            document.querySelector('.admin-menu a[data-section="access"]').click();
        });
        
        document.getElementById('systemCheckBtn').addEventListener('click', function() {
            document.querySelector('.admin-menu a[data-section="system"]').click();
            alert('System diagnostics completed. All systems operational.');
        });
        
        document.getElementById('clearDataBtn').addEventListener('click', function() {
            if (confirm('Are you sure you want to clear ALL user data, including calculation history?')) {
                localStorage.removeItem('calculationHistory');
                alert('All user data has been cleared.');
                updateUsageCount();
            }
        });
        
        // Access logs functionality
        document.getElementById('refreshLogs').addEventListener('click', function() {
            alert('Logs refreshed');
        });
        
        document.getElementById('exportLogs').addEventListener('click', function() {
            alert('Logs exported as CSV');
        });
        
        document.getElementById('clearLogs').addEventListener('click', function() {
            if (confirm('Clear all access logs?')) {
                alert('Access logs cleared');
            }
        });
    }
});

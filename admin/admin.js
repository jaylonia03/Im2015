// Admin panel JavaScript (for future enhancements)
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin panel loaded');
    
    // You can add more admin panel interactions here
    // For example, toggles, additional validation, etc.
    
    // Simple password strength indicator for the prediction tool password change
    const newPasswordInput = document.getElementById('new_password');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', () => {
            // Could add password strength meter here
        });
    }
});

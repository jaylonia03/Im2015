<?php
// Simple PHP admin panel (no database)
session_start();

$admin_username = "admin";
$admin_password = "hahaha";

// Password file for prediction tool
$password_file = "prediction_password.txt";

// Check if password file exists, if not create it
if (!file_exists($password_file)) {
    file_put_contents($password_file, "im2015predict");
}

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    if ($_POST['username'] === $admin_username && $_POST['password'] === $admin_password) {
        $_SESSION['admin_logged_in'] = true;
    } else {
        $login_error = "Invalid credentials";
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

// Handle password change
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['change_password'])) {
    if (isset($_SESSION['admin_logged_in'])) {
        $new_password = $_POST['new_password'];
        file_put_contents($password_file, $new_password);
        $password_success = "Prediction tool password updated successfully!";
    }
}

// Get current prediction password
$current_prediction_password = file_get_contents($password_file);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel | IM2015 Prediction Tool</title>
    <link rel="stylesheet" href="../admin/admin-style.css">
</head>
<body>
    <div class="admin-container">
        <?php if (!isset($_SESSION['admin_logged_in'])): ?>
            <!-- Login Form -->
            <div class="login-box">
                <h2>Admin Login</h2>
                <?php if (isset($login_error)): ?>
                    <div class="alert error"><?php echo $login_error; ?></div>
                <?php endif; ?>
                <form method="POST">
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" name="login">LOGIN</button>
                </form>
            </div>
        <?php else: ?>
            <!-- Admin Dashboard -->
            <div class="admin-header">
                <h1>IM2015 Prediction Tool <span>Admin Panel</span></h1>
                <a href="?logout" class="logout-btn">Logout</a>
            </div>
            
            <div class="admin-stats">
                <div class="stat-card">
                    <h3>Prediction Tool Password</h3>
                    <p>Current: <strong><?php echo htmlspecialchars($current_prediction_password); ?></strong></p>
                    
                    <form method="POST" class="password-form">
                        <div class="input-group">
                            <label for="new_password">New Password</label>
                            <input type="text" id="new_password" name="new_password" required>
                        </div>
                        <button type="submit" name="change_password">UPDATE PASSWORD</button>
                    </form>
                    
                    <?php if (isset($password_success)): ?>
                        <div class="alert success"><?php echo $password_success; ?></div>
                    <?php endif; ?>
                </div>
                
                <div class="stat-card">
                    <h3>System Information</h3>
                    <p><strong>Version:</strong> 2.4.1</p>
                    <p><strong>Last Updated:</strong> <?php echo date("Y-m-d H:i:s"); ?></p>
                    <p><strong>Algorithm:</strong> IM2015 Premium</p>
                </div>
            </div>
            
            <div class="admin-tools">
                <h2>Administrative Tools</h2>
                
                <div class="tools-grid">
                    <div class="tool-card">
                        <h3>Access Logs</h3>
                        <p>View prediction tool access attempts</p>
                        <button class="tool-btn" disabled>Coming Soon</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Usage Statistics</h3>
                        <p>View prediction tool usage patterns</p>
                        <button class="tool-btn" disabled>Coming Soon</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Result Analysis</h3>
                        <p>Analyze prediction results</p>
                        <button class="tool-btn" disabled>Coming Soon</button>
                    </div>
                </div>
            </div>
            
            <div class="admin-footer">
                <p>© IM2015 Premium Prediction Tool | Admin Panel</p>
                <p class="warning">Restricted access. Unauthorized use prohibited.</p>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>

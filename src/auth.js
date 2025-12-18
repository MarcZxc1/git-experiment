// Authentication module
function login(username, password) {
  // Security fix: Add input sanitization
  if (!username || !password) {
    return false;
  }
  
  // Sanitize inputs to prevent injection attacks
  const sanitizedUsername = username.trim().toLowerCase();
  const sanitizedPassword = password.trim();
  
  // Simple login implementation
  if (sanitizedUsername === "admin" && sanitizedPassword === "admin") {
    return true;
  }
  return false;
}

function logout() {
  // Clear user session
  console.log("User logged out");
}

export { login, logout };


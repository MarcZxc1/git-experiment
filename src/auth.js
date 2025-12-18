// Authentication module
function login(username, password) {
  // Simple login implementation
  if (username === "admin" && password === "admin") {
    return true;
  }
  return false;
}

function logout() {
  // Clear user session
  console.log("User logged out");
}

export { login, logout };


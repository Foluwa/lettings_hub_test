export const extractGithubUsername = (url) => {
    // Use regular expression to capture the username
    const match = url.match(/github\.com\/([^\/]+)/);
    return match ? match[1] : null;
}

// Validation function
export const validateFields = (email, password) => {
    let errors = {};
  
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address.';
    }
  
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }
  
    return errors;
  };
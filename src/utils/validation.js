/**
 * Validation Utility Functions
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export const isValidPassword = (password) => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }
  return { isValid: true, message: '' };
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {object} Validation result
 */
export const isValidName = (name) => {
  if (!name || name.trim().length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters' };
  }
  return { isValid: true, message: '' };
};

/**
 * Validate form data
 * @param {object} formData - Form data to validate
 * @param {array} requiredFields - Array of required field names
 * @returns {object} Validation result with errors object
 */
export const validateForm = (formData, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = 'This field is required';
    }
  });
  
  // Validate email if present
  if (formData.email && !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Validate password if present
  if (formData.password) {
    const passwordValidation = isValidPassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message;
    }
  }
  
  // Validate name if present
  if (formData.name) {
    const nameValidation = isValidName(formData.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.message;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
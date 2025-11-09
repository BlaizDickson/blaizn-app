import React from 'react';

/**
 * Reusable Button Component
 * 
 * @param {string} variant - Style variant: 'primary', 'secondary', 'outline'
 * @param {string} size - Size: 'sm', 'md', 'lg'
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {node} children - Button content
 */
function Button({ 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  children,
  type = 'button'
}) {
  
  // Base styles for all buttons
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blaizn-orange to-blaizn-red text-white hover:shadow-lg focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'border-2 border-blaizn-orange text-blaizn-orange hover:bg-orange-50 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed'
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Combine all styles
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
import React from 'react';

/**
 * Reusable Input Component
 * 
 * @param {string} type - Input type: 'text', 'email', 'password', etc.
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {boolean} required - Required field
 * @param {string} error - Error message to display
 * @param {string} label - Input label
 * @param {string} className - Additional CSS classes
 */
function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error = '',
  label = '',
  className = '',
  name = ''
}) {
  
  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Field */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      
      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

export default Input;
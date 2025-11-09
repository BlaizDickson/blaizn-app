import React from 'react';

/**
 * Reusable Card Component
 * 
 * @param {node} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} hover - Enable hover effect
 */
function Card({ children, className = '', hover = false }) {
  
  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-200 ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}

export default Card;
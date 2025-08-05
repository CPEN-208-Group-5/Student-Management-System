'use client'

interface ButtonProps {
  value: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'green' | 'blue';
}

export default function Button({ value, disabled = false, type = 'submit', variant = 'green' }: ButtonProps) {
  const getButtonClasses = () => {
    if (disabled) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }
    
    if (variant === 'blue') {
      return 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
    }
    
    return 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2';
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${getButtonClasses()}`}
    >
      {value}
    </button>
  );
} 
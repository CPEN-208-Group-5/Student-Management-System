'use client'

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  variant?: 'green' | 'blue';
}

export default function Input({ label, type, name, placeholder, value, onChange, required = false, variant = 'green' }: InputProps) {
  const getFocusClasses = () => {
    return variant === 'blue' 
      ? 'focus:ring-blue-500' 
      : 'focus:ring-green-500';
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${getFocusClasses()} focus:border-transparent transition duration-200`}
      />
    </div>
  );
} 
import React from 'react';

type Option = {
    value: string;
    label: string;
};

interface FormFieldProps {
    id: string;
    type: 'text' | 'email' | 'select' | 'radio' | 'textarea';
    label: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    options?: Option[];
    pattern?: string;
    validationMessage?: string;
}

const FormField: React.FC<FormFieldProps> = ({
    id,
    type,
    label,
    placeholder,
    required,
    value,
    onChange,
    options,
    pattern,
    validationMessage,
}) => {
    return (
        <div className="mb-4 ">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {type === 'text' || type === 'email' ? (
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={onChange}
                    pattern={pattern}
                    title={validationMessage}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            ) : type === 'select' ? (
                <select
                    id={id}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
                >
                    <option value="" className="text-gray-500">Select an option</option>
                    {options?.map((option) => (
                        <option key={option.value} value={option.value} className="text-red-500">
                            {option.label}
                        </option>
                    ))}
                </select>

            ) : type === 'radio' ? (
                options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                        <input
                            id={id}
                            type="radio"
                            name={id}
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                            required={required}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 "
                        />
                        <label className="text-gray-700 dark:text-white">{option.label}</label>
                    </div>
                ))
            ) : type === 'textarea' ? (
                <textarea
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            ) : null}
        </div>
    );
};

export default FormField;

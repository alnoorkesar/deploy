'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                        {label}
                        {props.required && <span className="text-[#D97706] ml-1">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-3 rounded-lg
            bg-white border-2 border-[#1F2937]/10
            text-[#1F2937] placeholder:text-[#374151]/50
            focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-[#374151]/70">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, error, helperText, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                        {label}
                        {props.required && <span className="text-[#D97706] ml-1">*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`
            w-full px-4 py-3 rounded-lg resize-none
            bg-white border-2 border-[#1F2937]/10
            text-[#1F2937] placeholder:text-[#374151]/50
            focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
                    rows={4}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-[#374151]/70">{helperText}</p>
                )}
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';

export default Input;

"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-blue-700 hover:bg-blue-800 text-white shadow-sm hover:shadow-md",
  gradient:
    "bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white shadow-sm hover:shadow-lg",
  secondary:
    "bg-surface-secondary hover:bg-surface-tertiary text-text-primary border border-surface-border",
  outline:
    "border-2 border-blue-700 text-blue-700 hover:bg-blue-50",
  ghost:
    "text-text-secondary hover:bg-surface-tertiary hover:text-text-primary",
  destructive:
    "bg-red-500 hover:bg-red-600 text-white shadow-sm",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-6 py-2.5 text-base rounded-xl gap-2",
  xl: "px-8 py-3.5 text-base rounded-2xl gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-200 cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-2 focus-visible:outline-blue-700 focus-visible:outline-offset-2
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

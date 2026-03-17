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
    "bg-gradient-to-br from-[#A78BFA] to-clay-accent text-white shadow-clayButton hover:-translate-y-1 hover:shadow-clayButtonHover active:scale-[0.92] active:shadow-clayPressed active:translate-y-0",
  gradient:
    "bg-gradient-to-br from-[#A78BFA] to-clay-accent text-white shadow-clayButton hover:-translate-y-1 hover:shadow-clayButtonHover active:scale-[0.92] active:shadow-clayPressed active:translate-y-0",
  secondary:
    "bg-white text-clay-foreground shadow-clayButton hover:-translate-y-1 hover:shadow-clayButtonHover active:scale-[0.92] active:shadow-clayPressed active:translate-y-0",
  outline:
    "border-2 border-clay-accent/30 bg-white/50 backdrop-blur-sm text-clay-accent shadow-clayButton hover:-translate-y-1 hover:border-clay-accent hover:shadow-clayButtonHover active:scale-[0.92] active:shadow-clayPressed active:translate-y-0",
  ghost:
    "text-clay-foreground hover:bg-clay-accent/10 hover:text-clay-accent active:scale-[0.92]",
  destructive:
    "bg-gradient-to-br from-red-400 to-red-600 text-white shadow-clayButton hover:-translate-y-1 hover:shadow-clayButtonHover active:scale-[0.92] active:shadow-clayPressed active:translate-y-0",
};

const sizeClasses: Record<string, string> = {
  sm: "h-11 px-4 text-sm rounded-2xl gap-2",
  md: "h-14 px-6 text-base rounded-[20px] gap-2.5",
  lg: "h-16 px-8 text-lg rounded-[24px] gap-3",
  xl: "h-20 px-10 text-xl font-extrabold rounded-[32px] gap-4",
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
        inline-flex items-center justify-center font-bold tracking-wide
        transition-all duration-300 ease-out cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100 disabled:shadow-none
        focus-visible:outline-2 focus-visible:outline-clay-accent focus-visible:outline-offset-2
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

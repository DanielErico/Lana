"use client";
import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className = "",
  id,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-bold text-clay-foreground ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-clay-muted z-10">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full h-16 px-5 py-4 text-base rounded-[20px]
            bg-[#EFEBF5] border-0 transition-all duration-300 ease-out shadow-clayPressed
            placeholder:text-clay-muted text-clay-foreground font-medium
            focus:bg-white focus:outline-none focus:ring-4 focus:ring-clay-accent/20 focus:shadow-[0_8px_16px_rgba(139,92,246,0.1)]
            disabled:bg-clay-canvas disabled:cursor-not-allowed disabled:text-clay-muted disabled:shadow-none
            ${error
              ? "ring-2 ring-red-400 focus:ring-red-400"
              : ""}
            ${leftIcon ? "pl-12" : ""}
            ${rightIcon ? "pr-12" : ""}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-clay-muted z-10">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-sm font-bold text-red-500 flex items-center gap-1.5 ml-1">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;

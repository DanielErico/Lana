import React from "react";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info" | "purple" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: "bg-slate-100 text-slate-600",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  error: "bg-red-50 text-red-600 border border-red-200",
  info: "bg-blue-50 text-blue-700 border border-blue-200",
  purple: "bg-purple-50 text-purple-700 border border-purple-200",
  outline: "border border-slate-200 text-slate-600 bg-transparent",
};

const dotColors: Record<string, string> = {
  default: "bg-slate-400",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  purple: "bg-purple-600",
  outline: "bg-slate-400",
};

const sizeClasses: Record<string, string> = {
  sm: "px-2 py-0.5 text-xs rounded-md",
  md: "px-2.5 py-1 text-xs rounded-lg",
};

export default function Badge({
  variant = "default",
  size = "md",
  dot = false,
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
}

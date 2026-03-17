import React from "react";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info" | "purple" | "outline";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: "bg-[#EFEBF5] text-clay-foreground border border-white/40 shadow-sm",
  success: "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-800 border border-white/60 shadow-sm",
  warning: "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 border border-white/60 shadow-sm",
  error: "bg-gradient-to-br from-red-100 to-rose-200 text-red-800 border border-white/60 shadow-sm",
  info: "bg-gradient-to-br from-sky-100 to-sky-200 text-sky-800 border border-white/60 shadow-sm",
  purple: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-800 border border-white/60 shadow-sm",
  outline: "border-2 border-clay-muted/20 text-clay-foreground bg-white/50 backdrop-blur-sm",
};

const dotColors: Record<string, string> = {
  default: "bg-clay-muted",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-sky-500",
  purple: "bg-purple-600",
  outline: "bg-clay-muted",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1 text-[11px] uppercase tracking-wider rounded-full font-bold",
  md: "px-4 py-1.5 text-xs uppercase tracking-wider rounded-full font-bold",
  lg: "px-5 py-2 text-sm uppercase tracking-wider rounded-full font-black",
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

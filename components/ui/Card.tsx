import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "bordered";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses: Record<string, string> = {
  default: "bg-white border border-slate-200 shadow-card",
  glass: "glass-card",
  gradient: "bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-card",
  bordered: "bg-white border-2 border-blue-100",
};

const paddingClasses: Record<string, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  variant = "default",
  hover = false,
  padding = "md",
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hover ? "cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

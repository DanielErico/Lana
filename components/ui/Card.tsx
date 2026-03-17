import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "bordered";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses: Record<string, string> = {
  default: "bg-clay-cardBg backdrop-blur-xl shadow-clayCard border border-white/40",
  glass: "bg-white/40 backdrop-blur-2xl shadow-clayCard border border-white/60",
  gradient: "bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl shadow-clayCard border border-white/50",
  bordered: "bg-clay-cardBg/50 backdrop-blur-xl border-4 border-white/60 shadow-clayCard",
};

const paddingClasses: Record<string, string> = {
  none: "",
  sm: "p-6",
  md: "p-8",
  lg: "p-10",
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
        relative overflow-hidden rounded-4xl
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hover ? "cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-clayCardHover" : "transition-shadow duration-500"}
        ${className}
      `}
      {...props}
    >
      <div className="relative z-10 flex h-full flex-col">
        {children}
      </div>
    </div>
  );
}

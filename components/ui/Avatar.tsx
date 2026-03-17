import React from "react";

interface AvatarProps {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy";
  className?: string;
}

const sizeClasses: Record<string, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

const statusColors: Record<string, string> = {
  online: "bg-emerald-500",
  offline: "bg-slate-400",
  busy: "bg-amber-500",
};

const statusSizes: Record<string, string> = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-3.5 h-3.5",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

function getColorFromName(name: string) {
  const colors = [
    "from-blue-500 to-blue-700",
    "from-purple-500 to-purple-700",
    "from-pink-500 to-rose-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-cyan-500 to-blue-600",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export default function Avatar({
  name = "User",
  src,
  size = "md",
  status,
  className = "",
}: AvatarProps) {
  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`
            ${sizeClasses[size]} rounded-full
            bg-gradient-to-br ${getColorFromName(name)}
            flex items-center justify-center text-white font-semibold
          `}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]}
            rounded-full ring-2 ring-white
          `}
        />
      )}
    </div>
  );
}

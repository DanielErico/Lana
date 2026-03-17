"use client";

export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div 
        className="absolute h-[60vh] w-[60vh] rounded-full blur-3xl bg-[#7C3AED]/10 -top-[10%] -left-[10%] animate-clay-float"
      />
      <div 
        className="absolute h-[60vh] w-[60vh] rounded-full blur-3xl bg-[#DB2777]/10 -right-[10%] top-[20%] animate-clay-float-delayed"
      />
      <div 
        className="absolute h-[50vh] w-[50vh] rounded-full blur-3xl bg-[#0EA5E9]/10 bottom-[10%] left-[20%] animate-clay-float-slow"
      />
    </div>
  );
}

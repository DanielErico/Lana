"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { RimberioBrand } from "@/components/templates/rimberio/schema";

interface BrandContextType {
  brand: RimberioBrand;
  setBrand: React.Dispatch<React.SetStateAction<RimberioBrand>>;
}

const defaultBrand: RimberioBrand = {
  colors: { primary: "#FE4B17", light: "#F4F5F6", dark: "#0A0A0A" },
  logo: { text: "Rimberio" }
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<RimberioBrand>(defaultBrand);

  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
}

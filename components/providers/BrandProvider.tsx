"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { RimberioBrand } from "@/components/templates/rimberio/schema";
import { createClientBrowser } from "@/utils/supabase/client";

interface BrandContextType {
  brand: RimberioBrand;
  setBrand: (brand: RimberioBrand) => Promise<void>;
  isLoaded: boolean;
}

const defaultBrand: RimberioBrand = {
  colors: { primary: "#FE4B17", light: "#F4F5F6", dark: "#0A0A0A" },
  logo: { text: "Rimberio" }
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<RimberioBrand>(defaultBrand);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadBrand() {
      const supabase = createClientBrowser();
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id || '00000000-0000-0000-0000-000000000000';
      
      const { data } = await supabase.from('brands').select('*').eq('user_id', userId).maybeSingle();
      if (data) {
        const row = data as any;
        setBrandState({
          colors: row.colors || defaultBrand.colors,
          logo: row.logo || defaultBrand.logo
        });
      }
      setIsLoaded(true);
    }
    loadBrand();
  }, []);

  const setBrand = async (newBrand: RimberioBrand) => {
    setBrandState(newBrand);
    const supabase = createClientBrowser();
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    if (!userId) return; // Don't save to DB if logged out
    
    await (supabase.from('brands') as any).upsert({
      user_id: userId,
      colors: newBrand.colors,
      logo: newBrand.logo
    });
  };

  return (
    <BrandContext.Provider value={{ brand, setBrand, isLoaded }}>
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

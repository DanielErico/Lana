"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClientBrowser } from "@/utils/supabase/client";

export interface UserData {
  name: string;
  email: string;
  company: string;
  timezone: string;
  role: string;
  plan: string;
}

interface UserContextType {
  user: UserData;
  setUser: (userData: UserData) => Promise<void>;
  isLoaded: boolean;
}

const defaultUser: UserData = {
  name: "Alex Johnson",
  email: "alex@company.com",
  company: "TechFlow Inc.",
  timezone: "UTC+1",
  role: "Business Owner",
  plan: "Pro Plan",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserData>(defaultUser);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function initUser() {
      const supabase = createClientBrowser();
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id || '00000000-0000-0000-0000-000000000000';
      
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (data) {
        const row = data as any;
        setUserState({
          name: row.name || defaultUser.name,
          email: row.email || defaultUser.email,
          company: row.company || defaultUser.company,
          timezone: row.timezone || defaultUser.timezone,
          role: row.role || defaultUser.role,
          plan: row.plan || defaultUser.plan
        });
      }
      setIsLoaded(true);
    }
    initUser();
  }, []);

  const setUser = async (newUserData: UserData) => {
    setUserState(newUserData);
    const supabase = createClientBrowser();
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || '00000000-0000-0000-0000-000000000000';
    
    await (supabase.from('profiles') as any).upsert({ 
      id: userId, 
      ...newUserData 
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoaded }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

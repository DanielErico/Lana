"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

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
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
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
  const [user, setUser] = useState<UserData>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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


import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mot de passe simple pour l'admin (dans un cas réel, utilisez une méthode plus sécurisée)
const ADMIN_PASSWORD = "admin123";

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Vérifier si l'utilisateur était déjà connecté
  useEffect(() => {
    const adminStatus = localStorage.getItem("adminStatus");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("adminStatus", "true");
      toast.success("Mode administrateur activé");
    } else {
      toast.error("Mot de passe incorrect");
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("adminStatus");
    toast.success("Mode administrateur désactivé");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

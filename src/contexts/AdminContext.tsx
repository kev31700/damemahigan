
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => void;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mot de passe simple pour l'admin (dans un cas réel, utilisez une méthode plus sécurisée)
const ADMIN_PASSWORD_KEY = "adminPassword";
const DEFAULT_ADMIN_PASSWORD = "admin123";

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>(
    localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD
  );

  // Vérifier si l'utilisateur était déjà connecté
  useEffect(() => {
    const adminStatus = localStorage.getItem("adminStatus");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
    
    // Initialiser le mot de passe admin s'il n'existe pas encore
    if (!localStorage.getItem(ADMIN_PASSWORD_KEY)) {
      localStorage.setItem(ADMIN_PASSWORD_KEY, DEFAULT_ADMIN_PASSWORD);
    }
  }, []);

  const login = (password: string) => {
    if (password === adminPassword) {
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

  const changePassword = (oldPassword: string, newPassword: string) => {
    if (oldPassword === adminPassword) {
      setAdminPassword(newPassword);
      localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
      toast.success("Mot de passe administrateur modifié avec succès");
      return true;
    } else {
      toast.error("Ancien mot de passe incorrect");
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, changePassword }}>
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

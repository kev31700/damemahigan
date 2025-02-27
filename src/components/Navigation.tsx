
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Lock, LogOut } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const { isAdmin, login, logout } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Galerie", path: "/galerie" },
    { name: "Tarifs", path: "/tarifs" },
    { name: "Pratiques", path: "/pratiques" },
    { name: "Limites", path: "/limites" },
    { name: "Témoignages", path: "/temoignages" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogin = () => {
    login(adminPassword);
    setAdminPassword("");
    setDialogOpen(false);
  };

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              Dame Mahigan
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/80 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {isAdmin ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="ml-4 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion Admin</span>
              </Button>
            ) : (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="ml-4 flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Admin</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connexion administrateur</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input
                      type="password"
                      placeholder="Mot de passe administrateur"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleLogin();
                      }}
                    />
                    <Button onClick={handleLogin} className="w-full">Se connecter</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAdmin && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="mr-2"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
            
            {!isAdmin && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="mr-2"
                  >
                    <Lock className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connexion administrateur</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input
                      type="password"
                      placeholder="Mot de passe administrateur"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleLogin();
                      }}
                    />
                    <Button onClick={handleLogin} className="w-full">Se connecter</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary/80 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

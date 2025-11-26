import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mail, LogIn, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tourItems = [
    { name: "Mountain Gorilla Trekking", path: "/tours/gorilla-trekking" },
    { name: "Golden Monkey Tracking", path: "/tours/golden-monkey" },
    { name: "Chimpanzee Trekking", path: "/tours/chimpanzee" },
    { name: "Colobus Monkey Tracking", path: "/tours/colobus-monkey" },
    { name: "L'Hoest's Monkey Tracking", path: "/tours/lhoests-monkey" },
    { name: "Owl-Faced Monkey Tracking", path: "/tours/owl-faced-monkey" },
    { name: "Canopy Walkway", path: "/tours/canopy-walkway" },
    { name: "Dian Fossey Tomb Hike", path: "/tours/dian-fossey-hike" },
    { name: "Akagera Safari", path: "/tours/akagera-safari" },
    { name: "Kigali City Tour", path: "/tours/kigali-city-tour" },
  ];

  const destinationItems = [
    { name: "Rwanda", hash: "#rwanda" },
    { name: "Uganda", hash: "#uganda" },
    { name: "Eastern DRC", hash: "#drc" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <a href="tel:+250783007010" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone className="h-4 w-4" />
              +250 783 007 010
            </a>
            <a href="mailto:info@virungaexpeditiontours.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Mail className="h-4 w-4" />
              info@virungaexpeditiontours.com
            </a>
          </div>
          <a 
            href="https://wa.me/250783959404" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-secondary transition-colors font-medium"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Virunga Expedition Tours" className="h-12 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-6">
                <NavigationMenuItem>
                  <Link to="/" className="font-medium hover:text-primary transition-colors">
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Rwanda Tours</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {tourItems.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.path}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {destinationItems.map((item) => (
                        <li key={item.hash}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/destinations${item.hash}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="text-sm font-medium">{item.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/itineraries" className="font-medium hover:text-primary transition-colors">
                    Itineraries
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contact" className="font-medium hover:text-primary transition-colors">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              {isAdmin && (
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              )}
              {user ? (
                <Button asChild variant="outline" size="sm">
                  <Link to="/auth">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="sm">
                  <Link to="/auth">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
              )}
              <Button asChild className="bg-secondary hover:bg-secondary-light text-secondary-foreground">
                <Link to="/contact">Request Quote</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                to="/" 
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/tours" 
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Tours
              </Link>
              <Link 
                to="/destinations" 
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link 
                to="/itineraries" 
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Itineraries
              </Link>
              <Link 
                to="/contact" 
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="block py-2 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Shield className="h-4 w-4 inline mr-2" />
                  Admin Panel
                </Link>
              )}
              {user ? (
                <Link 
                  to="/auth" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  Account
                </Link>
              ) : (
                <Link 
                  to="/auth" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 inline mr-2" />
                  Sign In
                </Link>
              )}
              <Button asChild className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Request Quote</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

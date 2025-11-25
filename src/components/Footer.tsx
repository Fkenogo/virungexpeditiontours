import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <img src={logo} alt="Virunga Expedition Tours" className="h-12 mb-4 brightness-0 invert" />
            <p className="text-sm opacity-90 mb-4">
              Your trusted partner for Rwanda gorilla trekking, wildlife safaris, and adventure experiences. Based in Kigali, licensed by RDB.
            </p>
            <div className="flex gap-3">
              <span className="text-xs px-2 py-1 bg-secondary rounded">RTTA Member</span>
              <span className="text-xs px-2 py-1 bg-secondary rounded">RDB Licensed</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/tours" className="text-sm hover:text-secondary transition-colors">Rwanda Tours</Link></li>
              <li><Link to="/destinations" className="text-sm hover:text-secondary transition-colors">Destinations</Link></li>
              <li><Link to="/itineraries" className="text-sm hover:text-secondary transition-colors">Itineraries</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-secondary transition-colors">Travel Blog</Link></li>
              <li><Link to="/services" className="text-sm hover:text-secondary transition-colors">Services</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-secondary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h3 className="font-bold text-lg mb-4">Popular Tours</h3>
            <ul className="space-y-2">
              <li><Link to="/tours/gorilla-trekking" className="text-sm hover:text-secondary transition-colors">Gorilla Trekking</Link></li>
              <li><Link to="/tours/golden-monkey" className="text-sm hover:text-secondary transition-colors">Golden Monkey Tracking</Link></li>
              <li><Link to="/tours/chimpanzee" className="text-sm hover:text-secondary transition-colors">Chimpanzee Trekking</Link></li>
              <li><Link to="/tours/akagera-safari" className="text-sm hover:text-secondary transition-colors">Akagera Safari</Link></li>
              <li><Link to="/itineraries" className="text-sm hover:text-secondary transition-colors">7 Day Best of Rwanda</Link></li>
              <li><Link to="/destinations" className="text-sm hover:text-secondary transition-colors">Multi-Country Tours</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold mb-1">WhatsApp:</p>
                <a href="https://wa.me/250783959404" className="hover:text-secondary transition-colors block">+250 783 959 404 (Lorraine)</a>
                <a href="https://wa.me/250783007010" className="hover:text-secondary transition-colors block">+250 783 007 010 (Egide)</a>
              </div>
              <div>
                <p className="font-semibold mb-1">Email:</p>
                <a href="mailto:info@virungaexpeditiontours.com" className="hover:text-secondary transition-colors">info@virungaexpeditiontours.com</a>
              </div>
              <div>
                <p className="font-semibold mb-1">Office:</p>
                <p className="opacity-90">Kigali, Rwanda</p>
                <p className="text-xs opacity-75">Mon-Sat: 8:00 AM - 6:00 PM CAT</p>
              </div>
              <div className="flex gap-3 pt-2">
                <a href="#" className="hover:text-secondary transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-secondary transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>© 2025 Virunga Expedition Tours. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms-and-conditions" className="hover:text-secondary transition-colors">Terms & Conditions</Link>
            <span>|</span>
            <Link to="/booking-terms" className="hover:text-secondary transition-colors">Booking Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

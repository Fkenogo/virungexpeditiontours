import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, Cookie } from "lucide-react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show banner after 1 second delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background/95 backdrop-blur-sm border-t shadow-lg animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Cookie className="h-8 w-8 text-primary flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">We Value Your Privacy</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or decline cookies. 
              For more information, please read our{" "}
              <a href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
            <Button
              onClick={declineCookies}
              variant="outline"
              className="flex-1 md:flex-initial"
            >
              Decline
            </Button>
            <Button
              onClick={acceptCookies}
              className="flex-1 md:flex-initial"
            >
              Accept All
            </Button>
          </div>
          <Button
            onClick={declineCookies}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";

export type SiteSettings = {
  company_name: string;
  phones: string[];
  whatsapp_numbers: string[];
  emails: string[];
  emergency_phone: string;
  office_location: string;
  office_hours: string[];
  social_links: {
    facebook?: string;
    instagram?: string;
    x?: string;
    youtube?: string;
  };
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  company_name: "Virunga Expedition Tours",
  phones: ["+250783959404", "+250783007010"],
  whatsapp_numbers: ["+250783959404", "+250783007010"],
  emails: ["info@virungaexpeditiontours.com", "egide@virungaexpeditiontours.com"],
  emergency_phone: "+250783959404",
  office_location: "Kigali, Rwanda",
  office_hours: ["Monday-Saturday: 8:00 AM - 6:00 PM CAT", "Sunday: Closed"],
  social_links: {
    facebook: "",
    instagram: "",
  },
};

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "");

export const toWhatsAppUrl = (phone: string) => `https://wa.me/${normalizePhone(phone).replace("+", "")}`;
export const toTelUrl = (phone: string) => `tel:${normalizePhone(phone)}`;

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, "site_settings", "global"));
        if (!snap.exists()) return;
        const data = snap.data() as Partial<SiteSettings>;
        setSettings({
          ...DEFAULT_SITE_SETTINGS,
          ...data,
          phones: Array.isArray(data.phones) && data.phones.length ? data.phones : DEFAULT_SITE_SETTINGS.phones,
          whatsapp_numbers:
            Array.isArray(data.whatsapp_numbers) && data.whatsapp_numbers.length
              ? data.whatsapp_numbers
              : DEFAULT_SITE_SETTINGS.whatsapp_numbers,
          emails: Array.isArray(data.emails) && data.emails.length ? data.emails : DEFAULT_SITE_SETTINGS.emails,
          office_hours:
            Array.isArray(data.office_hours) && data.office_hours.length
              ? data.office_hours
              : DEFAULT_SITE_SETTINGS.office_hours,
          social_links: {
            ...DEFAULT_SITE_SETTINGS.social_links,
            ...(data.social_links || {}),
          },
        });
      } catch (error) {
        console.error("Error fetching site settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}

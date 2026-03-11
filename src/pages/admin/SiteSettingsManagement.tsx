import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Settings } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_SITE_SETTINGS } from "@/hooks/useSiteSettings";

type FormState = {
  company_name: string;
  phones: string;
  whatsapp_numbers: string;
  emails: string;
  emergency_phone: string;
  office_location: string;
  office_hours: string;
  facebook: string;
  instagram: string;
  x: string;
  youtube: string;
};

const toForm = (): FormState => ({
  company_name: DEFAULT_SITE_SETTINGS.company_name,
  phones: DEFAULT_SITE_SETTINGS.phones.join("\n"),
  whatsapp_numbers: DEFAULT_SITE_SETTINGS.whatsapp_numbers.join("\n"),
  emails: DEFAULT_SITE_SETTINGS.emails.join("\n"),
  emergency_phone: DEFAULT_SITE_SETTINGS.emergency_phone,
  office_location: DEFAULT_SITE_SETTINGS.office_location,
  office_hours: DEFAULT_SITE_SETTINGS.office_hours.join("\n"),
  facebook: DEFAULT_SITE_SETTINGS.social_links.facebook || "",
  instagram: DEFAULT_SITE_SETTINGS.social_links.instagram || "",
  x: DEFAULT_SITE_SETTINGS.social_links.x || "",
  youtube: DEFAULT_SITE_SETTINGS.social_links.youtube || "",
});

export default function SiteSettingsManagement() {
  const [form, setForm] = useState<FormState>(toForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, "site_settings", "global"));
        if (!snap.exists()) return;
        const data = snap.data();
        setForm({
          company_name: String(data.company_name || DEFAULT_SITE_SETTINGS.company_name),
          phones: Array.isArray(data.phones) ? data.phones.join("\n") : DEFAULT_SITE_SETTINGS.phones.join("\n"),
          whatsapp_numbers: Array.isArray(data.whatsapp_numbers)
            ? data.whatsapp_numbers.join("\n")
            : DEFAULT_SITE_SETTINGS.whatsapp_numbers.join("\n"),
          emails: Array.isArray(data.emails) ? data.emails.join("\n") : DEFAULT_SITE_SETTINGS.emails.join("\n"),
          emergency_phone: String(data.emergency_phone || DEFAULT_SITE_SETTINGS.emergency_phone),
          office_location: String(data.office_location || DEFAULT_SITE_SETTINGS.office_location),
          office_hours: Array.isArray(data.office_hours)
            ? data.office_hours.join("\n")
            : DEFAULT_SITE_SETTINGS.office_hours.join("\n"),
          facebook: String(data.social_links?.facebook || ""),
          instagram: String(data.social_links?.instagram || ""),
          x: String(data.social_links?.x || ""),
          youtube: String(data.social_links?.youtube || ""),
        });
      } catch (error) {
        console.error("Error loading site settings:", error);
        toast.error("Failed to load site settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(
        doc(db, "site_settings", "global"),
        {
          company_name: form.company_name.trim(),
          phones: form.phones.split("\n").map((v) => v.trim()).filter(Boolean),
          whatsapp_numbers: form.whatsapp_numbers.split("\n").map((v) => v.trim()).filter(Boolean),
          emails: form.emails.split("\n").map((v) => v.trim()).filter(Boolean),
          emergency_phone: form.emergency_phone.trim(),
          office_location: form.office_location.trim(),
          office_hours: form.office_hours.split("\n").map((v) => v.trim()).filter(Boolean),
          social_links: {
            facebook: form.facebook.trim(),
            instagram: form.instagram.trim(),
            x: form.x.trim(),
            youtube: form.youtube.trim(),
          },
          updated_at: new Date().toISOString(),
        },
        { merge: true },
      );
      toast.success("Site settings updated");
    } catch (error) {
      console.error("Error saving site settings:", error);
      toast.error("Failed to save site settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Site Settings</h1>
        <p className="text-muted-foreground">Manage contact details, WhatsApp numbers, and social links</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Global Business Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input value={form.company_name} onChange={(e) => setForm((p) => ({ ...p, company_name: e.target.value }))} />
            </div>
            <div>
              <Label>Emergency Phone</Label>
              <Input value={form.emergency_phone} onChange={(e) => setForm((p) => ({ ...p, emergency_phone: e.target.value }))} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Phones (one per line)</Label>
              <Textarea rows={4} value={form.phones} onChange={(e) => setForm((p) => ({ ...p, phones: e.target.value }))} />
            </div>
            <div>
              <Label>WhatsApp Numbers (one per line)</Label>
              <Textarea rows={4} value={form.whatsapp_numbers} onChange={(e) => setForm((p) => ({ ...p, whatsapp_numbers: e.target.value }))} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Emails (one per line)</Label>
              <Textarea rows={4} value={form.emails} onChange={(e) => setForm((p) => ({ ...p, emails: e.target.value }))} />
            </div>
            <div>
              <Label>Office Hours (one per line)</Label>
              <Textarea rows={4} value={form.office_hours} onChange={(e) => setForm((p) => ({ ...p, office_hours: e.target.value }))} />
            </div>
          </div>

          <div>
            <Label>Office Location</Label>
            <Input value={form.office_location} onChange={(e) => setForm((p) => ({ ...p, office_location: e.target.value }))} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Facebook URL</Label>
              <Input value={form.facebook} onChange={(e) => setForm((p) => ({ ...p, facebook: e.target.value }))} />
            </div>
            <div>
              <Label>Instagram URL</Label>
              <Input value={form.instagram} onChange={(e) => setForm((p) => ({ ...p, instagram: e.target.value }))} />
            </div>
            <div>
              <Label>X URL</Label>
              <Input value={form.x} onChange={(e) => setForm((p) => ({ ...p, x: e.target.value }))} />
            </div>
            <div>
              <Label>YouTube URL</Label>
              <Input value={form.youtube} onChange={(e) => setForm((p) => ({ ...p, youtube: e.target.value }))} />
            </div>
          </div>

          <Button onClick={save} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

type DestinationPackage = {
  id: string;
  country: "rwanda" | "uganda" | "drc";
  title: string;
  subtitle: string;
  location: string;
  image_key:
    | "virunga-mountains"
    | "gorilla"
    | "forest"
    | "safari"
    | "lake"
    | "city"
    | "volcano";
  image_url: string | null;
  description: string;
  highlights: string[];
  badges: string[];
  link: string;
  display_order: number;
  is_active: boolean;
};

const IMAGE_KEYS: Array<DestinationPackage["image_key"]> = [
  "virunga-mountains",
  "gorilla",
  "forest",
  "safari",
  "lake",
  "city",
  "volcano",
];

const DEFAULT_FORM = {
  id: "",
  country: "rwanda" as DestinationPackage["country"],
  title: "",
  subtitle: "",
  location: "",
  image_key: "virunga-mountains" as DestinationPackage["image_key"],
  image_url: "",
  description: "",
  highlights: "",
  badges: "",
  link: "/destinations",
  display_order: 0,
  is_active: true,
};

const normalize = (id: string, raw: Record<string, unknown>): DestinationPackage => ({
  id,
  country: (raw.country as DestinationPackage["country"]) || "rwanda",
  title: String(raw.title || ""),
  subtitle: String(raw.subtitle || ""),
  location: String(raw.location || ""),
  image_key: (raw.image_key as DestinationPackage["image_key"]) || "virunga-mountains",
  image_url: raw.image_url ? String(raw.image_url) : null,
  description: String(raw.description || ""),
  highlights: Array.isArray(raw.highlights) ? raw.highlights.map((v) => String(v)) : [],
  badges: Array.isArray(raw.badges) ? raw.badges.map((v) => String(v)) : [],
  link: String(raw.link || "/destinations"),
  display_order: Number(raw.display_order || 0),
  is_active: raw.is_active === undefined ? true : Boolean(raw.is_active),
});

export default function DestinationsManagement() {
  const [items, setItems] = useState<DestinationPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<DestinationPackage | null>(null);
  const [form, setForm] = useState(DEFAULT_FORM);

  const fetchItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, "destination_packages"));
      const data = snapshot.docs
        .map((d) => normalize(d.id, d.data() as Record<string, unknown>))
        .sort((a, b) => a.display_order - b.display_order);
      setItems(data);
    } catch (error) {
      console.error("Error loading destination packages:", error);
      toast.error("Failed to load destination packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(DEFAULT_FORM);
    setDialogOpen(true);
  };

  const openEdit = (item: DestinationPackage) => {
    setEditing(item);
    setForm({
      id: item.id,
      country: item.country,
      title: item.title,
      subtitle: item.subtitle,
      location: item.location,
      image_key: item.image_key,
      image_url: item.image_url || "",
      description: item.description,
      highlights: item.highlights.join("\n"),
      badges: item.badges.join("\n"),
      link: item.link,
      display_order: item.display_order,
      is_active: item.is_active,
    });
    setDialogOpen(true);
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      country: form.country,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      location: form.location.trim(),
      image_key: form.image_key,
      image_url: form.image_url.trim() || null,
      description: form.description.trim(),
      highlights: form.highlights.split("\n").map((v) => v.trim()).filter(Boolean),
      badges: form.badges.split("\n").map((v) => v.trim()).filter(Boolean),
      link: form.link.trim(),
      display_order: Number(form.display_order || 0),
      is_active: form.is_active,
      updated_at: new Date().toISOString(),
    };

    if (!payload.title || !payload.country || !payload.location || !payload.description) {
      toast.error("Please fill country, title, location and description");
      return;
    }

    try {
      if (editing) {
        await setDoc(doc(db, "destination_packages", editing.id), payload, { merge: true });
        toast.success("Destination package updated");
      } else {
        const requestedId = form.id.trim();
        if (requestedId) {
          await setDoc(doc(db, "destination_packages", requestedId), {
            ...payload,
            created_at: new Date().toISOString(),
          });
        } else {
          await addDoc(collection(db, "destination_packages"), {
            ...payload,
            created_at: new Date().toISOString(),
          });
        }
        toast.success("Destination package created");
      }
      setDialogOpen(false);
      setEditing(null);
      setForm(DEFAULT_FORM);
      await fetchItems();
    } catch (error) {
      console.error("Error saving destination package:", error);
      toast.error("Failed to save destination package");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this destination package?")) return;
    try {
      await deleteDoc(doc(db, "destination_packages", id));
      toast.success("Destination package deleted");
      await fetchItems();
    } catch (error) {
      console.error("Error deleting destination package:", error);
      toast.error("Failed to delete destination package");
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Destinations Management</h1>
          <p className="text-muted-foreground">Manage destination package cards shown on the Destinations page</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Add Destination Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Destination Package" : "Create Destination Package"}</DialogTitle>
              <DialogDescription>Use one line per badge/highlight.</DialogDescription>
            </DialogHeader>

            <form onSubmit={save} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <Label>ID (optional for new)</Label>
                  <Input value={form.id} onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))} disabled={Boolean(editing)} />
                </div>
                <div>
                  <Label>Country</Label>
                  <Select value={form.country} onValueChange={(value) => setForm((p) => ({ ...p, country: value as DestinationPackage["country"] }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rwanda">Rwanda</SelectItem>
                      <SelectItem value="uganda">Uganda</SelectItem>
                      <SelectItem value="drc">Eastern DRC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <Label>Subtitle</Label>
                  <Input value={form.subtitle} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} required />
                </div>
                <div>
                  <Label>Link</Label>
                  <Input value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <Label>Image Key</Label>
                  <Select value={form.image_key} onValueChange={(value) => setForm((p) => ({ ...p, image_key: value as DestinationPackage["image_key"] }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {IMAGE_KEYS.map((k) => (
                        <SelectItem key={k} value={k}>{k}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Image URL (optional)</Label>
                  <Input value={form.image_url} onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))} />
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" min={0} value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: Number(e.target.value) }))} />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <Label>Badges (one per line)</Label>
                  <Textarea rows={4} value={form.badges} onChange={(e) => setForm((p) => ({ ...p, badges: e.target.value }))} />
                </div>
                <div>
                  <Label>Highlights (one per line)</Label>
                  <Textarea rows={4} value={form.highlights} onChange={(e) => setForm((p) => ({ ...p, highlights: e.target.value }))} />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <Label htmlFor="is_active">Active on website</Label>
                <Switch id="is_active" checked={form.is_active} onCheckedChange={(checked) => setForm((p) => ({ ...p, is_active: checked }))} />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit">{editing ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Destination Packages ({items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="capitalize">{item.country}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Badge variant={item.is_active ? "default" : "secondary"}>{item.is_active ? "Active" : "Inactive"}</Badge>
                  </TableCell>
                  <TableCell>{item.display_order}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="sm" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

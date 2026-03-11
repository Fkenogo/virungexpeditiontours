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
import { Loader2, Pencil, Plus, Route, Trash2 } from "lucide-react";
import { toast } from "sonner";

type TourPackage = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  difficulty: string;
  image_key:
    | "hero-gorilla"
    | "golden-monkeys"
    | "chimpanzees"
    | "colobus-monkeys"
    | "chimpanzee-family"
    | "akagera-safari"
    | "canopy-walkway"
    | "virunga-mountains"
    | "kigali-city";
  image_url: string | null;
  description: string;
  link: string;
  display_order: number;
  is_active: boolean;
};

const IMAGE_KEYS: Array<TourPackage["image_key"]> = [
  "hero-gorilla",
  "golden-monkeys",
  "chimpanzees",
  "colobus-monkeys",
  "chimpanzee-family",
  "akagera-safari",
  "canopy-walkway",
  "virunga-mountains",
  "kigali-city",
];

const DEFAULT_FORM = {
  id: "",
  title: "",
  subtitle: "",
  location: "",
  duration: "",
  difficulty: "",
  image_key: "hero-gorilla" as TourPackage["image_key"],
  image_url: "",
  description: "",
  link: "/tours",
  display_order: 0,
  is_active: true,
};

const normalizeTour = (id: string, raw: Record<string, unknown>): TourPackage => ({
  id,
  title: String(raw.title || ""),
  subtitle: String(raw.subtitle || ""),
  location: String(raw.location || ""),
  duration: String(raw.duration || ""),
  difficulty: String(raw.difficulty || ""),
  image_key: (raw.image_key as TourPackage["image_key"]) || "hero-gorilla",
  image_url: raw.image_url ? String(raw.image_url) : null,
  description: String(raw.description || ""),
  link: String(raw.link || "/tours"),
  display_order: Number(raw.display_order || 0),
  is_active: raw.is_active === undefined ? true : Boolean(raw.is_active),
});

export default function ToursManagement() {
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TourPackage | null>(null);
  const [form, setForm] = useState(DEFAULT_FORM);

  const fetchTours = async () => {
    try {
      const snapshot = await getDocs(collection(db, "tour_packages"));
      const data = snapshot.docs
        .map((docSnapshot) => normalizeTour(docSnapshot.id, docSnapshot.data() as Record<string, unknown>))
        .sort((a, b) => a.display_order - b.display_order);
      setTours(data);
    } catch (error) {
      console.error("Error fetching tour packages:", error);
      toast.error("Failed to load tour packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const openCreateDialog = () => {
    setEditingItem(null);
    setForm(DEFAULT_FORM);
    setIsDialogOpen(true);
  };

  const openEditDialog = (tour: TourPackage) => {
    setEditingItem(tour);
    setForm({
      id: tour.id,
      title: tour.title,
      subtitle: tour.subtitle,
      location: tour.location,
      duration: tour.duration,
      difficulty: tour.difficulty,
      image_key: tour.image_key,
      image_url: tour.image_url || "",
      description: tour.description,
      link: tour.link,
      display_order: tour.display_order,
      is_active: tour.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      location: form.location.trim(),
      duration: form.duration.trim(),
      difficulty: form.difficulty.trim(),
      image_key: form.image_key,
      image_url: form.image_url.trim() || null,
      description: form.description.trim(),
      link: form.link.trim(),
      display_order: Number(form.display_order || 0),
      is_active: form.is_active,
      updated_at: new Date().toISOString(),
    };

    if (!payload.title || !payload.location || !payload.duration || !payload.link || !payload.description) {
      toast.error("Please fill title, location, duration, link, and description");
      return;
    }

    try {
      if (editingItem) {
        await setDoc(doc(db, "tour_packages", editingItem.id), payload, { merge: true });
        toast.success("Tour package updated");
      } else {
        const requestedId = form.id.trim();
        if (requestedId) {
          await setDoc(doc(db, "tour_packages", requestedId), {
            ...payload,
            created_at: new Date().toISOString(),
          });
        } else {
          await addDoc(collection(db, "tour_packages"), {
            ...payload,
            created_at: new Date().toISOString(),
          });
        }
        toast.success("Tour package created");
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      setForm(DEFAULT_FORM);
      await fetchTours();
    } catch (error) {
      console.error("Error saving tour package:", error);
      toast.error("Failed to save tour package");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tour package?")) return;

    try {
      await deleteDoc(doc(db, "tour_packages", id));
      toast.success("Tour package deleted");
      await fetchTours();
    } catch (error) {
      console.error("Error deleting tour package:", error);
      toast.error("Failed to delete tour package");
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
          <h1 className="text-4xl font-bold mb-2">Tours Management</h1>
          <p className="text-muted-foreground">Manage tour cards visible on the public Tours page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Tour Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Tour Package" : "Create Tour Package"}</DialogTitle>
              <DialogDescription>Configure fields used by the public Tours page.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <Label>ID (optional for new)</Label>
                  <Input value={form.id} onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))} disabled={Boolean(editingItem)} />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Input value={form.subtitle} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))} />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <Label>Location</Label>
                  <Input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} required />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} required />
                </div>
                <div>
                  <Label>Difficulty</Label>
                  <Input value={form.difficulty} onChange={(e) => setForm((p) => ({ ...p, difficulty: e.target.value }))} />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <Label>Image Key</Label>
                  <Select value={form.image_key} onValueChange={(value) => setForm((p) => ({ ...p, image_key: value as TourPackage["image_key"] }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {IMAGE_KEYS.map((imageKey) => (
                        <SelectItem key={imageKey} value={imageKey}>
                          {imageKey}
                        </SelectItem>
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
                  <Input
                    type="number"
                    min={0}
                    value={form.display_order}
                    onChange={(e) => setForm((p) => ({ ...p, display_order: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <Label>Link</Label>
                  <Input value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} required />
                </div>
                <div className="flex items-center justify-between rounded-md border px-3 py-2 mt-6">
                  <Label htmlFor="is_active">Active on website</Label>
                  <Switch id="is_active" checked={form.is_active} onCheckedChange={(checked) => setForm((p) => ({ ...p, is_active: checked }))} />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={4} required />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingItem ? "Update Tour Package" : "Create Tour Package"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Tour Packages ({tours.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell className="font-medium">
                    <div>{tour.title}</div>
                    <div className="text-xs text-muted-foreground">{tour.link}</div>
                  </TableCell>
                  <TableCell>{tour.location}</TableCell>
                  <TableCell>{tour.duration}</TableCell>
                  <TableCell>
                    <Badge variant={tour.is_active ? "default" : "secondary"}>
                      {tour.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{tour.display_order}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(tour)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(tour.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

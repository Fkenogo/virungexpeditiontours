import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "@/integrations/firebase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Image, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

type MediaAsset = {
  id: string;
  key: string;
  title: string;
  url: string;
  local_asset_path?: string;
  alt: string;
  usage: string;
  tags: string[];
  is_active: boolean;
  display_order: number;
};

const DEFAULT_FORM = {
  id: "",
  key: "",
  title: "",
  url: "",
  local_asset_path: "",
  alt: "",
  usage: "",
  tags: "",
  is_active: true,
  display_order: 0,
};

const normalize = (id: string, raw: Record<string, unknown>): MediaAsset => ({
  id,
  key: String(raw.key || ""),
  title: String(raw.title || ""),
  url: String(raw.url || ""),
  local_asset_path: String(raw.local_asset_path || ""),
  alt: String(raw.alt || ""),
  usage: String(raw.usage || ""),
  tags: Array.isArray(raw.tags) ? raw.tags.map((v) => String(v)) : [],
  is_active: raw.is_active === undefined ? true : Boolean(raw.is_active),
  display_order: Number(raw.display_order || 0),
});

export default function MediaManagement() {
  const [items, setItems] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaAsset | null>(null);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, "media_assets"));
      const data = snapshot.docs
        .map((docSnapshot) => normalize(docSnapshot.id, docSnapshot.data() as Record<string, unknown>))
        .sort((a, b) => a.display_order - b.display_order);
      setItems(data);
    } catch (error) {
      console.error("Error fetching media assets:", error);
      toast.error("Failed to load media assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreateDialog = () => {
    setEditingItem(null);
    setForm(DEFAULT_FORM);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: MediaAsset) => {
    setEditingItem(item);
    setForm({
      id: item.id,
      key: item.key,
      title: item.title,
      url: item.url,
      local_asset_path: item.local_asset_path || "",
      alt: item.alt,
      usage: item.usage,
      tags: item.tags.join("\n"),
      is_active: item.is_active,
      display_order: item.display_order,
    });
    setIsDialogOpen(true);
  };

  const uploadFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const storage = getStorage();
      const key = form.key.trim() || `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `site-media/${key}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm((p) => ({ ...p, url }));
      toast.success("Image uploaded");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Check Firebase Storage setup.");
    } finally {
      setUploading(false);
    }
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      key: form.key.trim(),
      title: form.title.trim(),
      url: form.url.trim(),
      local_asset_path: form.local_asset_path.trim(),
      alt: form.alt.trim(),
      usage: form.usage.trim(),
      tags: form.tags.split("\n").map((v) => v.trim()).filter(Boolean),
      is_active: form.is_active,
      display_order: Number(form.display_order || 0),
      updated_at: new Date().toISOString(),
    };

    if (!payload.key || (!payload.url && !payload.local_asset_path)) {
      toast.error("key and either url or local asset path are required");
      return;
    }

    try {
      if (editingItem) {
        await setDoc(doc(db, "media_assets", editingItem.id), payload, { merge: true });
      } else {
        const requestedId = form.id.trim();
        if (requestedId) {
          await setDoc(doc(db, "media_assets", requestedId), {
            ...payload,
            created_at: new Date().toISOString(),
          });
        } else {
          await addDoc(collection(db, "media_assets"), {
            ...payload,
            created_at: new Date().toISOString(),
          });
        }
      }
      toast.success("Media asset saved");
      setIsDialogOpen(false);
      setEditingItem(null);
      setForm(DEFAULT_FORM);
      await fetchItems();
    } catch (error) {
      console.error("Error saving media asset:", error);
      toast.error("Failed to save media asset");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this media asset?")) return;
    try {
      await deleteDoc(doc(db, "media_assets", id));
      toast.success("Media asset deleted");
      await fetchItems();
    } catch (error) {
      console.error("Error deleting media asset:", error);
      toast.error("Failed to delete media asset");
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
          <h1 className="text-4xl font-bold mb-2">Media Management</h1>
          <p className="text-muted-foreground">Manage reusable image URLs for pages and cards</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Media Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Media Asset" : "Create Media Asset"}</DialogTitle>
              <DialogDescription>Use a stable `key` so pages can reference it.</DialogDescription>
            </DialogHeader>
            <form onSubmit={save} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <Label>ID (optional for new)</Label>
                  <Input value={form.id} onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))} disabled={Boolean(editingItem)} />
                </div>
                <div>
                  <Label>Key</Label>
                  <Input value={form.key} onChange={(e) => setForm((p) => ({ ...p, key: e.target.value }))} required />
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" min={0} value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: Number(e.target.value) }))} />
                </div>
              </div>
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <Label>URL</Label>
                <Input value={form.url} onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))} />
              </div>
              <div>
                <Label>Local Asset Path (optional)</Label>
                <Input value={form.local_asset_path} onChange={(e) => setForm((p) => ({ ...p, local_asset_path: e.target.value }))} placeholder="src/assets/image-name.jpg" />
              </div>
              <div>
                <Label>Upload file (optional)</Label>
                <Input type="file" accept="image/*" onChange={(e) => uploadFile(e.target.files?.[0])} disabled={uploading} />
                {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
              </div>
              <div>
                <Label>Alt text</Label>
                <Input value={form.alt} onChange={(e) => setForm((p) => ({ ...p, alt: e.target.value }))} />
              </div>
              <div>
                <Label>Usage Notes</Label>
                <Input value={form.usage} onChange={(e) => setForm((p) => ({ ...p, usage: e.target.value }))} />
              </div>
              <div>
                <Label>Tags (one per line)</Label>
                <Textarea rows={4} value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} />
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <Label htmlFor="is_active">Active</Label>
                <Switch id="is_active" checked={form.is_active} onCheckedChange={(checked) => setForm((p) => ({ ...p, is_active: checked }))} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Upload className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Media Assets ({items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs">{item.key}</TableCell>
                  <TableCell>{item.title || item.alt || "-"}</TableCell>
                  <TableCell>{item.is_active ? "Active" : "Inactive"}</TableCell>
                  <TableCell>{item.display_order}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => remove(item.id)}>
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

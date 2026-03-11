import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";

type MediaAsset = {
  key: string;
  url: string;
  is_active: boolean;
};

export function useMediaAssets() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const snapshot = await getDocs(query(collection(db, "media_assets"), where("is_active", "==", true)));
        const data = snapshot.docs.map((d) => d.data() as MediaAsset).filter((item) => item.key && item.url);
        setAssets(data);
      } catch (error) {
        console.error("Error fetching media assets:", error);
        setAssets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const mediaMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const asset of assets) map.set(asset.key, asset.url);
    return map;
  }, [assets]);

  return { mediaMap, loading };
}

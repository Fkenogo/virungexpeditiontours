import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";

export function useContentDoc<T extends Record<string, unknown>>(collectionName: string, docId: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const snapshot = await getDoc(doc(db, collectionName, docId));
        if (snapshot.exists()) {
          setData({
            ...fallback,
            ...(snapshot.data() as Partial<T>),
          });
        }
      } catch (error) {
        console.error(`Error fetching ${collectionName}/${docId}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [collectionName, docId]);

  return { data, loading };
}

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/integrations/firebase/client';

export const useAuditLog = () => {
  const logAction = async (
    action: string,
    entityType: string,
    entityId?: string,
    details?: unknown
  ) => {
    try {
      const user = auth.currentUser;
      
      if (!user) return;

      await addDoc(collection(db, 'audit_logs'), {
        user_id: user.uid,
        action,
        entity_type: entityType,
        entity_id: entityId,
        details: details ?? null,
        created_at: serverTimestamp(),
      });
    } catch (error) {
      console.error('Failed to log audit action:', error);
      // Don't throw - audit logging shouldn't break the main flow
    }
  };

  return { logAction };
};

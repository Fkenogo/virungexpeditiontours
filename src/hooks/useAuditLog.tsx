import { supabase } from '@/integrations/supabase/client';

export const useAuditLog = () => {
  const logAction = async (
    action: string,
    entityType: string,
    entityId?: string,
    details?: any
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      await supabase.from('audit_logs').insert({
        user_id: user.id,
        action,
        entity_type: entityType,
        entity_id: entityId,
        details: details ? JSON.parse(JSON.stringify(details)) : null,
      });
    } catch (error) {
      console.error('Failed to log audit action:', error);
      // Don't throw - audit logging shouldn't break the main flow
    }
  };

  return { logAction };
};
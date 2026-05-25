import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isDatabaseConfigured = Boolean(supabaseUrl && supabaseServiceRoleKey);

export const supabase = isDatabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

export function toDemoRequest(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    businessType: row.business_type,
    useCase: row.use_case,
    createdAt: row.created_at
  };
}

export function toLead(row) {
  return {
    id: row.id,
    business: row.business,
    contact: row.contact,
    category: row.category,
    status: row.status,
    lastTouch: row.last_touch,
    useCase: row.use_case
  };
}

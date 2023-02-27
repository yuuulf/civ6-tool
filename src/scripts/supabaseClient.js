import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUser() {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    return null;
  }

  const user = await supabase.auth.getUser();
  return user.data.user;
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getAll(table) {
  return await supabase
    .from(table)
    .select("*")
    .order("id", { ascending: true });
}

export async function getById(table, id) {
  return await supabase.from(table).select("*").eq("id", id);
}

export async function add(table, data) {
  return await supabase.from(table).insert([data]);
}

export async function update(table, data) {
  return await supabase.from(table).upsert(data);
}

export async function deleteById(table, id) {
  return await supabase.from(table).delete().match({ id });
}

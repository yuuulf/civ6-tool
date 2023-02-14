import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const command = "command";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getCommands() {
  return await supabase
    .from(command)
    .select("*")
    .order("id", { ascending: true });
}

export async function getCommand(id) {
  return await supabase.from(command).select("*").eq("id", id);
}

export async function addCommand(data) {
  return await supabase.from(command).insert([data]);
}

export async function updateCommand(data) {
  return await supabase.from(command).upsert(data);
}

export async function deleteCommand(id) {
  return await supabase.from(command).delete().match({ id });
}

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const leaderTable = "leader";
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

export async function getLeaders() {
  return await supabase
    .from(leaderTable)
    .select("*")
    .order("id", { ascending: true });
}

export async function getLeader(id) {
  return await supabase.from(leaderTable).select("*").eq("id", id);
}

export async function addLeader(data) {
  return await supabase.from(leaderTable).insert([data]);
}

export async function updateLeader(data) {
  return await supabase.from(leaderTable).upsert(data);
}

export async function deleteLeader(id) {
  return await supabase.from(leaderTable).delete().match({ id });
}

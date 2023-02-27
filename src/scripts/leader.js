import * as supabase from "./supabaseClient";

const leaderTable = "leader";
export async function getLeaders() {
  return await supabase.getAll(leaderTable);
}

export async function getLeader(id) {
  return await supabase.getById(leaderTable, id);
}

export async function addLeader(data) {
  return await supabase.add(leaderTable, data);
}

export async function updateLeader(data) {
  return await supabase.update(leaderTable, data);
}

export async function deleteLeader(id) {
  return await supabase.deleteById(leaderTable, id);
}

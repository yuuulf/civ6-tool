import * as supabase from "./supabaseClient";

const achievementTable = "achievement";
export async function getAchievements() {
  return await supabase.getAll(achievementTable);
}

export async function addAchievement(data) {
  return await supabase.add(achievementTable, data);
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/links";
import type { BeanInsert, BrewInsert, BrewMethod } from "@/types/database";

const VALID_METHODS: BrewMethod[] = [
  "espresso",
  "pour-over",
  "aeropress",
  "french-press",
  "moka-pot",
  "drip-bag",
];

function num(value: FormDataEntryValue | null): number | null {
  if (value == null) return null;
  const s = String(value).trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function int(value: FormDataEntryValue | null): number | null {
  const n = num(value);
  if (n == null) return null;
  return Math.round(n);
}

function str(value: FormDataEntryValue | null): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  return s.length ? s : null;
}

async function requireUserId(): Promise<string> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(ROUTES.signIn);
  return user.id;
}

// ── Beans ───────────────────────────────────────────────────────────

export async function createBean(formData: FormData): Promise<void> {
  const user_id = await requireUserId();
  const name = str(formData.get("name"));
  if (!name) throw new Error("Bean name is required.");

  const supabase = createClient();
  const payload: BeanInsert = {
    user_id,
    name,
    roaster: str(formData.get("roaster")),
    origin: str(formData.get("origin")),
    process: str(formData.get("process")),
    roast_date: str(formData.get("roast_date")),
    bag_notes: str(formData.get("bag_notes")),
    my_notes: str(formData.get("my_notes")),
    photo_url: null,
  };
  const { data, error } = await supabase
    .from("beans")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(ROUTES.beans);
  redirect(ROUTES.bean(data.id));
}

export async function updateBean(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireUserId();
  const name = str(formData.get("name"));
  if (!name) throw new Error("Bean name is required.");

  const supabase = createClient();
  const { error } = await supabase
    .from("beans")
    .update({
      name,
      roaster: str(formData.get("roaster")),
      origin: str(formData.get("origin")),
      process: str(formData.get("process")),
      roast_date: str(formData.get("roast_date")),
      bag_notes: str(formData.get("bag_notes")),
      my_notes: str(formData.get("my_notes")),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath(ROUTES.bean(id));
  revalidatePath(ROUTES.beans);
  redirect(ROUTES.bean(id));
}

export async function archiveBean(id: string): Promise<void> {
  await requireUserId();
  const supabase = createClient();
  const { error } = await supabase
    .from("beans")
    .update({ archived_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(ROUTES.beans);
  redirect(ROUTES.beans);
}

// ── Brews ───────────────────────────────────────────────────────────

export async function createBrew(formData: FormData): Promise<void> {
  const user_id = await requireUserId();
  const rawMethod = str(formData.get("method")) ?? "";
  if (!VALID_METHODS.includes(rawMethod as BrewMethod)) {
    throw new Error("Pick a brewing method.");
  }
  const method = rawMethod as BrewMethod;

  const beanId = str(formData.get("bean_id"));
  const dose = num(formData.get("dose_g"));
  const yieldG = num(formData.get("yield_g"));
  const timeS = int(formData.get("time_s"));
  const temp = int(formData.get("water_temp_c"));
  const rating = int(formData.get("rating"));
  const wbaRaw = str(formData.get("would_brew_again"));
  const wouldBrewAgain =
    wbaRaw === "yes" ? true : wbaRaw === "no" ? false : null;

  const supabase = createClient();
  const payload: BrewInsert = {
    user_id,
    bean_id: beanId,
    brewed_at: new Date().toISOString(),
    method,
    dose_g: dose,
    yield_g: yieldG,
    time_s: timeS,
    water_temp_c: temp,
    grind_clicks: str(formData.get("grind_clicks")),
    gear_used: str(formData.get("gear_used")),
    notes: str(formData.get("notes")),
    variable_changed: str(formData.get("variable_changed")),
    rating: rating !== null && rating >= 1 && rating <= 5 ? rating : null,
    would_brew_again: wouldBrewAgain,
  };
  const { data, error } = await supabase
    .from("brews")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(ROUTES.myJournal);
  revalidatePath(ROUTES.account);
  redirect(ROUTES.brew(data.id));
}

export async function deleteBrew(id: string): Promise<void> {
  await requireUserId();
  const supabase = createClient();
  const { error } = await supabase.from("brews").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(ROUTES.myJournal);
  revalidatePath(ROUTES.account);
  redirect(ROUTES.myJournal);
}

// Server-side queries for the journal. Use from RSCs / Route Handlers /
// Server Actions. RLS handles user scoping — these just filter for
// readability.

import { createClient } from "@/lib/supabase/server";
import type { Bean, Brew, BrewMethod } from "@/types/database";

export async function getCurrentUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function listBeans(): Promise<Bean[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("beans")
    .select("*")
    .is("archived_at", null)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[journal] listBeans", error);
    return [];
  }
  return data ?? [];
}

export async function getBean(id: string): Promise<Bean | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("beans")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("[journal] getBean", error);
    return null;
  }
  return data;
}

export async function listBrews(opts?: {
  beanId?: string;
  method?: BrewMethod;
  limit?: number;
}): Promise<Brew[]> {
  const supabase = createClient();
  let q = supabase
    .from("brews")
    .select("*")
    .order("brewed_at", { ascending: false });
  if (opts?.beanId) q = q.eq("bean_id", opts.beanId);
  if (opts?.method) q = q.eq("method", opts.method);
  if (opts?.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error) {
    console.error("[journal] listBrews", error);
    return [];
  }
  return data ?? [];
}

export async function getBrew(id: string): Promise<Brew | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("brews")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("[journal] getBrew", error);
    return null;
  }
  return data;
}

/** Last brew of this bean — used for "what's different?" pre-fill. */
export async function getLastBrewForBean(beanId: string): Promise<Brew | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("brews")
    .select("*")
    .eq("bean_id", beanId)
    .order("brewed_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("[journal] getLastBrewForBean", error);
    return null;
  }
  return data;
}

/** Quick stats for the account dashboard. */
export async function getJournalStats() {
  const supabase = createClient();
  const [{ count: brewCount }, { count: beanCount }, { data: last }] =
    await Promise.all([
      supabase.from("brews").select("*", { count: "exact", head: true }),
      supabase
        .from("beans")
        .select("*", { count: "exact", head: true })
        .is("archived_at", null),
      supabase
        .from("brews")
        .select("brewed_at, method, bean_id")
        .order("brewed_at", { ascending: false })
        .limit(1)
        .maybeSingle<Pick<Brew, "brewed_at" | "method" | "bean_id">>(),
    ]);
  return {
    brewCount: brewCount ?? 0,
    beanCount: beanCount ?? 0,
    lastBrewAt: last?.brewed_at ?? null,
    lastBrewMethod: last?.method ?? null,
  };
}

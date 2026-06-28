// Supabase types for the Nudo Journal schema.
// Hand-written for now; regenerate with `supabase gen types typescript`
// once the project + CLI are wired up:
//   supabase gen types typescript --project-id <id> > types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BrewMethod =
  | "espresso"
  | "pour-over"
  | "aeropress"
  | "french-press"
  | "moka-pot"
  | "drip-bag";

export type Profile = {
  id: string;
  display_name: string | null;
  timezone: string;
  created_at: string;
  updated_at: string;
};

export type Bean = {
  id: string;
  user_id: string;
  name: string;
  roaster: string | null;
  origin: string | null;
  process: string | null;
  roast_date: string | null; // ISO date
  bag_notes: string | null;
  my_notes: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
};

export type Brew = {
  id: string;
  user_id: string;
  bean_id: string | null;
  brewed_at: string;
  method: BrewMethod;
  dose_g: number | null;
  yield_g: number | null;
  time_s: number | null;
  grind_clicks: string | null;
  water_temp_c: number | null;
  gear_used: string | null;
  notes: string | null;
  variable_changed: string | null;
  rating: number | null; // 1..5
  would_brew_again: boolean | null;
  created_at: string;
  updated_at: string;
};

export type BrewInsert = Omit<
  Brew,
  "id" | "created_at" | "updated_at" | "user_id"
> & {
  user_id?: string; // server-side helpers fill this from session
};

export type BeanInsert = Omit<
  Bean,
  "id" | "created_at" | "updated_at" | "user_id" | "archived_at"
> & {
  user_id?: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      beans: {
        Row: Bean;
        Insert: BeanInsert;
        Update: Partial<Bean>;
        Relationships: [];
      };
      brews: {
        Row: Brew;
        Insert: BrewInsert;
        Update: Partial<Brew>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      brew_method: BrewMethod;
    };
    CompositeTypes: Record<string, never>;
  };
};

import { supabase } from "@/integrations/supabase/client";
import type { Category, Climate, Gender, Product } from "@/data/products";

export const BUCKET = "product-images";

export interface ProductRow {
  id: string;
  brand: string;
  name: string;
  description: string;
  image_path: string | null;
  category: string;
  gender: string | null;
  note_top: string | null;
  note_heart: string | null;
  note_base: string | null;
  climate: string | null;
  sort_order: number;
  published: boolean;
  sold_out: boolean;
}

const SIGNED_TTL = 60 * 60 * 24 * 7; // 7 dias

export async function signImages(paths: string[]): Promise<Record<string, string>> {
  const unique = Array.from(new Set(paths.filter(Boolean)));
  if (unique.length === 0) return {};
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrls(unique, SIGNED_TTL);
  if (error || !data) return {};
  const map: Record<string, string> = {};
  data.forEach((entry) => {
    if (entry.path && entry.signedUrl) map[entry.path] = entry.signedUrl;
  });
  return map;
}

export function rowToProduct(row: ProductRow, imageUrl: string): Product {
  const hasNotes = Boolean(row.note_top || row.note_heart || row.note_base);
  const product: Product = {
    id: row.id,
    brand: row.brand,
    name: row.name,
    description: row.description,
    image: imageUrl,
    category: row.category as Category,
  };
  if (row.gender) product.gender = row.gender as Gender;
  if (row.climate) product.climate = row.climate as Climate;
  if (row.sold_out) product.soldOut = true;
  if (hasNotes) {
    product.notes = {
      top: row.note_top ?? "",
      heart: row.note_heart ?? "",
      base: row.note_base ?? "",
    };
  }
  return product;
}

export async function fetchPublishedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  const rows = data as unknown as ProductRow[];
  const urls = await signImages(rows.map((r) => r.image_path ?? ""));
  return rows.map((r) => rowToProduct(r, r.image_path ? (urls[r.image_path] ?? "") : ""));
}

export async function fetchAllProducts(): Promise<{ rows: ProductRow[]; urls: Record<string, string> }> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  const rows = (data ?? []) as unknown as ProductRow[];
  const urls = await signImages(rows.map((r) => r.image_path ?? ""));
  return { rows, urls };
}

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

export async function isAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  return Boolean(data);
}

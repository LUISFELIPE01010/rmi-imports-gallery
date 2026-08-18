import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllProducts, isAdmin, uploadProductImage, type ProductRow } from "@/lib/catalog";
import { categoryLabel, type Category } from "@/data/products";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel do catálogo · RMI Imports" },
      { name: "description", content: "Cadastro e gestão dos produtos importados da RMI Imports." },
      { property: "og:title", content: "Painel do catálogo · RMI Imports" },
      { property: "og:description", content: "Cadastro e gestão dos produtos do catálogo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  ssr: false,
  component: AdminPage,
});

const categories: Category[] = ["perfumes", "bodysplash", "cremes", "eletronicos"];
const genders = ["", "masculino", "feminino", "unissex"] as const;

type Draft = {
  id?: string;
  brand: string;
  name: string;
  description: string;
  category: Category;
  gender: string;
  note_top: string;
  note_heart: string;
  note_base: string;
  sort_order: number;
  published: boolean;
  image_path: string | null;
};

const emptyDraft: Draft = {
  brand: "",
  name: "",
  description: "",
  category: "perfumes",
  gender: "",
  note_top: "",
  note_heart: "",
  note_base: "",
  sort_order: 0,
  published: true,
  image_path: null,
};

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";

function AdminPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "denied" | "ok">("loading");
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { rows: r, urls: u } = await fetchAllProducts();
    setRows(r);
    setUrls(u);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          navigate({ to: "/auth" });
          return;
        }
        const admin = await isAdmin(data.session.user.id);
        if (!admin) {
          setStatus("denied");
          return;
        }
        await load();
        setStatus("ok");
      } catch (err) {
        setMsg(err instanceof Error ? err.message : "Erro ao carregar produtos");
        setStatus("ok");
      }
    })();
  }, [load, navigate]);


  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      let imagePath = draft.image_path;
      if (file) imagePath = await uploadProductImage(file);

      const payload = {
        brand: draft.brand,
        name: draft.name,
        description: draft.description,
        category: draft.category,
        gender: draft.gender || null,
        note_top: draft.note_top || null,
        note_heart: draft.note_heart || null,
        note_base: draft.note_base || null,
        sort_order: Number(draft.sort_order) || 0,
        published: draft.published,
        image_path: imagePath,
      };

      if (draft.id) {
        const { error } = await supabase.from("products").update(payload).eq("id", draft.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }

      setDraft(emptyDraft);
      setFile(null);
      setMsg("Produto salvo com sucesso.");
      await load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const edit = (row: ProductRow) => {
    setDraft({
      id: row.id,
      brand: row.brand,
      name: row.name,
      description: row.description,
      category: row.category as Category,
      gender: row.gender ?? "",
      note_top: row.note_top ?? "",
      note_heart: row.note_heart ?? "",
      note_base: row.note_base ?? "",
      sort_order: row.sort_order,
      published: row.published,
      image_path: row.image_path,
    });
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (row: ProductRow) => {
    if (!window.confirm(`Excluir "${row.name}"?`)) return;
    await supabase.from("products").delete().eq("id", row.id);
    await load();
  };

  const togglePublished = async (row: ProductRow) => {
    await supabase.from("products").update({ published: !row.published }).eq("id", row.id);
    await load();
  };

  if (status === "loading") {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Carregando…</div>;
  }

  if (status === "denied") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="text-sm text-muted-foreground">Esta conta não tem permissão de administrador.</p>
        <button
          type="button"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-background"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-gold">Painel</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Catálogo RMI Imports</h1>
          </div>
          <div className="flex gap-3">
            <a
              href="/"
              className="rounded-full border border-border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground"
            >
              Ver site
            </a>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
              className="rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-background"
            >
              Sair
            </button>
          </div>
        </header>

        <form onSubmit={save} className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-bold text-foreground">
            {draft.id ? "Editar produto" : "Novo produto"}
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <input className={field} placeholder="Marca" value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })} />
            <input className={field} required placeholder="Nome do produto" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            <select className={field} value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as Category })}>
              {categories.map((c) => (
                <option key={c} value={c}>{categoryLabel[c]}</option>
              ))}
            </select>
            <select className={field} value={draft.gender} onChange={(e) => setDraft({ ...draft, gender: e.target.value })}>
              {genders.map((g) => (
                <option key={g} value={g}>{g === "" ? "Sem gênero" : g}</option>
              ))}
            </select>
            <textarea className={`${field} sm:col-span-2`} rows={2} placeholder="Descrição curta" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
            <input className={field} placeholder="Notas de topo" value={draft.note_top} onChange={(e) => setDraft({ ...draft, note_top: e.target.value })} />
            <input className={field} placeholder="Notas de coração" value={draft.note_heart} onChange={(e) => setDraft({ ...draft, note_heart: e.target.value })} />
            <input className={field} placeholder="Notas de fundo" value={draft.note_base} onChange={(e) => setDraft({ ...draft, note_base: e.target.value })} />
            <input className={field} type="number" placeholder="Ordem" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })} />
            <input className={field} type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} />
              Publicado no site
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className="rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-colors hover:bg-gold disabled:opacity-60">
              {saving ? "Salvando..." : draft.id ? "Salvar alterações" : "Adicionar produto"}
            </button>
            {draft.id && (
              <button type="button" onClick={() => { setDraft(emptyDraft); setFile(null); }} className="rounded-full border border-border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                Cancelar
              </button>
            )}
          </div>
          {msg && <p className="mt-4 text-[12px] text-muted-foreground">{msg}</p>}
        </form>

        <section className="mt-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{rows.length} produtos</p>
          <div className="mt-4 grid gap-3">
            {rows.map((row) => (
              <article key={row.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sand">
                  {row.image_path && urls[row.image_path] && (
                    <img src={urls[row.image_path]} alt={row.name} className="h-full w-full object-cover" loading="lazy" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{row.name}</p>
                  <p className="truncate text-[12px] text-muted-foreground">
                    {row.brand} · {categoryLabel[row.category as Category] ?? row.category}
                    {row.gender ? ` · ${row.gender}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => togglePublished(row)} className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] ${row.published ? "border-gold text-foreground" : "border-border text-muted-foreground"}`}>
                    {row.published ? "Publicado" : "Oculto"}
                  </button>
                  <button type="button" onClick={() => edit(row)} className="rounded-full border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-foreground">Editar</button>
                  <button type="button" onClick={() => remove(row)} className="rounded-full border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground">Excluir</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

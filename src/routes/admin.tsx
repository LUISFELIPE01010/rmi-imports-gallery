import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllProducts, isAdmin, uploadProductImage, type ProductRow } from "@/lib/catalog";
import {
  categoryLabel,
  climateLabel,
  filterGroups,
  formatPrice,
  type Category,
  type Climate,
  type FilterId,
} from "@/data/products";

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

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

const categories: Category[] = [
  "perfumes",
  "bodysplash",
  "cremes",
  "eletronicos",
  "kits",
  "colecoes",
  "diversos",
];
const genders = ["", "masculino", "feminino", "unissex"] as const;
const climates: Climate[] = ["calor", "frio", "versatil"];

type Draft = {
  id?: string;
  brand: string;
  name: string;
  description: string;
  category: Category;
  gender: string;
  climate: string;
  note_top: string;
  note_heart: string;
  note_base: string;
  sort_order: number;
  published: boolean;
  sold_out: boolean;
  price: string;
  image_path: string | null;
};

const emptyDraft: Draft = {
  brand: "",
  name: "",
  description: "",
  category: "perfumes",
  gender: "",
  climate: "",
  note_top: "",
  note_heart: "",
  note_base: "",
  sort_order: 0,
  published: true,
  sold_out: false,
  price: "0",
  image_path: null,
};

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-gold sm:py-2.5 sm:text-sm";

const rowMatchesFilter = (row: ProductRow, filter: FilterId) => {
  if (filter === "all") return true;
  const [category, gender] = filter.split("-");
  if (row.category !== category) return false;
  if (gender) return row.gender === gender || row.gender === "unissex";
  return true;
};

function AdminPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "denied" | "ok">("loading");
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);

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

  const activeGroup = filterGroups.find(
    (g) => g.id === filter || g.children?.some((c) => c.id === filter),
  );

  const visibleRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (!rowMatchesFilter(row, filter)) return false;
      if (!term) return true;
      return `${row.brand} ${row.name}`.toLowerCase().includes(term);
    });
  }, [rows, filter, search]);

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
        climate: draft.climate || null,
        note_top: draft.note_top || null,
        note_heart: draft.note_heart || null,
        note_base: draft.note_base || null,
        sort_order: Number(draft.sort_order) || 0,
        published: draft.published,
        sold_out: draft.sold_out,
        price: Number(String(draft.price).replace(",", ".")) || 0,
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
      setFormOpen(false);
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
      climate: row.climate ?? "",
      note_top: row.note_top ?? "",
      note_heart: row.note_heart ?? "",
      note_base: row.note_base ?? "",
      sort_order: row.sort_order,
      published: row.published,
      sold_out: row.sold_out ?? false,
      price: String(row.price ?? 0),
      image_path: row.image_path,
    });
    setFile(null);
    setFormOpen(true);
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

  const toggleSoldOut = async (row: ProductRow) => {
    await supabase.from("products").update({ sold_out: !row.sold_out }).eq("id", row.id);
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

  const pill = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
      active ? "border-ink bg-ink text-background" : "border-border bg-card text-muted-foreground"
    }`;

  return (
    <div className="min-h-screen bg-background pb-24 sm:pb-12">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
          <div className="min-w-0">
            <p className="eyebrow text-gold">Painel</p>
            <h1 className="truncate text-lg font-bold tracking-tight text-foreground sm:text-2xl">RMI Imports</h1>
          </div>
          <div className="flex shrink-0 gap-2">
            <a
              href="/"
              className="rounded-full border border-border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground sm:px-5 sm:text-[11px]"
            >
              Site
            </a>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
              className="rounded-full bg-ink px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-background sm:px-5 sm:text-[11px]"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mt-5 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-foreground">
            {draft.id ? "Editando produto" : "Novo produto"}
          </h2>
          <button
            type="button"
            onClick={() => {
              if (formOpen && draft.id) {
                setDraft(emptyDraft);
                setFile(null);
              }
              setFormOpen((v) => !v);
            }}
            className="rounded-full border border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground"
          >
            {formOpen ? "Fechar" : "Abrir"}
          </button>
        </div>

        {formOpen && (
          <form onSubmit={save} className="mt-3 rounded-3xl border border-border bg-card p-4 shadow-soft sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
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
              <select className={field} value={draft.climate} onChange={(e) => setDraft({ ...draft, climate: e.target.value })}>
                <option value="">Sem clima</option>
                {climates.map((c) => (
                  <option key={c} value={c}>{climateLabel[c]}</option>
                ))}
              </select>
              <input className={field} type="number" step="0.01" min="0" placeholder="Preço (R$)" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} />
              <input className={field} type="number" placeholder="Ordem" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })} />
              <textarea className={`${field} sm:col-span-2`} rows={2} placeholder="Descrição curta" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
              <input className={field} placeholder="Notas de topo" value={draft.note_top} onChange={(e) => setDraft({ ...draft, note_top: e.target.value })} />
              <input className={field} placeholder="Notas de coração" value={draft.note_heart} onChange={(e) => setDraft({ ...draft, note_heart: e.target.value })} />
              <input className={`${field} sm:col-span-2`} placeholder="Notas de fundo" value={draft.note_base} onChange={(e) => setDraft({ ...draft, note_base: e.target.value })} />
              <input className={`${field} sm:col-span-2`} type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />

              <label className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-sm text-foreground">
                Publicado no site
                <input className="h-5 w-5" type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-sm text-foreground">
                Esgotado
                <input className="h-5 w-5" type="checkbox" checked={draft.sold_out} onChange={(e) => setDraft({ ...draft, sold_out: e.target.checked })} />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button type="submit" disabled={saving} className="rounded-full bg-ink px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-colors hover:bg-gold disabled:opacity-60">
                {saving ? "Salvando..." : draft.id ? "Salvar alterações" : "Adicionar produto"}
              </button>
              {draft.id && (
                <button type="button" onClick={() => { setDraft(emptyDraft); setFile(null); }} className="rounded-full border border-border px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                  Cancelar edição
                </button>
              )}
            </div>
            {msg && <p className="mt-4 text-[12px] text-muted-foreground">{msg}</p>}
          </form>
        )}

        <section className="mt-8">
          <input
            className={field}
            placeholder="Buscar por nome ou marca"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
            {filterGroups.map((group) => (
              <button key={group.id} type="button" onClick={() => setFilter(group.id)} className={pill(filter === group.id)}>
                {group.label}
              </button>
            ))}
          </div>

          {activeGroup?.children && (
            <div className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
              {activeGroup.children.map((child) => (
                <button key={child.id} type="button" onClick={() => setFilter(child.id)} className={pill(filter === child.id)}>
                  {child.label}
                </button>
              ))}
            </div>
          )}

          <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {visibleRows.length} de {rows.length} produtos
          </p>

          <div className="mt-3 grid gap-3">
            {visibleRows.map((row) => (
              <article key={row.id} className="rounded-2xl border border-border bg-card p-3 sm:p-4">
                <div className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sand sm:h-20 sm:w-20">
                    {row.image_path && urls[row.image_path] && (
                      <img src={urls[row.image_path]} alt={row.name} className="h-full w-full object-cover" loading="lazy" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{row.name}</p>
                    <p className="truncate text-[12px] text-muted-foreground">
                      {row.brand} · {categoryLabel[row.category as Category] ?? row.category}
                      {row.gender ? ` · ${row.gender}` : ""}
                      {row.climate ? ` · ${climateLabel[row.climate as Climate] ?? row.climate}` : ""}
                    </p>
                    <p className="mt-0.5 text-[12px] font-semibold text-foreground">{formatPrice(Number(row.price ?? 0))}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <span className={`rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] ${row.published ? "bg-gold/15 text-foreground" : "bg-muted text-muted-foreground"}`}>
                        {row.published ? "Publicado" : "Arquivado"}
                      </span>
                      {row.sold_out && (
                        <span className="rounded-full bg-ink px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-background">
                          Esgotado
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  <button type="button" onClick={() => edit(row)} className="rounded-full border border-border px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
                    Editar
                  </button>
                  <button type="button" onClick={() => toggleSoldOut(row)} className={`rounded-full border px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${row.sold_out ? "border-ink bg-ink text-background" : "border-border text-foreground"}`}>
                    {row.sold_out ? "Repor estoque" : "Esgotado"}
                  </button>
                  <button type="button" onClick={() => togglePublished(row)} className={`rounded-full border px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${row.published ? "border-gold text-foreground" : "border-border text-muted-foreground"}`}>
                    {row.published ? "Arquivar" : "Publicar"}
                  </button>
                  <button type="button" onClick={() => remove(row)} className="rounded-full border border-border px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {!formOpen && (
        <button
          type="button"
          onClick={() => { setDraft(emptyDraft); setFile(null); setFormOpen(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="fixed bottom-5 right-5 z-40 rounded-full bg-ink px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-background shadow-lift sm:hidden"
        >
          + Produto
        </button>
      )}
    </div>
  );
}

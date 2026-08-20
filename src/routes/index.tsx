import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollCue } from "@/components/ScrollCue";
import { ProductCard } from "@/components/ProductCard";
import {
  filterGroups,
  matchesFilter,
  products,
  WHATSAPP_NUMBER,
  type FilterId,
  type Product,
} from "@/data/products";
import { fetchPublishedProducts } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [
      { title: "RMI Imports · Loja de Importados" },
      {
        name: "description",
        content:
          "Catálogo RMI Imports: perfumes importados, bodysplash, cremes e eletrônicos selecionados. Consulte pelo WhatsApp.",
      },
      { property: "og:title", content: "RMI Imports · Loja de Importados" },
      {
        property: "og:description",
        content: "Perfumes, bodysplash, cremes e eletrônicos importados com exclusividade.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: "RMI Imports",
          description:
            "Loja de importados: perfumes, bodysplash, cremes, eletrônicos e kits.",
          areaServed: "Baixada Santista, SP",
          sameAs: ["https://www.instagram.com/rmi.imports/"],
        }),
      },
    ],
  }),
  component: Index,
});


const feedbacks = [
  {
    text: "Produto original, lacrado e chegou antes do prazo. Atendimento nota 10 pelo WhatsApp.",
    author: "Luis Felipe",
    city: "Santos, SP",
  },
  {
    text: "Já é minha terceira compra. Sempre encontram o importado que eu procuro.",
    author: "William Rezende",
    city: "Cubatão, SP",
  },
  {
    text: "Perfume idêntico ao que comprei fora do país, e por um preço bem melhor.",
    author: "Felipe Mendes",
    city: "São Vicente, SP",
  },
  {
    text: "Entrega super rápida na Baixada Santista. Compro sempre que preciso de presente.",
    author: "Kawan Martins",
    city: "Santos, SP",
  },
  {
    text: "Atendimento personalizado e produtos de qualidade. Recomendo demais.",
    author: "Carol Franck",
    city: "Cubatão, SP",
  },
  {
    text: "Melhor custo-benefício de importados na região. Confio de olhos fechados.",
    author: "Thiago Brito",
    city: "São Vicente, SP",
  },
  {
    text: "Excelente variedade e preços justos. Compro sempre que posso na RMI Imports.",
    author: "Cassio Guilherme",
    city: "Santos, SP",
  },
];

function Index() {
  const [active, setActive] = useState<FilterId>("all");
  const [remote, setRemote] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let alive = true;
    fetchPublishedProducts()
      .then((list) => {
        if (alive) setRemote(list);
      })
      .catch(() => undefined)
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const [fading, setFading] = useState(false);

  const change = (id: FilterId) => {
    if (id === active) return;
    setFading(true);
    window.setTimeout(() => {
      setActive(id);
      setFading(false);
    }, 180);
  };

  const parent = active.split("-")[0] as FilterId;
  const activeGroup = filterGroups.find((g) => g.id === parent);
  const catalog = remote ?? products;

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return catalog.filter((p) => {
      if (!matchesFilter(p, active)) return false;
      if (!term) return true;
      return `${p.brand} ${p.name} ${p.description}`.toLowerCase().includes(term);
    });
  }, [catalog, active, query]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />

        {/* Filtros + catálogo */}
        <div className="sticky top-[72px] z-40 border-y border-border bg-background/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 pt-3 sm:px-8">
            <label className="relative flex w-full items-center">
              <Search
                className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground"
                strokeWidth={1.6}
              />
              <span className="sr-only">Buscar produtos</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por marca, produto..."
                className="h-10 w-full rounded-full border border-border bg-card pl-10 pr-9 text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Limpar busca"
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" strokeWidth={1.8} />
                </button>
              )}
            </label>
          </div>
          <div className="mx-auto max-w-7xl overflow-x-auto px-5 py-3.5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            <div className="flex w-max gap-2">
              {filterGroups.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => change(f.id)}
                  className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                    parent === f.id
                      ? "border-ink bg-ink text-background"
                      : "border-border bg-card text-muted-foreground hover:border-gold hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {activeGroup?.children && (
            <div className="border-t border-border/70">
              <div className="mx-auto max-w-7xl overflow-x-auto px-5 py-2.5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex w-max items-center gap-2">
                  <button
                    type="button"
                    onClick={() => change(activeGroup.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                      active === activeGroup.id
                        ? "bg-gold/20 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Todos
                  </button>
                  {activeGroup.children.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => change(c.id)}
                      className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                        active === c.id
                          ? "bg-gold/20 text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <section id="catalogo" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold">Catálogo completo</p>
              <h2 className="display-serif mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-foreground">
                Todos os produtos
              </h2>
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {visible.length} itens
            </p>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-3xl border border-border bg-card"
                >
                  <div className="aspect-[4/5] rounded-3xl bg-sand/60" />
                  <div className="space-y-2 p-3">
                    <div className="h-2 w-1/2 rounded bg-sand/60" />
                    <div className="h-3 w-3/4 rounded bg-sand/60" />
                  </div>
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center text-sm text-muted-foreground">
              {query.trim()
                ? `Nenhum resultado para “${query.trim()}”.`
                : "Nenhum produto disponível nesta categoria no momento."}
            </p>

          ) : (
            <div
              className={`grid grid-cols-2 items-start gap-3 transition-opacity duration-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 ${
                fading ? "opacity-0" : "opacity-100"
              }`}
            >
              {visible.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Feedbacks */}
        <section className="overflow-hidden border-t border-border bg-sand/50 pb-16">
          <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8">
            <p className="eyebrow text-gold">Quem já comprou</p>
            <h2 className="display-serif mt-4 text-[clamp(1.6rem,3.5vw,2.4rem)] text-foreground">
              Clientes da Baixada Santista
            </h2>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-sand/50 to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-sand/50 to-transparent sm:w-16" />

            <div className="marquee-track flex w-max gap-5 px-5 sm:px-8">
              {[...feedbacks, ...feedbacks].map((f, i) => (
                <figure
                  key={`${f.author}-${i}`}
                  className="w-[300px] shrink-0 rounded-2xl border border-border bg-card p-6 shadow-soft sm:w-[360px]"
                >
                  <blockquote className="text-[13px] leading-relaxed text-muted-foreground">
                    “{f.text}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-foreground">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-background font-bold text-[10px]">
                      {f.author.charAt(0)}
                    </span>
                    <span>
                      {f.author}
                      <span className="ml-2 normal-case tracking-normal text-muted-foreground">
                        {f.city}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-ink">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow text-gold">Fale com a gente</p>
              <h2 className="display-serif mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-background">
                Procurando algo específico?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-background/60">
                Perfumes, bodysplash, cremes ou eletrônicos: consulte disponibilidade pelo WhatsApp.
              </p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, quero ajuda para encontrar um importado")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-gold px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-gold-soft"
            >
              Consultar no WhatsApp <span>→</span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

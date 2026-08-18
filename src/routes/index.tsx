import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { filters, products, WHATSAPP_NUMBER, type FilterId } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RMI Imports · Loja de Importados" },
      {
        name: "description",
        content:
          "Catálogo RMI Imports: perfumes importados árabes e europeus, relógios, celulares e eletrônicos selecionados. Consulte pelo WhatsApp.",
      },
      { property: "og:title", content: "RMI Imports · Loja de Importados" },
      {
        property: "og:description",
        content:
          "Perfumes árabes e europeus, relógios e eletrônicos importados com exclusividade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const hashToFilter: Record<string, FilterId> = {
  "#perfumes": "all",
  "#relogios": "relogios",
  "#celulares": "celulares",
  "#outros": "outros",
};

const collections: { id: FilterId; title: string; sub: string }[] = [
  { id: "perfumes", title: "Perfumes", sub: "Árabes e europeus" },
  { id: "relogios", title: "Relógios", sub: "Peças selecionadas" },
  { id: "celulares", title: "Celulares", sub: "Lacrados e originais" },
];

function Index() {
  const [active, setActive] = useState<FilterId>("all");
  const [fading, setFading] = useState(false);

  const change = (id: FilterId) => {
    if (id === active) return;
    setFading(true);
    window.setTimeout(() => {
      setActive(id);
      setFading(false);
    }, 180);
  };

  useEffect(() => {
    const onHash = () => {
      const next = hashToFilter[window.location.hash];
      if (next) change(next);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  });

  const visible =
    active === "all"
      ? products
      : products.filter((p) => p.tags.includes(active) || p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />

        {/* Categorias */}
        <section id="colecoes" className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
            <div className="grid gap-3 sm:grid-cols-3">
              {collections.map((c) => {
                const img = products.find((p) => p.category === c.id)?.image;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      change(c.id);
                      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group relative flex items-center gap-4 overflow-hidden border border-border bg-card p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-soft"
                  >
                    {img && (
                      <img
                        src={img}
                        alt={c.title}
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-16 shrink-0 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-bold tracking-tight text-foreground">
                        {c.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{c.sub}</span>
                    </span>
                    <span className="ml-auto text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filtros + catálogo */}
        <div className="sticky top-[72px] z-40 border-y border-border bg-background/90 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl overflow-x-auto px-5 py-3.5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => change(f.id)}
                  className={`whitespace-nowrap rounded-sm border px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                    active === f.id
                      ? "border-ink bg-ink text-background"
                      : "border-border bg-card text-muted-foreground hover:border-gold hover:text-foreground"
                  }`}
                >
                  {f.id === "all" ? "Todos" : f.label}
                </button>
              ))}
            </div>
          </div>
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
          <div
            className={`grid grid-cols-1 gap-5 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-4 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
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
                Perfumes, relógios, celulares ou qualquer outro importado: consulte disponibilidade pelo WhatsApp.
              </p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, quero ajuda para encontrar um importado")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-3 rounded-sm bg-gold px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-gold-soft"
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

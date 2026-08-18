import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { filters, products, type FilterId } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RMI Imports · Perfumes e Importados de Luxo" },
      {
        name: "description",
        content:
          "Catálogo RMI Imports: perfumes importados, relógios, celulares e eletrônicos selecionados. Consulte pelo WhatsApp.",
      },
      { property: "og:title", content: "RMI Imports · Perfumes e Importados de Luxo" },
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
    active === "all" ? products : products.filter((p) => p.tags.includes(active));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />

        <div className="sticky top-[73px] z-40 border-b border-border bg-background/90 backdrop-blur-md">
          <div className="mx-auto max-w-7xl overflow-x-auto px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-3">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => change(f.id)}
                  className={`whitespace-nowrap rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    active === f.id
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-accent/40 text-muted-foreground hover:text-accent"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section id="perfumes" className="mx-auto max-w-7xl px-6 py-24">
          <div
            className={`grid grid-cols-1 gap-6 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-4 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

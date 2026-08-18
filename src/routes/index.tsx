import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { filters, products, WHATSAPP_NUMBER, type FilterId } from "@/data/products";
import editorialStill from "@/assets/editorial-still.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RMI Imports · Perfumes e Importados de Luxo" },
      {
        name: "description",
        content:
          "Catálogo RMI Imports: perfumes importados árabes e europeus, relógios, celulares e eletrônicos selecionados. Consulte pelo WhatsApp.",
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

const promises = [
  { t: "Originais", d: "Produtos lacrados, importados e conferidos peça a peça." },
  { t: "Curadoria", d: "Seleção limitada — só entra o que vale a pena." },
  { t: "Fixação real", d: "Fragrâncias testadas em clima brasileiro." },
  { t: "Atendimento", d: "Consultoria direta no WhatsApp, resposta em 24h." },
];

const collections: { id: FilterId; title: string; sub: string }[] = [
  { id: "masculino", title: "Para Ele", sub: "Marcante. Confiante. Atemporal." },
  { id: "feminino", title: "Para Ela", sub: "Elegante. Feminino. Radiante." },
  { id: "unissex", title: "Unissex", sub: "Equilibrado. Único. Seu." },
];

const testimonials = [
  { q: "Chegou lacrado e a fixação é absurda. Já é meu perfume fixo.", a: "Bruno L." },
  { q: "Atendimento impecável, me ajudaram a escolher pelo WhatsApp.", a: "Sofia M." },
  { q: "Comprei um relógio e veio melhor do que nas fotos.", a: "Daniel K." },
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
    active === "all" ? products : products.filter((p) => p.tags.includes(active));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />

        {/* Promessas */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {promises.map((p) => (
              <div key={p.t} className="flex gap-4">
                <span className="mt-1 h-8 w-8 shrink-0 rounded-full border border-gold/50 bg-sand" />
                <div>
                  <p className="text-[13px] font-semibold text-foreground">{p.t}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial */}
        <section id="sobre" className="bg-sand">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
            <div>
              <p className="eyebrow text-gold">Nossa promessa</p>
              <h2 className="display-serif mt-5 text-[clamp(2.2rem,5vw,3.6rem)] text-foreground">
                A arte da
                <br />
                perfumaria fina
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Cada frasco é uma composição de matérias-primas raras, técnica apurada e
                elegância que não passa de moda. Trabalhamos com casas árabes e europeias
                reconhecidas pela intensidade e longevidade das suas criações.
              </p>
              <a
                href="#catalogo"
                className="mt-8 inline-flex items-center gap-3 border-b border-foreground/30 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                Explorar catálogo <span>→</span>
              </a>
            </div>
            <img
              src={editorialStill}
              alt="Frasco de perfume importado sobre pedestal de mármore"
              loading="lazy"
              decoding="async"
              width={1024}
              height={768}
              className="w-full object-cover shadow-soft"
            />
          </div>
        </section>

        {/* Coleções */}
        <section id="colecoes" className="bg-background">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:items-end">
              <div>
                <p className="eyebrow text-gold">Coleções</p>
                <h2 className="display-serif mt-5 text-[clamp(2rem,4.5vw,3.2rem)] text-foreground">
                  Encontre a sua
                  <br />
                  assinatura olfativa
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Do fresco ao intenso: fragrâncias pensadas para cada personalidade e ocasião.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {collections.map((c) => {
                  const img = products.find((p) => p.tags.includes(c.id))?.image;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        change(c.id);
                        document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="group relative aspect-[3/4] overflow-hidden bg-ink text-left"
                    >
                      {img && (
                        <img
                          src={img}
                          alt={c.title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-[900ms] ease-out group-hover:scale-105 group-hover:opacity-90"
                        />
                      )}
                      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                      <span className="absolute inset-x-0 bottom-0 p-5">
                        <span className="block font-display text-2xl text-background">
                          {c.title}
                        </span>
                        <span className="mt-1 block text-[11px] text-background/60">{c.sub}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
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
              <p className="eyebrow text-gold">Bestsellers</p>
              <h2 className="display-serif mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-foreground">
                O catálogo
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

        {/* Depoimentos */}
        <section className="bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <p className="eyebrow text-gold">O que dizem</p>
            <h2 className="display-serif mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-foreground">
              Amaram cada nota
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.a} className="border border-border bg-card p-7">
                  <div className="text-sm tracking-[0.3em] text-gold">★★★★★</div>
                  <blockquote className="mt-5 font-display text-xl leading-snug text-foreground">
                    “{t.q}”
                  </blockquote>
                  <figcaption className="mt-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    — {t.a}
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
              <p className="eyebrow text-gold">Fale com a curadoria</p>
              <h2 className="display-serif mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-background">
                Não sabe qual escolher?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-background/60">
                Conte seu estilo e ocasião — indicamos a fragrância certa para você.
              </p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, quero ajuda para escolher uma fragrância")}`}
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

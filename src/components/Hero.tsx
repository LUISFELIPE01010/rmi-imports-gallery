const marquee = [
  "Perfumes importados",
  "Relógios",
  "Celulares",
  "Entrega para todo o Brasil",
  "100% originais",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-24">
      <div className="hero-aurora pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-shimmer pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 sm:py-32 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:py-40">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Curadoria RMI
          </span>

          <h1 className="display-tight mt-8 max-w-[15ch] text-[clamp(2.4rem,6vw,5rem)] text-foreground">
            Importados
            <br />
            <span className="text-accent">com exclusividade</span>
          </h1>

          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            Seleção limitada de fragrâncias, relógios e eletrônicos originais.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 lg:mb-4">
          {[
            { n: "10+", l: "Produtos" },
            { n: "100%", l: "Originais" },
            { n: "24h", l: "Resposta" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur transition-shadow duration-300 hover:shadow-soft"
            >
              <p className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                {s.n}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-border bg-primary py-3">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((t, i) => (
            <span
              key={i}
              className="text-[11px] font-medium uppercase tracking-[0.3em] text-primary-foreground/80"
            >
              {t} <span className="text-accent">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

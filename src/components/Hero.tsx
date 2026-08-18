export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-aurora absolute inset-0" aria-hidden="true" />
      <div className="hero-shimmer absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[78vh] max-w-5xl flex-col items-center justify-center px-6 py-40 text-center">
        <h1 className="font-serif text-4xl font-extralight leading-[1.15] tracking-wide text-foreground sm:text-6xl lg:text-7xl">
          Importados com exclusividade
        </h1>
        <p className="mt-10 text-[11px] uppercase tracking-[0.42em] text-accent">
          Perfumes · Relógios · Eletrônicos
        </p>
      </div>
    </section>
  );
}

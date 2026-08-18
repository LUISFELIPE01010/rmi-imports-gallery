import heroModel from "@/assets/hero-model.jpg";
import { WHATSAPP_NUMBER } from "@/data/products";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <img
        src={heroModel}
        alt="Produtos importados selecionados pela RMI Imports"
        width={1280}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-90"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70"
        aria-hidden="true"
      />
      <div className="gold-sheen pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-14 pt-32 sm:px-8 sm:pb-20 lg:min-h-[88vh]">
        <div className="max-w-2xl rise-in">
          <p className="eyebrow text-gold">RMI Imports</p>

          <h1 className="display-serif mt-5 text-[clamp(2.8rem,8.5vw,5.6rem)] text-background">
            Importados
            <br />
            <span className="text-gold">com exclusividade.</span>
          </h1>

          <p className="mt-7 max-w-md text-sm leading-relaxed text-background/65 sm:text-base">
            Perfumes, relógios, celulares e eletrônicos importados. Originais, lacrados e
            entregues com discrição.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#catalogo"
              className="group inline-flex items-center gap-3 rounded-sm bg-gold px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink transition-all duration-300 hover:bg-gold-soft"
            >
              Ver catálogo
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, quero conhecer os importados")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-background/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-background transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Falar no WhatsApp
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}

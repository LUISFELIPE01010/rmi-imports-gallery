import heroModel from "@/assets/hero-model.jpg";
import { WHATSAPP_NUMBER } from "@/data/products";

const press = ["GQ", "VOGUE", "Forbes", "Esquire", "HYPEBEAST"];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <img
        src={heroModel}
        alt="Homem elegante aplicando perfume importado"
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
          <p className="eyebrow text-gold">Curadoria RMI</p>

          <h1 className="display-serif mt-5 text-[clamp(2.8rem,8.5vw,5.6rem)] text-background">
            Importados
            <br />
            <span className="italic text-gold">com exclusividade.</span>
          </h1>

          <p className="mt-7 max-w-md text-sm leading-relaxed text-background/65 sm:text-base">
            Fragrâncias raras, relógios e eletrônicos selecionados peça a peça. Originais,
            lacrados e entregues com discrição.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#catalogo"
              className="group inline-flex items-center gap-3 rounded-sm bg-gold px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-gold-soft"
            >
              Ver catálogo
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, quero uma indicação de fragrância")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-background/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Falar no WhatsApp
            </a>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["#8c6a4a", "#4a5a6b", "#6b4a5a"].map((c) => (
                <span
                  key={c}
                  style={{ backgroundColor: c }}
                  className="h-8 w-8 rounded-full border-2 border-ink"
                />
              ))}
            </div>
            <p className="text-[11px] leading-snug text-background/60">
              <span className="block font-semibold text-background">Centenas de clientes</span>
              atendidos em todo o Brasil
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-6 sm:px-8">
          {press.map((p) => (
            <span
              key={p}
              className="font-display text-lg tracking-[0.15em] text-background/35 transition-colors duration-300 hover:text-background/70 sm:text-xl"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { Snowflake, Sun, SunSnow } from "lucide-react";
import { categoryLabel, climateLabel, formatPrice, type Climate, type Product, whatsappLink } from "@/data/products";

const climateIcon: Record<Climate, typeof Sun> = {
  calor: Sun,
  frio: Snowflake,
  versatil: SunSnow,
};

function ClimateBadge({ climate }: { climate: Climate }) {
  const Icon = climateIcon[climate];
  return (
    <span
      title={`Indicado para ${climateLabel[climate].toLowerCase()}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.12em]"
    >
      <Icon className="h-3.5 w-3.5 text-gold sm:h-4 sm:w-4" strokeWidth={1.8} aria-hidden="true" />
      {climateLabel[climate]}
    </span>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.06c-.24.68-1.4 1.31-1.94 1.36-.5.05-.98.24-3.3-.69-2.77-1.09-4.53-3.9-4.67-4.08-.14-.18-1.12-1.49-1.12-2.85s.71-2.03.97-2.3c.25-.28.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4-.07.62.48.24.57.8 1.97.87 2.11.07.14.12.31.02.5-.09.18-.14.29-.28.45-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.21 1.36.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.18-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.32.07.12.07.66-.17 1.34Z" />
    </svg>
  );
}

function Note({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-0.5">
      <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-gold">{label}</span>
      <span className="min-w-0 text-[11px] leading-relaxed text-muted-foreground sm:text-[12px]">{value}</span>
    </div>
  );
}

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${(index % 4) * 70}ms` }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lift sm:rounded-3xl ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-sand sm:rounded-3xl">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-ink/85 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-gold sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[10px] sm:tracking-[0.16em]">
          {categoryLabel[product.category]}
        </span>
        {product.soldOut && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-background/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground shadow-soft sm:right-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[10px]">
            Esgotado
          </span>
        )}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading={index < 4 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index < 4 ? "high" : "low"}
            sizes="(max-width: 640px) 46vw, (max-width: 768px) 46vw, 320px"
            width={768}
            height={768}
            className={`h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 ${product.soldOut ? "opacity-60 grayscale" : ""}`}
          />
        ) : (
          <span className="px-4 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Imagem em breve
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 border-t border-border p-3 sm:gap-3 sm:p-4 lg:p-5">
        <p className="eyebrow text-muted-foreground">{product.brand}</p>
        <h3 className="font-display text-[15px] font-bold leading-tight tracking-tight text-foreground sm:text-base lg:text-lg">
          {product.name}
        </h3>
        {typeof product.price === "number" && (
          <p className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {formatPrice(product.price)}
          </p>
        )}

        {product.climate && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <ClimateBadge climate={product.climate} />
          </div>
        )}

        {(product.description || product.notes) && (
          <div className="mt-0.5">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {open ? "Ocultar" : "Ver descrição"}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${open ? "mt-2.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <div className="space-y-2.5 border-t border-border pt-2.5">
                  {product.description && (
                    <p className="text-[12px] leading-relaxed text-muted-foreground sm:text-[13px]">
                      {product.description}
                    </p>
                  )}
                  {product.notes && (
                    <div className="grid gap-2 rounded-xl bg-sand/60 p-2.5">
                      <Note label="Topo" value={product.notes.top} />
                      <Note label="Corpo" value={product.notes.heart} />
                      <Note label="Fundo" value={product.notes.base} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <a
          href={whatsappLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:h-11 sm:gap-2 sm:px-5 sm:text-[11px] sm:tracking-[0.16em] ${
            product.soldOut
              ? "border-border bg-transparent text-muted-foreground hover:border-ink hover:text-foreground"
              : "border-ink bg-ink text-background hover:border-gold hover:bg-gold hover:text-ink"
          }`}
        >
          <WhatsAppIcon />
          {product.soldOut ? "Avise-me" : "Consultar"}
        </a>
      </div>
    </article>
  );
}

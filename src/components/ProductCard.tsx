import { useEffect, useRef, useState } from "react";
import { Snowflake, Sun, SunSnow } from "lucide-react";
import { categoryLabel, climateLabel, type Climate, type Product, whatsappLink } from "@/data/products";

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
      className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground"
    >
      <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} aria-hidden="true" />
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
  return (
    <div className="flex gap-2 text-[11px] leading-relaxed">
      <span className="w-11 shrink-0 uppercase tracking-[0.12em] text-gold">{label}</span>
      <span className="min-w-0 text-muted-foreground">{value}</span>
    </div>
  );
}

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

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
      className={`group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lift ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl bg-sand">
        <span className="absolute left-4 top-4 z-10 rounded-full bg-ink/85 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold">
          {categoryLabel[product.category]}
        </span>
        <img
          src={product.image}
          alt={product.name}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={index < 4 ? "high" : "low"}
          sizes="(max-width: 768px) 90vw, 320px"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-border p-6">
        <p className="eyebrow text-muted-foreground">{product.brand}</p>
        <h3 className="font-display text-lg font-bold tracking-tight leading-tight text-foreground">
          {product.name}
        </h3>
        <p className="text-[13px] leading-relaxed text-muted-foreground">{product.description}</p>

        {product.notes && (
          <div className="mt-2 space-y-1.5 border-t border-border pt-4">
            <Note label="Topo" value={product.notes.top} />
            <Note label="Corpo" value={product.notes.heart} />
            <Note label="Fundo" value={product.notes.base} />
          </div>
        )}

        <a
          href={whatsappLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-ink bg-ink px-4 py-3.5 pt-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
        >
          <WhatsAppIcon />
          Consultar
        </a>
      </div>
    </article>
  );
}

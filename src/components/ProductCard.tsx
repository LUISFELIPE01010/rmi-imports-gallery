import { useEffect, useRef, useState } from "react";
import { type Product, whatsappLink } from "@/data/products";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.06c-.24.68-1.4 1.31-1.94 1.36-.5.05-.98.24-3.3-.69-2.77-1.09-4.53-3.9-4.67-4.08-.14-.18-1.12-1.49-1.12-2.85s.71-2.03.97-2.3c.25-.28.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4-.07.62.48.24.57.8 1.97.87 2.11.07.14.12.31.02.5-.09.18-.14.29-.28.45-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.21 1.36.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.18-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.32.07.12.07.66-.17 1.34Z" />
    </svg>
  );
}

function Note({ symbol, label, value }: { symbol: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
      <span className="text-accent shrink-0">{symbol}</span>
      <span className="min-w-0">
        <span className="uppercase tracking-[0.14em] text-muted-foreground/70">{label}</span>{" "}
        <span>{value}</span>
      </span>
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
      style={{ transitionDelay: `${(index % 4) * 90}ms` }}
      className={`group flex flex-col rounded-sm border border-border bg-card transition-all duration-700 ease-out hover:border-accent/40 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="flex items-center justify-center p-8">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-44 w-auto object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-6 pb-6">
        <p className="text-[10px] uppercase tracking-[0.28em] text-accent">{product.brand}</p>
        <h3 className="font-serif text-xl font-light leading-tight text-foreground">
          {product.name}
        </h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">{product.description}</p>

        {product.notes && (
          <div className="mt-2 space-y-1.5 border-t border-border/60 pt-4">
            <Note symbol="♦" label="Saída" value={product.notes.top} />
            <Note symbol="♥" label="Corpo" value={product.notes.heart} />
            <Note symbol="●" label="Fundo" value={product.notes.base} />
          </div>
        )}

        <a
          href={whatsappLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded-sm border border-accent px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
        >
          <WhatsAppIcon />
          Consultar no WhatsApp
        </a>
      </div>
    </article>
  );
}

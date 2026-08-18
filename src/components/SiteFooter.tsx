import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/data/products";

export function SiteFooter() {
  return (
    <footer id="contato" className="bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-[-0.02em] text-background">
            RMI
          </p>
          <p className="eyebrow mt-1 text-gold">imports</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-gold-soft"
          >
            WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-background/25 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-5 py-5 text-[11px] text-background/40 sm:px-8">
          © {new Date().getFullYear()} RMI Imports
        </div>
      </div>
    </footer>
  );
}

import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/data/products";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-9.414h-.004A9.06 9.06 0 0011.5 5a9.06 9.06 0 00-6.403 2.644A9.06 9.06 0 002.45 14.05a9.06 9.06 0 001.09 4.362L2.5 21.5l3.178-.833a9.06 9.06 0 004.323 1.105h.004A9.06 9.06 0 0011.5 21.5a9.06 9.06 0 006.403-2.644A9.06 9.06 0 0020.55 14.05a9.06 9.06 0 00-2.644-6.403A9.06 9.06 0 0011.5 5m0 1.5a7.56 7.56 0 015.344 2.215A7.56 7.56 0 0119.05 14.05a7.56 7.56 0 01-2.206 5.335A7.56 7.56 0 0111.5 21.5a7.56 7.56 0 01-3.69-.96l-.265-.14-1.87.49.5-1.82-.175-.275a7.56 7.56 0 01-1.104-3.745 7.56 7.56 0 012.206-5.335A7.56 7.56 0 0111.5 6.5" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer id="contato" className="bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-xl font-extrabold tracking-[-0.02em] text-background">
            RMI
          </p>
          <p className="eyebrow mt-0.5 text-gold">imports</p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink transition-colors duration-300 hover:bg-gold-soft"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-background/25 text-background transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-5 py-4 text-[11px] text-background/40 sm:px-8">
          © {new Date().getFullYear()} RMI Imports
        </div>
      </div>
    </footer>
  );
}

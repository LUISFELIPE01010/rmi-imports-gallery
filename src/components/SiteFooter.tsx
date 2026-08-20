import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/data/products";
import { Instagram, MessageCircle } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer id="contato" className="bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center">
          <img
            src={logoAsset.url}
            alt="RMI Imports"
            className="h-9 w-auto object-contain sm:h-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-background/25 text-background transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-background/25 text-background transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <Instagram className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </a>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-5 py-3 text-[11px] text-background/40 sm:px-8">
          <span className="flex items-center justify-between gap-4">
            <span>© {new Date().getFullYear()} RMI Imports</span>
            <a
              href="/admin"
              className="text-background/35 transition-colors hover:text-gold"
            >
              Admin
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

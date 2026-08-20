import { useEffect, useState } from "react";
import { WHATSAPP_NUMBER } from "@/data/products";
import logoAsset from "@/assets/logo.png.asset.json";

const links = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-ink-soft/60 bg-ink/95 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center">
          <img
            src={logoAsset.url}
            alt="RMI Imports"
            className="h-16 w-auto object-contain sm:h-20"
          />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[13px] font-normal text-background/70 transition-colors duration-300 hover:text-background after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, quero conhecer o catálogo RMI Imports")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-sm bg-gold px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:bg-gold-soft sm:inline-flex"
          >
            Consultar
          </a>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-background md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-3 h-px w-5 bg-current transition-all duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-ink-soft/60 bg-ink/98 backdrop-blur-xl transition-all duration-400 md:hidden ${
          open ? "max-h-72" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col px-6 py-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink-soft/50 py-3.5 font-display text-xl font-semibold text-background/85 last:border-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

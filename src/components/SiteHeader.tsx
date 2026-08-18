import { useState } from "react";

const links = [
  { label: "Perfumes", href: "#perfumes" },
  { label: "Relógios", href: "#relogios" },
  { label: "Celulares", href: "#celulares" },
  { label: "Outros", href: "#outros" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/75 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4">
        <a href="#top" className="min-w-0 truncate">
          <span className="font-display text-lg font-extrabold uppercase tracking-[-0.02em] text-foreground">
            RMI
          </span>
          <span className="ml-2 text-[11px] uppercase tracking-[0.34em] text-muted-foreground">
            Imports
          </span>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-border md:hidden"
        >
          <span
            className={`h-px w-4 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-4 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-border transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 py-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-lg font-bold uppercase tracking-tight text-foreground transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

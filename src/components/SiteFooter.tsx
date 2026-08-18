import { WHATSAPP_NUMBER } from "@/data/products";

const columns = [
  {
    title: "Catálogo",
    items: ["Perfumes", "Relógios", "Celulares", "Outros importados"],
  },
  {
    title: "Empresa",
    items: ["Sobre a RMI", "Autenticidade", "Como comprar", "Novidades"],
  },
  {
    title: "Ajuda",
    items: ["Dúvidas frequentes", "Prazos de entrega", "Encomendas", "Contato"],
  },
];

export function SiteFooter() {
  return (
    <footer id="contato" className="bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="font-display text-3xl font-extrabold tracking-[-0.02em] text-background">RMI</p>
          <p className="eyebrow mt-1 text-gold">imports</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-background/55">
            Importados originais com curadoria pessoal. Consulte disponibilidade e valores
            diretamente pelo WhatsApp.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex rounded-sm border border-gold/50 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            Chamar no WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-background/45">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.items.map((i) => (
                  <li key={i}>
                    <span className="text-[13px] text-background/70 transition-colors duration-300 hover:text-gold">
                      {i}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-[11px] text-background/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} RMI Imports. Todos os direitos reservados.</p>
          <p>Catálogo informativo · sem checkout online</p>
        </div>
      </div>
    </footer>
  );
}

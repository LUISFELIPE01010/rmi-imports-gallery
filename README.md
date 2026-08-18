# RMI Imports Catalog

Create a premium product catalog website for "RMI Imports" — a store specializing in imported perfumes, with secondary categories including watches, phones, and other imported items.

CONCEPT & FEEL:

- Ultra-modern, dark luxury aesthetic. Think high-end fragrance brands like Maison Margiela Replica or Initio. Dark background (#0A0A0A or deep charcoal), gold/champagne accents (#C9A96E), clean white text.

- Minimal copy. Let the products speak. No filler text, no paragraphs — only strategic short phrases.

- Cinematic spacing. Lots of breathing room between elements.

- Font pairing: use "Cormorant Garamond" (serif, elegant) for headings and "Inter" or "DM Sans" (clean sans-serif) for labels and UI elements. Both from Google Fonts.

HEADER & NAVIGATION:

- Minimal fixed header with logo "RMI IMPORTS" on the left in Cormorant Garamond, letterspaced.

- Right side: category quick-access links — Perfumes | Relógios | Celulares | Outros

- On mobile: hamburger menu, clean slide-in drawer.

- Thin gold line (1px) separator below header.

HERO SECTION:

- Full-width dark hero. No image needed — use a subtle animated gradient background (very slow moving, dark tones with a faint gold shimmer effect using CSS).

- Large elegant headline: "Importados com exclusividade" in Cormorant Garamond, thin weight.

- Subline in small caps: "Perfumes · Relógios · Eletrônicos"

- No CTA button in hero — let the catalog speak.

FILTER BAR (sticky, below hero):

- Horizontal scrollable filter pills: All | Masculino | Feminino | Unissex | Árabe | Europeu | Relógios | Celulares | Outros

- Active filter: gold background, dark text. Inactive: transparent with gold border.

- Smooth filter animation when switching categories (fade transition).

PERFUME CARD (main product card — design this carefully):

- Dark card background (#141414), subtle gold border on hover (1px, opacity 0.4).

- Product image centered, generous padding, no cropping.

- Brand name in small gold uppercase letters above product name.

- Product name in Cormorant Garamond, 20px, white.

- SHORT description: max 1 line, muted color, small font. Example: "Amadeirado oriental com base de oud e baunilha."

- FRAGRANCE NOTES section with small icons/symbols:

  - Top note (♦ or ↑ symbol): e.g. "Bergamota, Limão"

  - Heart note (♥ symbol): e.g. "Rosa, Íris"

  - Base note (● symbol): e.g. "Oud, Âmbar, Almíscar"

  - Display these in 3 small rows with label + note names, muted text, tiny font.

- Bottom of card: single CTA button — "Consultar no WhatsApp" with WhatsApp icon, gold bordered, full width. On hover: fills gold.

- No price displayed.

NON-PERFUME CARDS (watches, phones, other):

- Simpler version of the card. Image + name + short description + WhatsApp button.

- No fragrance notes section.

CATALOG GRID:

- Desktop: 4 columns. Tablet: 2 columns. Mobile: 1 or 2 columns.

- Smooth fade-in on scroll for each card (intersection observer, staggered).

PLACEHOLDER DATA:

Create 8 placeholder perfume cards and 2 placeholder cards for other categories (1 watch, 1 phone) so the layout is fully visible. Use realistic perfume names, brands, and notes. Example brands: Dior, Tom Ford, Lattafa, Maison Alhambra, Initio.

WHATSAPP BUTTON:

- All WhatsApp links should open: https://wa.me/5513999999999 (placeholder number)

- Include the product name in the message: "Olá, tenho interesse no perfume [Nome do Produto]"

FOOTER:

- Minimal. Dark. Logo centered. Below: "RMI Imports © 2025 · Todos os direitos reservados"

- No social links for now.

TECH:

- React + Vite + Tailwind CSS

- No backend or database yet — all data as static JS array/objects for now. Structure the data cleanly so it's easy to migrate to Supabase later.

- Fully responsive.

- No page routing needed — single page catalog.

DO NOT add: pricing, cart, checkout, login, or any e-commerce functionality.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://rmi-imports-gallery.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/278d835a-2776-4926-aa61-4510bed34c6c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

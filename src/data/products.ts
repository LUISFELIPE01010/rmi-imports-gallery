import perfume1 from "@/assets/perfume-1.jpg";
import perfume2 from "@/assets/perfume-2.jpg";
import perfume3 from "@/assets/perfume-3.jpg";
import perfume4 from "@/assets/perfume-4.jpg";
import watch1 from "@/assets/watch-1.jpg";
import phone1 from "@/assets/phone-1.jpg";

export type Category = "perfumes" | "relogios" | "celulares" | "outros";

export type FilterId =
  | "all"
  | "masculino"
  | "feminino"
  | "unissex"
  | "arabe"
  | "europeu"
  | "relogios"
  | "celulares"
  | "outros";

export interface FragranceNotes {
  top: string;
  heart: string;
  base: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  image: string;
  category: Category;
  tags: FilterId[];
  notes?: FragranceNotes;
}

export const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "masculino", label: "Masculino" },
  { id: "feminino", label: "Feminino" },
  { id: "unissex", label: "Unissex" },
  { id: "arabe", label: "Árabe" },
  { id: "europeu", label: "Europeu" },
  { id: "relogios", label: "Relógios" },
  { id: "celulares", label: "Celulares" },
  { id: "outros", label: "Outros" },
];

export const WHATSAPP_NUMBER = "5513999999999";

export const whatsappLink = (product: Product) => {
  const kind = product.category === "perfumes" ? "no perfume" : "no produto";
  const message = `Olá, tenho interesse ${kind} ${product.name}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const products: Product[] = [
  {
    id: "oud-royal",
    brand: "Initio",
    name: "Oud for Greatness",
    description: "Amadeirado oriental com base de oud e baunilha.",
    image: perfume4,
    category: "perfumes",
    tags: ["unissex", "arabe"],
    notes: {
      top: "Açafrão, Noz-moscada",
      heart: "Oud, Lavanda",
      base: "Almíscar, Patchouli",
    },
  },
  {
    id: "tf-noir",
    brand: "Tom Ford",
    name: "Noir Extreme",
    description: "Âmbar especiado com doçura amadeirada.",
    image: perfume1,
    category: "perfumes",
    tags: ["masculino", "europeu"],
    notes: {
      top: "Cardamomo, Açafrão",
      heart: "Flor de laranjeira, Jasmim",
      base: "Âmbar, Sândalo, Baunilha",
    },
  },
  {
    id: "dior-sauvage",
    brand: "Dior",
    name: "Sauvage Elixir",
    description: "Fougère intenso com licorosa lavanda.",
    image: perfume2,
    category: "perfumes",
    tags: ["masculino", "europeu"],
    notes: {
      top: "Canela, Toranja",
      heart: "Lavanda, Alcaçuz",
      base: "Âmbar, Patchouli",
    },
  },
  {
    id: "lattafa-asad",
    brand: "Lattafa",
    name: "Asad",
    description: "Abacaxi cremoso sobre tabaco e café.",
    image: perfume1,
    category: "perfumes",
    tags: ["masculino", "arabe"],
    notes: {
      top: "Abacaxi, Bergamota",
      heart: "Café, Tabaco",
      base: "Baunilha, Cedro",
    },
  },
  {
    id: "alhambra-rose",
    brand: "Maison Alhambra",
    name: "Rouge Éclat",
    description: "Floral frutado com fundo de baunilha.",
    image: perfume3,
    category: "perfumes",
    tags: ["feminino", "arabe"],
    notes: {
      top: "Framboesa, Pêra",
      heart: "Rosa, Íris",
      base: "Baunilha, Almíscar",
    },
  },
  {
    id: "dior-jadore",
    brand: "Dior",
    name: "J'adore Infinissime",
    description: "Buquê floral luminoso e sedoso.",
    image: perfume3,
    category: "perfumes",
    tags: ["feminino", "europeu"],
    notes: {
      top: "Bergamota, Limão",
      heart: "Rosa, Ylang-ylang",
      base: "Sândalo, Almíscar",
    },
  },
  {
    id: "initio-psychedelic",
    brand: "Initio",
    name: "Psychedelic Love",
    description: "Rosa contemporânea com toque de couro.",
    image: perfume2,
    category: "perfumes",
    tags: ["unissex", "europeu"],
    notes: {
      top: "Pimenta rosa, Bergamota",
      heart: "Rosa, Íris",
      base: "Couro, Âmbar cinza",
    },
  },
  {
    id: "lattafa-khamrah",
    brand: "Lattafa",
    name: "Khamrah",
    description: "Tâmaras e especiarias em base gourmand.",
    image: perfume4,
    category: "perfumes",
    tags: ["unissex", "arabe"],
    notes: {
      top: "Canela, Noz-moscada",
      heart: "Tâmara, Praliné",
      base: "Baunilha, Benjoim, Tonka",
    },
  },
  {
    id: "watch-gold",
    brand: "Aurum",
    name: "Chronos Gold 41mm",
    description: "Aço banhado a ouro com mostrador negro.",
    image: watch1,
    category: "relogios",
    tags: ["relogios"],
  },
  {
    id: "phone-titan",
    brand: "Apple",
    name: "iPhone 16 Pro 256GB",
    description: "Titânio natural, lacrado e desbloqueado.",
    image: phone1,
    category: "celulares",
    tags: ["celulares"],
  },
];

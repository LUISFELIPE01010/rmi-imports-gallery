import perfume1 from "@/assets/perfume-1.jpg";
import perfume2 from "@/assets/perfume-2.jpg";
import perfume3 from "@/assets/perfume-3.jpg";
import perfume4 from "@/assets/perfume-4.jpg";
import watch1 from "@/assets/watch-1.jpg";
import phone1 from "@/assets/phone-1.jpg";

export type Category =
  | "perfumes"
  | "bodysplash"
  | "cremes"
  | "eletronicos"
  | "kits"
  | "colecoes"
  | "diversos";
export type Gender = "masculino" | "feminino" | "unissex";
export type Climate = "calor" | "frio" | "versatil";

export const climateLabel: Record<Climate, string> = {
  calor: "Calor",
  frio: "Frio",
  versatil: "Versátil",
};

export type FilterId =
  | "all"
  | "perfumes"
  | "perfumes-masculino"
  | "perfumes-feminino"
  | "bodysplash"
  | "bodysplash-masculino"
  | "bodysplash-feminino"
  | "cremes"
  | "eletronicos"
  | "kits"
  | "colecoes"
  | "diversos";

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
  gender?: Gender;
  notes?: FragranceNotes;
  climate?: Climate;
  soldOut?: boolean;
}

export interface FilterGroup {
  id: FilterId;
  label: string;
  children?: { id: FilterId; label: string }[];
}

export const filterGroups: FilterGroup[] = [
  { id: "all", label: "Todos" },
  {
    id: "perfumes",
    label: "Perfumes",
    children: [
      { id: "perfumes-masculino", label: "Masculino" },
      { id: "perfumes-feminino", label: "Feminino" },
    ],
  },
  {
    id: "bodysplash",
    label: "Bodysplash",
    children: [
      { id: "bodysplash-masculino", label: "Masculino" },
      { id: "bodysplash-feminino", label: "Feminino" },
    ],
  },
  { id: "cremes", label: "Cremes" },
  { id: "eletronicos", label: "Eletrônicos" },
  { id: "kits", label: "Kits" },
  { id: "colecoes", label: "Coleções" },
  { id: "diversos", label: "Diversos" },
];

export const matchesFilter = (product: Product, filter: FilterId) => {
  if (filter === "all") return true;
  const [category, gender] = filter.split("-") as [Category, Gender | undefined];
  if (product.category !== category) return false;
  if (gender) return product.gender === gender || product.gender === "unissex";
  return true;
};

export const categoryLabel: Record<Category, string> = {
  perfumes: "Perfume",
  bodysplash: "Bodysplash",
  cremes: "Creme",
  eletronicos: "Eletrônico",
  kits: "Kit",
  colecoes: "Coleção",
  diversos: "Diversos",
};

export const WHATSAPP_NUMBER = "5513996018936";
export const INSTAGRAM_URL = "https://www.instagram.com/rmi.imports/";

export const whatsappLink = (product: Product) => {
  const message = `Olá, tenho interesse no produto ${product.name}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const products: Product[] = [
  {
    id: "oud-royal",
    climate: "frio",
    brand: "Initio",
    name: "Oud for Greatness",
    description: "Amadeirado oriental com base de oud e baunilha.",
    image: perfume4,
    category: "perfumes",
    gender: "unissex",
    notes: {
      top: "Açafrão, Noz-moscada",
      heart: "Oud, Lavanda",
      base: "Almíscar, Patchouli",
    },
  },
  {
    id: "tf-noir",
    climate: "frio",
    brand: "Tom Ford",
    name: "Noir Extreme",
    description: "Âmbar especiado com doçura amadeirada.",
    image: perfume1,
    category: "perfumes",
    gender: "masculino",
    notes: {
      top: "Cardamomo, Açafrão",
      heart: "Flor de laranjeira, Jasmim",
      base: "Âmbar, Sândalo, Baunilha",
    },
  },
  {
    id: "dior-sauvage",
    climate: "versatil",
    brand: "Dior",
    name: "Sauvage Elixir",
    description: "Fougère intenso com licorosa lavanda.",
    image: perfume2,
    category: "perfumes",
    gender: "masculino",
    notes: {
      top: "Canela, Toranja",
      heart: "Lavanda, Alcaçuz",
      base: "Âmbar, Patchouli",
    },
  },
  {
    id: "lattafa-asad",
    climate: "versatil",
    brand: "Lattafa",
    name: "Asad",
    description: "Abacaxi cremoso sobre tabaco e café.",
    image: perfume1,
    category: "perfumes",
    gender: "masculino",
    notes: {
      top: "Abacaxi, Bergamota",
      heart: "Café, Tabaco",
      base: "Baunilha, Cedro",
    },
  },
  {
    id: "alhambra-rose",
    climate: "versatil",
    brand: "Maison Alhambra",
    name: "Rouge Éclat",
    description: "Floral frutado com fundo de baunilha.",
    image: perfume3,
    category: "perfumes",
    gender: "feminino",
    notes: {
      top: "Framboesa, Pêra",
      heart: "Rosa, Íris",
      base: "Baunilha, Almíscar",
    },
  },
  {
    id: "dior-jadore",
    climate: "calor",
    brand: "Dior",
    name: "J'adore Infinissime",
    description: "Buquê floral luminoso e sedoso.",
    image: perfume3,
    category: "perfumes",
    gender: "feminino",
    notes: {
      top: "Bergamota, Limão",
      heart: "Rosa, Ylang-ylang",
      base: "Sândalo, Almíscar",
    },
  },
  {
    id: "initio-psychedelic",
    climate: "versatil",
    brand: "Initio",
    name: "Psychedelic Love",
    description: "Rosa contemporânea com toque de couro.",
    image: perfume2,
    category: "perfumes",
    gender: "unissex",
    notes: {
      top: "Pimenta rosa, Bergamota",
      heart: "Rosa, Íris",
      base: "Couro, Âmbar cinza",
    },
  },
  {
    id: "lattafa-khamrah",
    climate: "frio",
    brand: "Lattafa",
    name: "Khamrah",
    description: "Tâmaras e especiarias em base gourmand.",
    image: perfume4,
    category: "perfumes",
    gender: "unissex",
    notes: {
      top: "Canela, Noz-moscada",
      heart: "Tâmara, Praliné",
      base: "Baunilha, Benjoim, Tonka",
    },
  },
  {
    id: "splash-blue",
    climate: "calor",
    brand: "Victoria's Secret",
    name: "Body Splash Blue Rush",
    description: "Refrescante e cítrico para o dia a dia.",
    image: perfume2,
    category: "bodysplash",
    gender: "masculino",
  },
  {
    id: "splash-berry",
    climate: "calor",
    brand: "Victoria's Secret",
    name: "Body Splash Velvet Petals",
    description: "Doce e floral, fixação leve e marcante.",
    image: perfume3,
    category: "bodysplash",
    gender: "feminino",
  },
  {
    id: "creme-hidratante",
    brand: "Bath & Body Works",
    name: "Creme Hidratante Champagne Toast",
    description: "Hidratação intensa com perfume prolongado.",
    image: perfume1,
    category: "cremes",
    gender: "unissex",
  },
  {
    id: "watch-gold",
    brand: "Aurum",
    name: "Chronos Gold 41mm",
    description: "Aço banhado a ouro com mostrador negro.",
    image: watch1,
    category: "eletronicos",
  },
  {
    id: "phone-titan",
    brand: "Apple",
    name: "iPhone 16 Pro 256GB",
    description: "Titânio natural, lacrado e desbloqueado.",
    image: phone1,
    category: "eletronicos",
  },
];

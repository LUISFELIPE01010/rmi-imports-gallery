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
  price?: number;
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

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

export const products: Product[] = [];

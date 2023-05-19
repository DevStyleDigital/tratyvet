export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  type: string;
  desc: string;
  items: { [key in string]?: { min: string; max: string } | null } | null;
};

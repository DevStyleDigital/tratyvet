export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  type: string;
  desc: string;
  items:
    | { [key in string]?: { pack1: string; pack2: string; pack3: string } | null }
    | null;
};

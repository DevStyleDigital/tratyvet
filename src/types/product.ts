export type Product = {
  id: string;
  name: Record<string, string>;
  imageUrl: string;
  type: string;
  category: string;
  desc: Record<string, string>;
  items: { [key in string]?: { [key: string]: string } | null } | null;
};

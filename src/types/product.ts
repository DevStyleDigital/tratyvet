export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
  category: string;
  desc: Record<string, string>;
  items: { [key in string]?: { [key: string]: string } | null } | null;
};

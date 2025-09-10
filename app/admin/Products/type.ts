export type Category = {
    id: number;
    name: string;
  };
  
  export type Product = {
    id?: number;
    name: string;
    description: string;
    price: number;
    image?: string;
    categories: Category[];
  };
  
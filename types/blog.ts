export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export type TableRow = {
  cells: string[];
};

export type DataTable = {
  _id: string;
  title: string;
  description?: string;
  headers: string[];
  rows: TableRow[];
  tableStyle?: "default" | "striped" | "bordered" | "compact";
  slug: {
    current: string;
  };
};

export type BlogType = {
  id: number;
  title: string;
  slug?: any;
  metadata?: string;
  excerpt?: string;
  category?: string;
  thumbnail?: any;
  imageAlt?: string;
  author?: Author;
  tags?: string[];
  date?: string;
  readTime: string;
  dataTables?: DataTable[];
};

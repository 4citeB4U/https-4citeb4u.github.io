export interface BookPage {
  title: string;
  content: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  pages: BookPage[];
}

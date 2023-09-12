import type { BookType } from '@/types/BookType';

export type EditionType = {
  id: number;
  book_id: number;
  format: string;
  published_at: string;
  cover: string;
  cover_url: string;
  description: string;
  book?: BookType;
};

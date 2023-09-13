import { BookType } from '@/types/BookType';
import { EditionType } from '@/types/EditionType';

export type LibraryType = {
  id: number;
  edition_id: number;
  user_id: number;
  notes?: string;
  status: string;
  created_at: string;
  started_at?: string;
  finished_at?: string;
  edition?: EditionType;
};

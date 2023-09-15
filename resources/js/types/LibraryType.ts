import { BookType } from '@/types/BookType';
import type { EditionType } from '@/types/EditionType';
import type { RatingType } from '@/types/RatingType';

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
  rating?: RatingType | null;
};

import type { AuthorType } from '@/types/AuthorType';
import type { PublisherType } from '@/types/PublisherType';
import type { EditionType } from '@/types/EditionType';
import type { RatingType } from '@/types/RatingType';

export type BookType = {
  id: number;
  title: string;
  cover: string;
  synopsis: string;
  author_id: number;
  author?: AuthorType;
  publisher_id: number;
  publisher?: PublisherType;
  editions?: EditionType[];
  ratings?: RatingType[];
  ratings_count: number;
  rating: number;
  editions_count: number;
  published_at: string;
};

import { AuthorType } from "@/types/AuthorType";
import { PublisherType } from "@/types/PublisherType";

export type BookType = {
    id: number;
    title: string;
    cover: string;
    synopsis: string;
    author_id: number;
    author: AuthorType;
    publisher_id: number;
    publisher: PublisherType;
    published_at: string;
}

import { useState, useEffect } from 'react';
import { getAuthors, getPublishers, getTags } from '@/Services/apiCall';
import { useForm } from '@inertiajs/react';
import type { AuthorType } from '@/types/AuthorType';
import type { PublisherType } from '@/types/PublisherType';
import type { TagType } from '@/types/TagType';
import type { BookType } from '@/types/BookType';

const useFormBook = () => {
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [publishers, setPublishers] = useState<PublisherType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const { data, setData, post, put, processing, errors, reset } = useForm<
    Partial<BookType>
  >({
    title: '',
    author_id: 0,
    publisher_id: 0,
    published_at: '',
    synopsis: '',
    tags: [],
  });

  useEffect(() => {
    // Fetch authors data
    getAuthors().then((response) => {
      setAuthors(response.data);
    });

    // Fetch publishers data
    getPublishers().then((response) => {
      setPublishers(response.data);
    });

    // Fetch tags data
    getTags().then((response) => {
      setTags(response.data);
    });
  }, []);

  return {
    authors,
    publishers,
    tags,
    data,
    setData,
    post,
    put,
    processing,
    errors,
    reset,
  };
};

export default useFormBook;

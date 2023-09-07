import { useState, useEffect } from 'react';
import { getAuthors, getPublishers } from '@/Services/apiCall';
import { useForm } from '@inertiajs/react';
import type { AuthorType } from '@/types/AuthorType';
import type { PublisherType } from '@/types/PublisherType';

const useFormBook = () => {
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [publishers, setPublishers] = useState<PublisherType[]>([]);
  const { data, setData, post, put, processing, errors, reset } = useForm({
    title: '',
    author_id: '',
    publisher_id: '',
    published_at: '',
    synopsis: '',
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
  }, []);

  return {
    authors,
    publishers,
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

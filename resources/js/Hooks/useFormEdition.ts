import { useForm } from '@inertiajs/react';

const useFormEdition = (bookId: number) => {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    book_id: bookId,
    format: '',
    cover: null,
    published_at: '',
    description: '',
  });

  return {
    data,
    setData,
    post,
    put,
    processing,
    errors,
    reset,
  };
};

export default useFormEdition;

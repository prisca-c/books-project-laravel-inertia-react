import { useForm } from '@inertiajs/react';
import type { RatingType } from '@/types/RatingType';

const useFormRating = () => {
  const { data, setData, post, put, processing, errors, reset } = useForm<
    Partial<RatingType>
  >({
    book_id: 0,
    rating: 0,
    review: '',
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

export default useFormRating;

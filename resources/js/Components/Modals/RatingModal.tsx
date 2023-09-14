import React, { useEffect, useState } from 'react';
import useFormRating from '@/Hooks/useFormRating';
import StarRating from '@/Components/RateStars';
import InputError from '@/Components/InputError';
import FormButtons from '@/Components/FormButtons';
import type { BookType } from '@/types/BookType';

type RatingModalProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: number;
};

const RatingModal = ({ bookId, setShow }: RatingModalProps) => {
  const [rating, setRating] = useState(1);
  const { data, setData, post, processing, errors, reset } = useFormRating();

  useEffect(() => {
    setData({
      book_id: bookId,
      rating: rating,
      review: '',
    });
  }, [rating]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('dashboard.ratings.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setShow(false);
      },
    });
  };

  const handleStarClick = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="fixed z-10 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <form onSubmit={onSubmit} className={'relative bg-white p-4 rounded-lg'}>
        <div className="flex flex-col items-center gap-4 py-4 px-8">
          <p className="text-center text-2xl font-semibold">Review this book</p>
          <div className="m-auto">
            <StarRating rating={rating} onStarClick={handleStarClick} />
          </div>
          <InputError message={errors.rating} />
          <p className="text-center text-2xl font-semibold">{rating} / 5</p>
        </div>
        <textarea
          className="border border-gray-300 p-2 w-full h-32"
          placeholder="Write a review"
          value={data.review}
          onChange={(e) => setData('review', e.target.value)}
        />
        <InputError message={errors.review} />
        <InputError message={errors.book_id} />
        <FormButtons
          setShow={setShow}
          disabled={processing || data.book_id === 0}
          reset={reset}
        />
      </form>
    </div>
  );
};

export default RatingModal;

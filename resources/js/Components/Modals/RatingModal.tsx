import React, { useEffect, useState } from 'react';
import useFormRating from '@/Hooks/useFormRating';
import StarRating from '@/Components/RateStars';
import InputError from '@/Components/InputError';
import FormButtons from '@/Components/FormButtons';
import type { BookType } from '@/types/BookType';
import { RatingType } from '@/types/RatingType';

type RatingModalProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: number;
  exist?: boolean;
  userRating?: RatingType | null;
};

const RatingModal = ({
  bookId,
  setShow,
  exist = false,
  userRating,
}: RatingModalProps) => {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const { data, setData, post, put, processing, errors, reset } =
    useFormRating();

  useEffect(() => {
    setRating(userRating?.rating ?? 1);
    setReview(userRating?.review ?? '');
    setData({
      book_id: bookId,
      rating: rating,
      review: review,
      id: exist ? userRating?.id : 0,
    });
  }, []);

  useEffect(() => {
    setData({
      book_id: bookId,
      rating: rating,
      review: review,
      id: exist ? userRating?.id : 0,
    });
  }, [rating]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    exist
      ? put(route('dashboard.ratings.update', userRating?.id!), {
          preserveScroll: true,
          onSuccess: () => {
            setShow(false);
          },
        })
      : post(route('dashboard.ratings.store'), {
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
          <p className="text-center text-2xl font-semibold">
            {exist ? 'Modify my rating' : 'Rate this book'}
          </p>
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

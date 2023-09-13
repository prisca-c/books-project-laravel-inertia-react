import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import type { BookType } from '@/types/BookType';

type AddToLibraryModalProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  book: BookType | null;
  userId: number;
};

const AddToLibraryModal = ({
  setShow,
  book,
  userId,
}: AddToLibraryModalProps) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    edition_id: 0,
    user_id: 0,
  });

  useEffect(() => {
    setData('user_id', userId);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.edition_id === 0) return;

    post(route('dashboard.libraries.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setShow(false);
      },
    });
  };

  return (
    <div className="fixed z-10 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className={'relative w-[90vw] md:w-[70vw] bg-white p-4 rounded-lg'}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">
            Add book to my library
            <br />
            <span className={'text-gray-400 underline'}>{book?.title}</span>
          </h1>
          <div className="flex flex-col gap-2">
            {data.edition_id === 0 && (
              <p className={'text-red-500'}>Please select an edition</p>
            )}
            <label htmlFor="edition_id">Edition</label>
            <select
              id="edition_id"
              className="border border-gray-300 p-2"
              value={data.edition_id}
              onChange={(e) => setData('edition_id', parseInt(e.target.value))}
            >
              <option value={0} disabled>
                Select an edition
              </option>
              {book?.editions &&
                book?.editions.map((edition) => (
                  <option key={edition.id} value={edition.id}>
                    {`${edition.format} - ${edition.published_at}`}
                  </option>
                ))}
            </select>
            <InputError message={errors.edition_id || errors.user_id} />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={
                'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg' +
                (processing || data.edition_id === 0
                  ? ' cursor-not-allowed'
                  : '')
              }
              disabled={processing || data.edition_id === 0}
            >
              Add to Library
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddToLibraryModal;

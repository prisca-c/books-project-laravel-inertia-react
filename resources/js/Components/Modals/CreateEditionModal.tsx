import React, { useEffect } from 'react';
import useFormEdition from '@/Hooks/useFormEdition';
import InputError from '@/Components/InputError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

type CreateEditionModalProps = {
  bookId: number;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateEditionModal = ({ bookId, setShow }: CreateEditionModalProps) => {
  const { data, setData, post, processing, errors, reset } =
    useFormEdition(bookId);

  useEffect(() => {
    setData('book_id', bookId);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('dashboard.editions.store'), {
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
          <h1 className="text-2xl font-bold text-center">Add Edition</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Format</label>
            <input
              type="text"
              id="title"
              className="border border-gray-300 p-2"
              value={data.format}
              onChange={(e) => setData('format', e.target.value)}
            />
            <InputError message={errors.format} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="published_at">Published At</label>
            <input
              type="number"
              id="published_at"
              className="border border-gray-300 p-2"
              value={data.published_at}
              onChange={(e) => setData('published_at', e.target.value)}
              max={new Date().getFullYear()}
            />

            <InputError message={errors.published_at} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="synopsis">Description</label>
            <textarea
              id="description"
              className="border border-gray-300 p-2"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
            <InputError message={errors.description} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="cover">Cover</label>
            <input
              type="file"
              id="cover"
              className="border border-gray-300 p-2"
              // @ts-ignore
              onChange={(e) => setData('cover', e.target.files[0])}
            />
            <InputError message={errors.cover} />
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
              disabled={processing}
            >
              Submit
            </button>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={() => reset()}
              disabled={processing}
            >
              Reset
            </button>
          </div>
          <button
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-100 px-2"
            type="button"
            onClick={() => setShow(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditionModal;

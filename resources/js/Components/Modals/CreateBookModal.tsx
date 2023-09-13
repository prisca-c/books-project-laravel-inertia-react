import React from 'react';
import { AuthorType } from '@/types/AuthorType';
import { PublisherType } from '@/types/PublisherType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import InputError from '@/Components/InputError';
import useFormBook from '@/Hooks/useFormBook';
import FormButtons from '@/Components/FormButtons';

type CreateBookModalProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBookModal = ({ setShow }: CreateBookModalProps) => {
  const {
    authors,
    publishers,
    data,
    setData,
    post,
    processing,
    errors,
    reset,
  } = useFormBook();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('dashboard.books.store'), {
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
          <h1 className="text-2xl font-bold text-center">Add Book</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="border border-gray-300 p-2"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            <InputError message={errors.title} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="author_id">Author</label>
            <select
              id="author_id"
              className="border border-gray-300 p-2"
              value={data.author_id}
              onChange={(e) => setData('author_id', e.target.value)}
            >
              <option value="">Select an author</option>
              {authors &&
                authors.map((author: AuthorType) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
            </select>
            <InputError message={errors.author_id} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="publisher_id">Publisher</label>
            <select
              id="publisher_id"
              className="border border-gray-300 p-2"
              value={data.publisher_id}
              onChange={(e) => setData('publisher_id', e.target.value)}
            >
              <option value="">Select a publisher</option>
              {publishers &&
                publishers.map((publisher: PublisherType) => (
                  <option key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </option>
                ))}
            </select>
            <InputError message={errors.publisher_id} />
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
            <label htmlFor="synopsis">Synopsis</label>
            <textarea
              id="synopsis"
              className="border border-gray-300 p-2"
              value={data.synopsis}
              onChange={(e) => setData('synopsis', e.target.value)}
            />

            <InputError message={errors.synopsis} />
          </div>

          <FormButtons setShow={setShow} reset={reset} disabled={processing} />
        </div>
      </form>
    </div>
  );
};

export default CreateBookModal;

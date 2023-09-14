import React, { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import useFormBook from '@/Hooks/useFormBook';
import FormButtons from '@/Components/FormButtons';
import { Combobox } from '@headlessui/react';
import type { AuthorType } from '@/types/AuthorType';
import type { PublisherType } from '@/types/PublisherType';

type CreateBookModalProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBookModal = ({ setShow }: CreateBookModalProps) => {
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorType | null>(null);
  const [selectedPublisher, setSelectedPublisher] =
    useState<PublisherType | null>(null);
  const [queryPublisher, setQueryPublisher] = useState('');
  const [queryAuthor, setQueryAuthor] = useState('');

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

  useEffect(() => {
    if (selectedAuthor) {
      setData('author_id', selectedAuthor.id);
    }

    if (selectedPublisher) {
      setData('publisher_id', selectedPublisher.id);
    }
  }, [selectedAuthor, selectedPublisher]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('dashboard.books.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setShow(false);
      },
    });
  };

  const filteredPublishers =
    queryPublisher === ''
      ? publishers
      : publishers.filter((publisher: PublisherType) =>
          publisher.name.toLowerCase().includes(queryPublisher.toLowerCase()),
        );
  const filteredAuthors =
    queryAuthor === ''
      ? authors
      : authors.filter((author: AuthorType) =>
          author.name.toLowerCase().includes(queryAuthor.toLowerCase()),
        );

  // @ts-ignore
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

          <div className="relative flex flex-col gap-2">
            <label>Author</label>
            <Combobox value={selectedAuthor} onChange={setSelectedAuthor}>
              <Combobox.Input
                onChange={(e) => setQueryAuthor(e.target.value)}
                displayValue={(author: AuthorType) => author?.name}
              />
              <Combobox.Options className="z-10 border border-gray-300 p-2 overflow-y-auto max-h-60 absolute top-full w-full bg-white">
                {filteredAuthors.map((author: AuthorType) => (
                  <Combobox.Option
                    key={author.id}
                    value={author}
                    className={'p-2 hover:bg-gray-100 cursor-pointer border-b'}
                  >
                    {author.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
            <InputError message={errors.author_id} />
          </div>

          <div className="relative flex flex-col gap-2">
            <label>Publisher</label>
            <Combobox value={selectedPublisher} onChange={setSelectedPublisher}>
              <Combobox.Input
                onChange={(e) => setQueryPublisher(e.target.value)}
                displayValue={(publisher: PublisherType) => publisher?.name}
              />
              <Combobox.Options className="z-10 border border-gray-300 p-2 overflow-y-auto max-h-60 absolute top-full w-full bg-white">
                {filteredPublishers.map((publisher: PublisherType) => (
                  <Combobox.Option
                    key={publisher.id}
                    value={publisher}
                    className={'p-2 hover:bg-gray-100 cursor-pointer border-b'}
                  >
                    {publisher.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
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

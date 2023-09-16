import React, { useEffect, useState } from 'react';
import useFormBook from '@/Hooks/useFormBook';
import InputError from '@/Components/InputError';
import FormButtons from '@/Components/FormButtons';
import type { BookType } from '@/types/BookType';
import type { AuthorType } from '@/types/AuthorType';
import type { PublisherType } from '@/types/PublisherType';
import { TagType } from '@/types/TagType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Combobox } from '@headlessui/react';

type EditBookModalProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  book: BookType;
};

const EditBookModal = ({ setShow, book }: EditBookModalProps) => {
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorType | null>(null);
  const [selectedPublisher, setSelectedPublisher] =
    useState<PublisherType | null>(null);
  const [selectedTag, setSelectedTag] = useState<number[]>([]);
  const [queryPublisher, setQueryPublisher] = useState('');
  const [queryAuthor, setQueryAuthor] = useState('');

  const {
    authors,
    publishers,
    tags,
    data,
    setData,
    processing,
    errors,
    reset,
    put,
  } = useFormBook();

  useEffect(() => {
    if (book) {
      setSelectedAuthor(book.author!);
      setSelectedPublisher(book.publisher!);

      setData({
        // @ts-ignore
        title: book.title,
        author_id: book.author_id,
        publisher_id: book.publisher_id,
        published_at: book.published_at,
        synopsis: book.synopsis,
        tags: book.tags,
      });
    }
  }, []);

  useEffect(() => {
    if (selectedAuthor) {
      setData('author_id', selectedAuthor.id);
    }

    if (selectedPublisher) {
      setData('publisher_id', selectedPublisher.id);
    }

    if (selectedTag) {
      setData('tags', selectedTag as unknown as TagType[]);
    }
  }, [selectedAuthor, selectedPublisher, selectedTag]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('dashboard.books.update', book?.id), {
      preserveScroll: true,
      onSuccess: () => {
        setShow(false);
      },
    });
  };

  const onTagClick = (tagId: number) => {
    if (selectedTag.includes(tagId)) {
      setSelectedTag(selectedTag.filter((id) => id !== tagId));
    }

    setSelectedTag([...selectedTag, tagId]);
    setData('tags', selectedTag as unknown as TagType[]);
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

  return (
    <div className="fixed z-10 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className={'relative w-[90vw] md:w-[70vw] bg-white p-4 rounded-lg'}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">
            {book ? 'Edit' : 'Add'} Book
          </h1>
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

          <div className="relative flex flex-col gap-2">
            <label htmlFor="tags">Tags</label>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: TagType) => (
                  <p
                    key={tag.id}
                    className="bg-gray-200 px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-300"
                    onClick={() => onTagClick(tag.id)}
                  >
                    {tag.name}{' '}
                    {selectedTag?.includes(tag.id) && (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                  </p>
                ))}
              </div>
            )}
            <InputError message={errors.tags} />
          </div>

          <FormButtons setShow={setShow} reset={reset} disabled={processing} />
        </div>
      </form>
    </div>
  );
};

export default EditBookModal;

import { useEffect, useState } from 'react';
import Accordion from '@/Components/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { filterBy } from '@/Helpers/arrayHelpers';
import type { BookType } from '@/types/BookType';
import type { EditionType } from '@/types/EditionType';

type BookInfosProps = {
  book: BookType;
};

const BookInfos = ({ book }: BookInfosProps) => {
  const [filter, setFilter] = useState('');
  const [edition, setEdition] = useState<EditionType>();

  const editions = (): EditionType[] => {
    return filterBy(book.editions as EditionType[], 'format', filter);
  };

  const activeEdition = book.editions?.find((e) => e.id === edition?.id);

  useEffect(() => {
    if (book.editions && book.editions.length > 0) {
      setEdition(book.editions[0]);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row text-center justify-center items-start gap-4 md:gap-[0]">
      <div className="relative w-full md:w-[50%] h-full border border-gray-300 rounded-lg overflow-hidden">
        <img
          src={edition?.cover_url || book.cover}
          alt={book.title}
          className={'w-[400px] h-[400px] object-contain m-auto'}
        />
      </div>

      <div
        className={
          'flex flex-col justify-center items-center gap-4 w-full md:w-[50%]'
        }
      >
        <p>
          Book Rating:{' '}
          <b>
            {book.rating === 0 ? 'Not rated yet' : book.rating + ' / 5 '}
            <FontAwesomeIcon icon={faStar} className={'text-yellow-500'} /> (
            {book.ratings?.length})
          </b>
        </p>
        <Accordion title={'Editions'}>
          {book.editions_count > 0 && (
            <>
              <input
                type="text"
                placeholder="Filter by format"
                className="border border-gray-300 p-2 mb-3 w-full"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <div
                className={'grid grid-cols-2 md:grid-cols-3 gap-2 pb-[45px]'}
              >
                {editions().map((edition) => (
                  <button
                    key={edition.id}
                    onClick={() => setEdition(edition)}
                    className={
                      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm' +
                      (activeEdition?.id === edition.id ? ' bg-blue-700' : '')
                    }
                  >
                    {edition.format}
                  </button>
                ))}
              </div>
            </>
          )}
        </Accordion>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {book.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Author: <b>{book?.author?.name}</b>
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Publisher: <b>{book.publisher?.name}</b>
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Book Published: <b>{book.published_at}</b>
          {edition && (
            <>
              <br />
              Edition Published: <b>{edition.published_at}</b>
            </>
          )}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Synopsis :<br />
          <b>{book.synopsis}</b>
        </p>
      </div>
    </div>
  );
};

export default BookInfos;

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toTruncate } from '@/Helpers/textHelpers';
import { filterBy } from '@/Helpers/arrayHelpers';
import CreateEditionModal from '@/Components/Modals/CreateEditionModal';
import Accordion from '@/Components/Accordion';
import RatingModal from '@/Components/Modals/RatingModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import type { PageProps } from '@/types';
import type { BookType } from '@/types/BookType';
import type { EditionType } from '@/types/EditionType';

type BookSingleProps = {
  auth: PageProps['auth'];
  book: BookType;
};

const BookSingle = ({ auth, book }: BookSingleProps) => {
  const [edition, setEdition] = useState<EditionType>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [filter, setFilter] = useState('');

  const isAdmin = auth.user?.role_id === 3;

  const activeEdition = book.editions?.find((e) => e.id === edition?.id);

  const editions = (): EditionType[] => {
    return filterBy(book.editions as EditionType[], 'format', filter);
  };

  useEffect(() => {
    if (book.editions && book.editions.length > 0) {
      setEdition(book.editions[0]);
    }
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-400 leading-tight">
          <Link href={route('dashboard.books.index')}>Books</Link> &gt;{' '}
          <span className="text-gray-800">{toTruncate(book.title, 20)}</span>
        </h2>
      }
    >
      <div className="relative max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg my-4">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-center mb-4">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mr-4"
                onClick={() => setShowRatingModal(true)}
              >
                Rate this book
              </button>
              {showRatingModal && (
                <RatingModal setShow={setShowRatingModal} bookId={book.id} />
              )}
              {isAdmin && (
                <>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Add Edition
                  </button>

                  {showCreateModal && (
                    <CreateEditionModal
                      bookId={book.id}
                      setShow={setShowCreateModal}
                    />
                  )}
                </>
              )}
            </div>

            {book ? (
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
                      {' '}
                      {book.rating ? book.rating.toFixed(1) : 0} / 5{' '}
                      <FontAwesomeIcon
                        icon={faStar}
                        className={'text-yellow-500'}
                      />
                    </b>
                  </p>
                  <Accordion title={'Editions'}>
                    {book.editions && book.editions.length > 0 && (
                      <>
                        <input
                          type="text"
                          placeholder="Filter by format"
                          className="border border-gray-300 p-2 mb-3 w-full"
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                        />
                        <div
                          className={
                            'grid grid-cols-2 md:grid-cols-3 gap-2 pb-[45px]'
                          }
                        >
                          {editions().map((edition) => (
                            <button
                              key={edition.id}
                              onClick={() => setEdition(edition)}
                              className={
                                'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm' +
                                (activeEdition?.id === edition.id
                                  ? ' bg-blue-700'
                                  : '')
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
            ) : (
              <p className="text-lg text-center leading-6 font-medium text-gray-900">
                Book not found.
              </p>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default BookSingle;

import { useState } from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateEditionModal from '@/Components/Modals/CreateEditionModal';
import RatingModal from '@/Components/Modals/RatingModal';
import BookInfos from '@/Components/Books/BookInfos';
import Reviews from '@/Components/Reviews';
import { toTruncate } from '@/Helpers/textHelpers';
import type { PageProps } from '@/types';
import type { BookType } from '@/types/BookType';

type BookSingleProps = {
  auth: PageProps['auth'];
  book: BookType;
};

const BookSingle = ({ auth, book }: BookSingleProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const isAdmin = auth.user?.role_id === 3;

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
              <BookInfos book={book} />
            ) : (
              <p className="text-lg text-center leading-6 font-medium text-gray-900">
                Book not found.
              </p>
            )}
          </div>
        </div>

        <div className={'bg-white overflow-hidden shadow rounded-lg my-4'}>
          <div className={'px-4 py-5 sm:p-6 flex flex-col gap-4'}>
            <Reviews reviews={book.ratings || []} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default BookSingle;

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toCapitalize } from '@/Helpers/textHelpers';
import useFormEdition from '@/Hooks/useFormEdition';
import type { PageProps } from '@/types';
import type { BookType } from '@/types/BookType';
import type { EditionType } from '@/types/EditionType';
import CreateEditionModal from '@/Components/Modals/CreateEditionModal';

type DashboardBookSingleProps = {
  auth: PageProps['auth'];
  errors: PageProps['errors'];
  book: BookType;
};

const DashboardBookSingle = ({
  auth,
  errors,
  book,
}: DashboardBookSingleProps) => {
  const [edition, setEdition] = useState<EditionType>();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isAdmin = auth.user?.role_id === 3;

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
          <span className="text-gray-800">
            {book.title.substring(0, 25)}...
          </span>
        </h2>
      }
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg my-4">
          <div className="px-4 py-5 sm:p-6">
            {isAdmin && (
              <>
                {
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add Edition
                    </button>
                  </div>
                }

                {showCreateModal && (
                  <CreateEditionModal
                    bookId={book.id}
                    setShow={setShowCreateModal}
                  />
                )}
              </>
            )}

            {book ? (
              <div className="flex flex-col text-center justify-center items-center gap-2">
                {book.editions && book.editions.length > 0 && (
                  <div className={'flex justify-center items-center gap-4'}>
                    <label>Edition : </label>
                    <select
                      className="mt-1 block w-[300px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        const edition = book.editions?.find(
                          (edition) => edition.id === parseInt(e.target.value),
                        );
                        setEdition(edition);
                      }}
                    >
                      {book.editions?.map((edition) => (
                        <option key={edition.id} value={edition.id}>
                          {toCapitalize(edition.format)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
                <img src={edition?.cover_url || book.cover} alt={book.title} />
                <p className="mt-1 text-sm text-gray-500">
                  Synopsis :<br />
                  <b>{book.synopsis}</b>
                </p>
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

export default DashboardBookSingle;

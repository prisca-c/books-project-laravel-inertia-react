import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BookType } from '@/types/BookType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { Book } from '@/Components/Books/Book';
import Unauthorized from '@/Components/Unauthorized';
import { useState } from 'react';
import CreateBookModal from '@/Components/Modals/CreateBookModal';

type DashboardBooksProps = {
  auth: PageProps['auth'];
  books: BookType[];
};

const DashboardBooks = ({ auth, books }: DashboardBooksProps) => {
  const [showCreateBookModal, setShowCreateBookModal] = useState(false);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Books
        </h2>
      }
    >
      {auth && auth.user.role_id === 3 ? (
        <div className="relative max-w-7xl mx-auto sm:px-6 lg:px-8">
          {showCreateBookModal && (
            <CreateBookModal setShow={setShowCreateBookModal} />
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full fixed bottom-4 right-4"
            onClick={() => setShowCreateBookModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Book
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-4">
            {books &&
              books.map((book) => (
                <div
                  className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2"
                  key={book.id}
                >
                  <Book book={book} />
                  <div
                    className={'flex justify-end items-center gap-4 mt-4 px-2'}
                  >
                    <div className={'flex justify-center items-center'}>
                      <button
                        className={
                          'text-red-500 hover:text-red-700 hover:bg-red-100 px-2'
                        }
                      >
                        <FontAwesomeIcon icon={faClose} /> Delete
                      </button>
                    </div>

                    <div className={'flex justify-center items-center'}>
                      <button
                        className={
                          'text-blue-500 hover:text-blue-700 hover:bg-blue-100 px-2'
                        }
                      >
                        <FontAwesomeIcon icon={faPen} /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </AuthenticatedLayout>
  );
};

export default DashboardBooks;

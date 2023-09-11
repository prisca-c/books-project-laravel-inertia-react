import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faPlus,
  faPen,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { Book } from '@/Components/Books/Book';
import { useState } from 'react';
import CreateBookModal from '@/Components/Modals/CreateBookModal';
import EditBookModal from '@/Components/Modals/EditBookModal';
import { Link, router } from '@inertiajs/react';
import type { PageProps } from '@/types';
import type { BookType } from '@/types/BookType';
import { Switch } from '@headlessui/react';

type DashboardBooksProps = {
  auth: PageProps['auth'];
  books: BookType[];
};

const DashboardBooks = ({ auth, books }: DashboardBooksProps) => {
  const [turnEdition, setTurnEdition] = useState(false);
  const [showCreateBookModal, setShowCreateBookModal] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [editedBook, setEditedBook] = useState<BookType | null>(null);

  const isAdmin = auth && auth.user.role_id === 3;

  const booksFilter = () => {
    if (isAdmin) {
      return books;
    } else {
      return books.filter((book) => {
        if (!book.editions) return false;
        return book.editions.length > 0;
      });
    }
  };

  const onDelete = (id: number) => {
    router.delete(route('dashboard.books.destroy', id), {
      preserveScroll: true,
    });
  };

  const onEdit = (book: BookType | null) => {
    setEditedBook(book);
    setShowEditBookModal(true);
  };

  const onAddToLibrary = (book: BookType) => {
    route('dashboard.books.store', book.id);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Books
        </h2>
      }
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {isAdmin && (
          <Switch.Group>
            <div className="flex items-center mt-4">
              <Switch.Label className="mr-4">Edition</Switch.Label>
              <Switch
                checked={turnEdition}
                onChange={setTurnEdition}
                className={`${
                  turnEdition ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span
                  className={`${
                    turnEdition ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200`}
                />
              </Switch>
            </div>
          </Switch.Group>
        )}

        {isAdmin && turnEdition && (
          <>
            {showCreateBookModal && (
              <CreateBookModal setShow={setShowCreateBookModal} />
            )}
            {showEditBookModal && (
              <EditBookModal setShow={setShowEditBookModal} book={editedBook} />
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full fixed bottom-4 right-4"
              onClick={() => setShowCreateBookModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Book
            </button>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-4">
          {books &&
            booksFilter().map((book) => (
              <div
                className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2"
                key={book.id}
              >
                <Link href={route('dashboard.books.single', book.id)}>
                  <Book book={book} />
                </Link>

                {!turnEdition && (
                  <div
                    className={
                      'flex justify-center items-center gap-4 mt-4 px-2'
                    }
                  >
                    <div className={'flex justify-center items-center'}>
                      {book.editions && book.editions.length > 0 ? (
                        <button
                          className={
                            'text-blue-500 hover:text-blue-700 hover:bg-blue-100 px-2'
                          }
                          onClick={() => onEdit(book)}
                        >
                          <FontAwesomeIcon icon={faBook} /> Add to Library
                        </button>
                      ) : (
                        <p>This book has no edition.</p>
                      )}
                    </div>
                  </div>
                )}
                {isAdmin && turnEdition && (
                  <div
                    className={'flex justify-end items-center gap-4 mt-4 px-2'}
                  >
                    <div className={'flex justify-center items-center'}>
                      <button
                        className={
                          'text-red-500 hover:text-red-700 hover:bg-red-100 px-2'
                        }
                        onClick={() => onDelete(book.id)}
                      >
                        <FontAwesomeIcon icon={faClose} /> Delete
                      </button>
                    </div>

                    <div className={'flex justify-center items-center'}>
                      <button
                        className={
                          'text-blue-500 hover:text-blue-700 hover:bg-blue-100 px-2'
                        }
                        onClick={() => onEdit(book)}
                      >
                        <FontAwesomeIcon icon={faPen} /> Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default DashboardBooks;

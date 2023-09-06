import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { BookType } from '@/types/BookType';
import { Book } from '@/Components/Books/Book';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons';

type BooksProps = {
  books: BookType[];
};

const Books = ({ books }: BooksProps) => {
  return (
    <>
      <div className="flex justify-between items-center flex-col">
        <h1 className="text-3xl">Books</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <FontAwesomeIcon icon={faPlus} /> Add Book
        </button>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {books &&
            books.map((book) => (
              <div key={book.id}>
                <Book book={book} />
                <div className={'flex justify-center items-center'}>
                  <button
                    className={
                      'p-2 rounded-full bg-white border-2 border-gray-200 w-10 h-10'
                    }
                  >
                    <FontAwesomeIcon icon={faBookmark} color={'#1b89e5'} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Books;

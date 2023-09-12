import { BookType } from '@/types/BookType';

export const Book = ({ book }: { book: BookType }) => {
  return (
    book && (
      <div className="flex flex-col text-center p-2">
        <article
          className={
            'h-[fit-content] md:h-[170px] overflow-hidden flex justify-center items-end'
          }
        >
          <p className={'text-xl'}>
            {book.title}
            <br />
            <span className={'text-sm italic'}>{book.published_at}</span>
            <br />
            by <b>{book.author!.name}</b>
            <br />
            <span className={'text-sm'}>Publisher: {book.publisher!.name}</span>
          </p>
        </article>
        <div
          className={
            'h-[100px] w-[100px] md:h-[150px] md:w-[150px] m-auto flex justify-center items-center'
          }
        >
          <img src={book.cover} alt={book.title} className={'m-auto'} />
        </div>
        <p className={'text-start text-sm h-[100px] overflow-hidden'}>
          {book.synopsis}
        </p>
      </div>
    )
  );
};

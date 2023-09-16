import { toTruncate } from '@/Helpers/textHelpers';
import type { BookType } from '@/types/BookType';

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
          <img src={book.cover} alt={book.title} className={'m-auto h-full'} />
        </div>
        <p className={'mt-3 text-start text-sm h-[100px] overflow-hidden'}>
          {toTruncate(book.synopsis, 180)}
        </p>

        <div className={'flex flex-wrap gap-2 mt-2'}>
          <p className={'text-sm text-gray-600'}>
            Tags:{' '}
            {book.tags?.map((tag) => (
              <span
                key={tag.id}
                className={
                  'bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-600 mr-1'
                }
              >
                {tag.name}
              </span>
            ))}
            {book.tags_count === 0 && (
              <span className={'text-xs text-gray-600'}>No tags</span>
            )}
          </p>
        </div>
      </div>
    )
  );
};

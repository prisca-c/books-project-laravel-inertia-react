import { Book } from '@/Components/Books/Book';
import type { LibraryType } from '@/types/LibraryType';
import { toDateNomalized } from '@/Helpers/dateHelpers';

type LibraryProps = {
  library: LibraryType;
};

const Library = ({ library }: LibraryProps) => {
  return (
    <div
      className={
        'flex flex-col md:flex-row gap-6 justify-center items-center text-center p-2'
      }
    >
      <div className={'absolute top-0 left-0 p-2 bg-gray-100 rounded-br-lg'}>
        Added to library on {toDateNomalized(library.created_at)}
      </div>
      <div className={'md:w-[35%]'}>
        <Book book={library.edition?.book!} />
      </div>
      <div className={'flex flex-col text-center p-2 gap-6 md:w-[65%]'}>
        <p className={'text-xl text-start'}>
          <span className={'font-bold underline'}>Book Edition :</span>{' '}
          {library.edition?.format} - {library.edition?.published_at}
        </p>

        <p className={'text-xl text-start'}>
          <span className={'font-bold underline'}>Status :</span>{' '}
          {library.status}
        </p>

        {library.started_at && (
          <p className={'text-xl text-start'}>
            <span className={'font-bold underline'}>Started at :</span>{' '}
            {toDateNomalized(library.started_at)}
          </p>
        )}

        {library.finished_at && (
          <p className={'text-xl text-start'}>
            <span className={'font-bold underline'}>Finished at :</span>{' '}
            {toDateNomalized(library.finished_at)}
          </p>
        )}

        <div className={'flex flex-col justify-center items-start gap-2'}>
          <p className={'text-xl font-bold underline text-start'}>
            Personal Notes :
          </p>
          <p className={'text-start'}>{library.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default Library;

import { useState } from 'react';
import { Book } from '@/Components/Books/Book';
import { toDateNomalized } from '@/Helpers/dateHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import RatingModal from '@/Components/Modals/RatingModal';
import type { LibraryType } from '@/types/LibraryType';

type LibraryProps = {
  library: LibraryType;
};

const Library = ({ library }: LibraryProps) => {
  const [showRatingModal, setShowRatingModal] = useState(false);

  return (
    <div
      className={
        'flex flex-col md:flex-row gap-6 justify-center items-center text-center p-2'
      }
    >
      {showRatingModal && (
        <RatingModal
          setShow={setShowRatingModal}
          bookId={library.edition?.book?.id!}
          exist={!!library.rating}
          userRating={library.rating}
        />
      )}
      <div className={'absolute top-0 left-0 p-2 bg-gray-100 rounded-br-lg'}>
        Added to library on {toDateNomalized(library.created_at)}
      </div>
      <div className={'md:w-[35%]'}>
        <Book book={library.edition?.book!} />
      </div>
      <div className={'flex flex-col text-center p-2 gap-6 md:w-[65%]'}>
        <button
          onClick={() => setShowRatingModal(true)}
          className={
            'text-start bg-gray-100 p-2 rounded-lg w-[fit-content] hover:bg-gray-200'
          }
        >
          <FontAwesomeIcon icon={faStar} className={'text-yellow-500 mr-2'} />
          {library.rating ? <> Modify my rating </> : <> Rate this book </>}
        </button>

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

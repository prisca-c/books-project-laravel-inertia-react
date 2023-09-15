import { RatingType } from '@/types/RatingType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type ReviewsProps = {
  reviews: RatingType[];
};

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <>
      <h3 className="text-lg text-center leading-6 font-medium text-gray-900 border-b border-gray-300 pb-2">
        Reviews ({reviews.length})
      </h3>
      {reviews.length > 0 ? (
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          {reviews.map((rating) => (
            <div
              className={'bg-gray-100 p-4 rounded-lg flex flex-col'}
              key={rating.id}
            >
              <div className={'flex justify-between items-center'}>
                <p className={'text-lg font-semibold'}>{rating.username}</p>
                <p className={'text-sm text-gray-600 font-bold'}>
                  {rating.rating}{' '}
                  <FontAwesomeIcon
                    icon={faStar}
                    className={'text-yellow-500'}
                  />
                </p>
              </div>
              <p className={'text-sm text-gray-500'}>
                {rating.review || 'No review'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className={'text-lg text-center leading-6 font-medium'}>
          No reviews yet.
        </p>
      )}
    </>
  );
};

export default Reviews;

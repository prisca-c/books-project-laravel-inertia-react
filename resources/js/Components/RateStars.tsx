import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type StarRatingProps = {
  rating: number;
  onStarClick: (i: number) => void;
};

const StarRating = ({ rating, onStarClick }: StarRatingProps) => {
  const [animationInProgress, setAnimationInProgress] = useState(false);

  useEffect(() => {
    if (animationInProgress) {
      const animationTimeout = setTimeout(() => {
        setAnimationInProgress(false);
      }, 1000);

      return () => clearTimeout(animationTimeout);
    }
  }, [animationInProgress]);

  const handleStarClick = (i: number) => {
    if (!animationInProgress) {
      setAnimationInProgress(true);

      if (i < rating - 1) {
        for (let j = rating; j > i + 1; j--) {
          setTimeout(
            () => {
              onStarClick(j - 1);
            },
            (rating - j + 1) * 150,
          );
        }
      } else if (i > rating - 1) {
        for (let j = rating; j < i + 1; j++) {
          setTimeout(
            () => {
              onStarClick(j + 1);
            },
            (j - rating + 1) * 150,
          );
        }
      }
    }
  };

  const classAnimation = (i: number) => {
    return `${i > rating - 1 ? 'opacity-30' : 'opacity-100'}`;
  };

  return (
    <div className="flex justify-center">
      {Array.from(Array(5).keys()).map((i) => (
        <FontAwesomeIcon
          icon={faStar}
          key={i}
          className={`text-yellow-500 text-4xl cursor-pointer hover:text-yellow-600 transition-all duration-500
          ${classAnimation(i)}`}
          onClick={() => handleStarClick(i)}
        />
      ))}
    </div>
  );
};

export default StarRating;

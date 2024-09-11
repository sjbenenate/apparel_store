import { FaStar, FaRegStar } from 'react-icons/fa';
import { FaRegStarHalfStroke } from 'react-icons/fa6';

const FiveStarIcons = (value) => {
  let icons = [];
  for (let level = 1; level <= 5; level++) {
    let StarIcon = FaRegStar;
    if (value >= level) {
      StarIcon = FaStar;
    } else if (value >= level - 0.5) {
      StarIcon = FaRegStarHalfStroke;
    }
    icons.push(<StarIcon key={level} />);
  }
  return icons;
};

export const Rating = ({ value, msg }) => {
  return (
    <div className="rating-container">
      <span>{FiveStarIcons(value)}</span>
      <span className="rating-msg">{msg && msg}</span>
    </div>
  );
};

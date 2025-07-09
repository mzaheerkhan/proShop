import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color = '#FF0000' }) => {
  const renderStar = (index) => {
    if (value >= index) return <FaStar  style={{ color }} />;
    if (value >= index - 0.5) return <FaStarHalfAlt  style={{ color }} />;
    return <FaRegStar  style={{ color }} />;
  };

  return (
    <div className="flex items-center space-x-1 text-sm">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>{renderStar(star)}</span>
      ))}
      {text && <span className="ml-2 text-gray-600">{text}</span>}
    </div>
  );
};

export default Rating;

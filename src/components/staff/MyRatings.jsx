// Display staff member's personal ratings and feedback from patients

import { Rating } from "react-simple-star-rating";
import "../../styles/Rating.css";

const sampleRatings = [
  { id: 1, name: "Ravi", rating: 3 },
  { id: 2, name: "Sita", rating: 5 },
  { id: 3, name: "Anil", rating: 4 },
];

export default function MyRating({ ratings = sampleRatings }) {

  const totalRatings = ratings.length;

  const averageRating =
    totalRatings > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0;

  return (
    <div className="rating-container">
  <h2 className="rating-title">My Ratings</h2>

  <div className="rating-summary">
    <div className="rating-total">Total Ratings: {totalRatings}</div>
    <div className="rating-average">{averageRating.toFixed(1)} / 5</div>
    <Rating readonly initialValue={averageRating} allowFraction size={28} />
  </div>

  <h3 className="rating-list-title">Individual Reviews</h3>

  {ratings.length === 0 && (
    <p className="rating-empty">No ratings yet</p>
  )}

  {ratings.map((item) => (
    <div key={item.id} className="rating-item">
      <span className="rating-name">{item.name}</span>
      <Rating readonly initialValue={item.rating} size={22} />
    </div>
  ))}
</div>


  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ForgottenAsylumReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  // Fetch all reviews on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/forgotten-asylum')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to load reviews:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      return alert('You must be logged in to submit a review.');
    }

    if (!comment || rating === 0) {
      return alert('Please provide both a comment and rating.');
    }

    const newReview = {
      comment,
      rating,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    };

    try {
      await axios.post('http://localhost:5000/api/forgotten-asylum', newReview, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Refresh reviews after adding
      const res = await axios.get('http://localhost:5000/api/forgotten-asylum');
      setReviews(res.data);
      setComment('');
      setRating(0);
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review.');
    }
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) =>
      i < count ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
    );
  };

  return (
    <div className="reviews-page">
      <div className="left-section">
        <h2 className="add-review-title">Add Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <textarea
            className="comment-box"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(n => (
              <span key={n} className="star" onClick={() => setRating(n)}>
                {n <= rating ? <AiFillStar /> : <AiOutlineStar />}
              </span>
            ))}
          </div>

          <button type="submit" className="submit-btn">Add Review</button>
        </form>

        <h3 className="review-count">All Reviews ({reviews.length})</h3>

        {reviews.map((r) => (
          <div className="review-card" key={r._id}>
            <FaUserCircle className="user-icon" />
            <div className="review-content">
              <div className="review-user">{r.userId?.name || "Unknown User"}</div>
              <div className="review-date">{r.date}</div>
              <div className="review-comment">{r.comment}</div>
              <div className="review-stars">{renderStars(r.rating)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="right-section">
        <h2 className="ride-title">The Forgotten Asylum</h2>
        <div className="ride-image-placeholder">
          <img
            src="/pictures/forgotten.png"
            alt="The Forgotten Asylum"
            width="100%"
            height="500px"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgottenAsylumReviews;
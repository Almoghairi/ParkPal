import React, { use, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const TempestWrathReviews = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            user: 'User 1',
            comment: 'Best ride in the park',
            date: '2/2/2025 10:00 PM',
            rating: 4,
        }
    ]);

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment || rating === 0) return alert("The review must include comment and rating");

        const newReview = {
            id: reviews.length + 1,
            user: `User ${reviews.length + 1}`,
            comment,
            date: new Date().toLocaleString('en-US', 
                {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }),
            rating,
        }

        setReviews([newReview, ...reviews]);
        setComment("");
        setRating(0);

    }

    const renderStars = (count) => {
        return(
            [...Array(5)].map((_, i) => 
                i < count ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
            )
        );
    }

    return(
        <div className="reviews-page">
            {/* Left */}
            <div className="left-section">
                <h2 className="add-review-title">Add Review</h2>

                <form onSubmit={handleSubmit} className="review-form">
                    <textarea
                        className="comment-box"
                        placeholder="Write your review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} 
                    />

                    <div className="star-rating">
                        {
                            [1,2,3,4,5].map((n) => (
                                <span key={n} className="star" onClick={() => setRating(n)}>
                                    {n <= rating ? <AiFillStar /> : <AiOutlineStar />}
                                </span>
                            ))
                        }
                    </div>

                    <button type="submit" className="submit-btn">
                        Add Review
                    </button>
                </form>

                <h3 className="review-count">All Reviews ({reviews.length})</h3>

                {
                    reviews.map((r) => (
                        <div className="review-card" key={r.id}>
                            <FaUserCircle className="user-icon" />
                            <div className="review-content">
                                <div className="review-user">{r.user}</div>
                                <div className="review-date">{r.date}</div>
                                <div className="review-comment">{r.comment}</div>
                                <div className="review-stars">{renderStars(r.rating)}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
            {/* Right */}
            <div className="right-section">
                <h2 className="ride-title">The Tempest's Wrath</h2>
                <div className="ride-image-placeholder">
                    <img src="/pictures/tampet.png" 
                        alt="The Tempest's Wrath"
                        width="100%"
                        height="500px" 
                    />
                </div>
            </div>
        </div>
    );
}

export default TempestWrathReviews;
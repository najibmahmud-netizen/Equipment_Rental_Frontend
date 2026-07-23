import { useEffect, useState } from "react";
import api from "../../services/api";

function ReviewSection({ equipmentId }) {
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [equipmentId]);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/equipment/reviews/");

      const filtered = response.data.filter(
        (review) => review.equipment === Number(equipmentId)
      );

      setReviews(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("access")) {
      alert("Please login first.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/equipment/reviews/", {
        equipment: equipmentId,
        rating: Number(formData.rating),
        comment: formData.comment,
      });

      alert("Review submitted successfully.");

      setFormData({
        rating: 5,
        comment: "",
      });

      fetchReviews();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Failed to submit review."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-16">

      <h2 className="mb-6 text-3xl font-bold">
        Customer Reviews
      </h2>

      <form
        onSubmit={submitReview}
        className="mb-10 rounded-xl bg-white p-6 shadow"
      >

        <div className="mb-4">

          <label className="mb-2 block font-medium">
            Rating
          </label>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full rounded border p-3"
          >
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>

        </div>

        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Write your review..."
          rows="4"
          required
          className="w-full rounded border p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

      </form>

      {reviews.length === 0 ? (

        <div className="rounded bg-gray-100 p-6 text-center">
          No reviews yet.
        </div>

      ) : (

        <div className="space-y-5">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="rounded-xl bg-white p-6 shadow"
            >

              <div className="flex items-center justify-between">

                <h3 className="font-bold">
                  {review.customer_name}
                </h3>

                <span className="font-semibold text-yellow-600">
                  {"★".repeat(review.rating)}
                </span>

              </div>

              <p className="mt-3 text-gray-600">
                {review.comment}
              </p>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default ReviewSection;
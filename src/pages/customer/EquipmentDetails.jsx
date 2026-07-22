import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const placeholderImage =
  "https://placehold.co/600x400/e5e7eb/6b7280?text=No+Image";

function EquipmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);

  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await api.get(`/equipment/${id}/`);
        setEquipment(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEquipment();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/rentals/", {
        equipment: equipment.id,
        start_date: formData.start_date,
        end_date: formData.end_date,
      });

      alert("Rental request submitted successfully!");

      navigate("/my-rentals");
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!equipment) {
    return (
      <div className="py-20 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <img
          src={equipment.image || placeholderImage}
          alt={equipment.name}
          className="w-full rounded-2xl"
        />

        <div>
          <h1 className="text-4xl font-bold">
            {equipment.name}
          </h1>

          <p className="mt-4 text-gray-600">
            {equipment.description}
          </p>

          <p className="mt-5 text-xl font-semibold">
            KSh {equipment.daily_price}/day
          </p>

          <p className="mt-3">
            Quantity: {equipment.quantity}
          </p>

          <p
            className={`mt-2 font-semibold ${
              equipment.available
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {equipment.available
              ? "Available"
              : "Not Available"}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block font-medium">
                Start Date
              </label>

              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                End Date
              </label>

              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <button
              type="submit"
              disabled={!equipment.available || loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : "Rent Equipment"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EquipmentDetails;
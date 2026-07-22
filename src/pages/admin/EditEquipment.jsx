import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditEquipment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    daily_price: "",
    quantity: "",
    available: true,
  });

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await api.get(`/equipment/${id}/`);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load equipment.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/equipment/${id}/`, formData);

      alert("Equipment updated successfully.");

      navigate("/admin");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Failed to update equipment."
      );
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow">

        <h1 className="mb-8 text-3xl font-bold">
          Edit Equipment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block font-medium">
              Equipment Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Category ID
            </label>

            <input
              type="number"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Daily Price (KSh)
            </label>

            <input
              type="number"
              name="daily_price"
              value={formData.daily_price}
              onChange={handleChange}
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full rounded border p-3"
              required
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available for Rent
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Save Changes
          </button>

        </form>

      </div>
    </section>
  );
}

export default EditEquipment;
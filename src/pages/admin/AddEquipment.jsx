import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddEquipment() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    daily_price: "",
    quantity: "",
    available: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/equipment/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
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
      await api.post("/equipment/", formData);

      alert("Equipment added successfully!");

      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Failed to add equipment.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">

        <h1 className="mb-8 text-3xl font-bold">
          Add Equipment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Equipment Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded border px-4 py-3"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded border px-4 py-3"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full rounded border px-4 py-3"
          />

          <input
            type="number"
            name="daily_price"
            placeholder="Daily Price"
            value={formData.daily_price}
            onChange={handleChange}
            required
            className="w-full rounded border px-4 py-3"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full rounded border px-4 py-3"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />

            Available
          </label>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            Add Equipment
          </button>

        </form>

      </div>
    </section>
  );
}

export default AddEquipment;
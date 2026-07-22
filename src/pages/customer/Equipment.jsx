import { useEffect, useState } from "react";
import api from "../../services/api";
import EquipmentCard from "../../components/equipment/EquipmentCard";

function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchEquipment();
    fetchCategories();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await api.get("/equipment/");

      setEquipment(response.data);
      setFilteredEquipment(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/equipment/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let filtered = equipment;

    // Search filter
    if (search !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) => item.category_name === selectedCategory
      );
    }

    setFilteredEquipment(filtered);
  }, [search, selectedCategory, equipment]);

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Available Equipment
          </h1>

          <p className="mt-2 text-gray-600">
            Browse all available equipment for rent.
          </p>

          {/* Search */}
          <input
            type="text"
            placeholder="Search equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-6 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={() => setSelectedCategory("All")}
              className={`rounded-lg px-4 py-2 ${
                selectedCategory === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`rounded-lg px-4 py-2 ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                {category.name}
              </button>
            ))}

          </div>

        </div>

        {filteredEquipment.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-xl text-gray-500">
              No equipment found.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEquipment.map((item) => (
              <EquipmentCard
                key={item.id}
                equipment={item}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Equipment;
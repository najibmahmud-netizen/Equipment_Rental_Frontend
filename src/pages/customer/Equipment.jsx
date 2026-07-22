import { useEffect, useState } from "react";
import api from "../../services/api";
import EquipmentCard from "../../components/equipment/EquipmentCard";

function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await api.get("/equipment/");

        console.log("Equipment from Django:", response.data);

        setEquipment(response.data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };

    fetchEquipment();
  }, []);

  // Filter equipment based on search input
  const filteredEquipment = equipment.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Available Equipment
          </h1>

          <p className="mt-2 text-gray-600">
            Browse all available equipment for rent.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 outline-none focus:border-blue-600"
          />
        </div>

        {/* Equipment Grid */}
        {filteredEquipment.length === 0 ? (
          <p className="text-center text-gray-500">
            No equipment found.
          </p>
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
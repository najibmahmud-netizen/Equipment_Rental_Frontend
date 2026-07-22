import { useEffect, useState } from "react";
import api from "../../services/api";
import EquipmentCard from "../../components/equipment/EquipmentCard";

function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await api.get("/equipment/");

      setEquipment(response.data);
      setFilteredEquipment(response.data);

      console.log("Equipment from Django:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const filtered = equipment.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredEquipment(filtered);
  }, [search, equipment]);

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

          <input
            type="text"
            placeholder="Search equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-6 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />

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
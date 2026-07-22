import { useEffect, useState } from "react";
import api from "../../services/api";
import EquipmentCard from "../../components/equipment/EquipmentCard";

function Equipment() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await api.get("/equipment/");

        console.log(response.data);

        setEquipment(response.data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Available Equipment
          </h1>

          <p className="mt-2 text-gray-600">
            Browse all available equipment for rent.
          </p>
        </div>

        {equipment.length === 0 ? (
          <p className="text-center text-gray-500">
            No equipment available.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {equipment.map((item) => (
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
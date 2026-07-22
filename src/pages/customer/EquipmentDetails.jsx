import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const placeholderImage =
  "https://placehold.co/600x400/e5e7eb/6b7280?text=No+Image";

function EquipmentDetails() {
  const { id } = useParams();

  const [equipment, setEquipment] = useState(null);

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

  if (!equipment) {
    return (
      <div className="py-20 text-center">
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

          <p className="mt-6 text-xl font-semibold">
            KSh {equipment.daily_price}/day
          </p>

          <p className="mt-4">
            Quantity: {equipment.quantity}
          </p>

          <p className="mt-2">
            Status:
            <span
              className={
                equipment.available
                  ? "ml-2 text-green-600 font-semibold"
                  : "ml-2 text-red-600 font-semibold"
              }
            >
              {equipment.available
                ? "Available"
                : "Not Available"}
            </span>
          </p>

          <button
            className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            disabled={!equipment.available}
          >
            Rent Equipment
          </button>
        </div>
      </div>
    </section>
  );
}

export default EquipmentDetails;
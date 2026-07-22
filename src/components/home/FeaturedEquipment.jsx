import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import api from "../../services/api";

function FeaturedEquipment() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await api.get("/equipment/");
        console.table(response.data);
        setEquipment(response.data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Featured Equipment
            </h2>

            <p className="mt-3 text-gray-600">
              Popular equipment available for rent.
            </p>
          </div>

          <button className="hidden items-center gap-2 rounded-lg border px-5 py-3 transition hover:bg-blue-600 hover:text-white md:flex">
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={
                  item.image
                    ? item.image
                    : "https://placehold.co/600x400?text=Equipment"
                }
                alt={item.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <span className="text-sm font-semibold text-blue-600">
                  {item.category_name}
                </span>

                <h3 className="mt-2 text-2xl font-bold">
                  {item.name}
                </h3>

                <p className="mt-3 text-gray-600 line-clamp-2">
                  {item.description}
                </p>

                <p className="mt-4 text-lg font-semibold text-gray-700">
                  KSh {item.daily_price} / day
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p
                  className={`mt-2 font-semibold ${
                    item.available
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.available ? "Available" : "Out of Stock"}
                </p>

                <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedEquipment;
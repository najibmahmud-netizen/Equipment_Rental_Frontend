const placeholderImage =
  "https://placehold.co/600x400/e5e7eb/6b7280?text=No+Image";

function EquipmentCard({ equipment }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <img
        src={equipment.image || placeholderImage}
        alt={equipment.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">
        <span className="text-sm font-semibold text-blue-600">
          {equipment.category_name}
        </span>

        <h3 className="mt-2 text-2xl font-bold">
          {equipment.name}
        </h3>

        <p className="mt-3 text-gray-600">
          {equipment.description}
        </p>

        <p className="mt-4 text-lg font-semibold text-gray-800">
          KSh {equipment.daily_price}/day
        </p>

        <p className="mt-2 text-gray-600">
          Quantity: {equipment.quantity}
        </p>

        <p
          className={`mt-2 font-semibold ${
            equipment.available
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {equipment.available ? "Available" : "Not Available"}
        </p>

        <button
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          disabled={!equipment.available}
        >
          Rent Now
        </button>
      </div>
    </div>
  );
}

export default EquipmentCard;
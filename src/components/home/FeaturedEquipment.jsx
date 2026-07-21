import { ArrowRight } from "lucide-react";

const equipment = [
  {
    id: 1,
    name: "HP EliteBook",
    category: "Laptop",
    price: "KSh 800/day",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",
  },
  {
    id: 2,
    name: "Canon EOS Camera",
    category: "Camera",
    price: "KSh 1,200/day",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700",
  },
  {
    id: 3,
    name: "Epson Projector",
    category: "Projector",
    price: "KSh 950/day",
    image:
      "https://images.unsplash.com/photo-1528395874238-34ebe249b3f2?w=700",
  },
];

function FeaturedEquipment() {
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
                src={item.image}
                alt={item.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <span className="text-sm font-semibold text-blue-600">
                  {item.category}
                </span>

                <h3 className="mt-2 text-2xl font-bold">
                  {item.name}
                </h3>

                <p className="mt-4 text-lg font-semibold text-gray-700">
                  {item.price}
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
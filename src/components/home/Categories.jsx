import { Laptop, Camera, Presentation, Wrench } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Laptops",
    icon: Laptop,
    description: "High-performance laptops for work and study.",
  },
  {
    id: 2,
    name: "Cameras",
    icon: Camera,
    description: "Professional cameras for photography and video.",
  },
  {
    id: 3,
    name: "Projectors",
    icon: Presentation,
    description: "Projectors for meetings and presentations.",
  },
  {
    id: 4,
    name: "Power Tools",
    icon: Wrench,
    description: "Reliable tools for construction and repairs.",
  },
];

function Categories() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Browse Categories
          </h2>

          <p className="mt-4 text-gray-600">
            Explore our wide range of rental equipment.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                className="rounded-2xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-600 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Icon className="text-blue-600" size={30} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>

                <p className="mt-3 text-gray-600">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
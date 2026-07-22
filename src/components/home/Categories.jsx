import { useEffect, useState } from "react";
import api from "../../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/equipment/categories/");
        console.table(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-600 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-gray-900">
                {category.name}
              </h3>

              <p className="mt-4 text-gray-600">
                Equipment available in this category.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
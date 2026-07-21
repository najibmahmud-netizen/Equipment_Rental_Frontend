import {
  ShieldCheck,
  Clock3,
  Wallet,
  Headphones,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Trusted Equipment",
    description:
      "Every item is verified and maintained to ensure reliability.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Quick Approval",
    description:
      "Rental requests are processed quickly so you can get started sooner.",
    icon: Clock3,
  },
  {
    id: 3,
    title: "Affordable Pricing",
    description:
      "Competitive daily rental prices for students and businesses.",
    icon: Wallet,
  },
  {
    id: 4,
    title: "Customer Support",
    description:
      "Our support team is ready to assist whenever you need help.",
    icon: Headphones,
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose EquipRent?
          </h2>

          <p className="mt-4 text-gray-600">
            We provide a simple, secure, and reliable equipment rental experience.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="rounded-2xl border bg-gray-50 p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Icon className="text-blue-600" size={30} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
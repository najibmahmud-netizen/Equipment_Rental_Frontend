import { ArrowRight, Search, ShieldCheck, Truck } from "lucide-react";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-20 lg:flex-row">
        {/* Left Content */}
        <div className="flex-1">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Trusted Equipment Rental Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
            Rent Professional Equipment
            <span className="block text-blue-600">
              Anytime You Need It
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Browse laptops, cameras, projectors and professional tools.
            Fast approval, affordable daily pricing, and reliable equipment
            for students and businesses.
          </p>

          {/* Search */}
          <div className="mt-10 flex max-w-xl overflow-hidden rounded-xl border bg-white shadow">
            <input
              type="text"
              placeholder="Search equipment..."
              className="flex-1 px-5 py-4 outline-none"
            />

            <button className="bg-blue-600 px-6 text-white transition hover:bg-blue-700">
              <Search size={22} />
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
              Browse Equipment
              <ArrowRight size={18} />
            </button>

            <button className="rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100">
              Learn More
            </button>
          </div>

          {/* Features */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-600" />
              <span>Verified Equipment</span>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="text-blue-600" />
              <span>Fast Processing</span>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="hidden flex-1 justify-center lg:flex">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700"
            alt="Equipment"
            className="w-full max-w-lg rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
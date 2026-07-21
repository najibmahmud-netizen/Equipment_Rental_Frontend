import { Link } from "react-router-dom";
import { Menu, Wrench } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <Wrench size={28} />
          EquipRent
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          <Link to="/equipment" className="text-gray-700 hover:text-blue-600">
            Equipment
          </Link>

          <Link to="/my-rentals" className="text-gray-700 hover:text-blue-600">
            My Rentals
          </Link>

          <Link to="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Login
          </Link>
        </div>

        {/* Mobile Icon */}
        <button className="md:hidden">
          <Menu size={28} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
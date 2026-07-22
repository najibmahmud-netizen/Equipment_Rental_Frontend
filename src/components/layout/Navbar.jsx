import { Link, useNavigate } from "react-router-dom";
import { Menu, Wrench } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <Wrench size={28} />
          EquipRent
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/equipment"
            className="text-gray-700 hover:text-blue-600"
          >
            Equipment
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {user.is_staff ? (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/my-rentals"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    My Rentals
                  </Link>
                </>
              )}

              <span className="font-semibold text-blue-600">
                Welcome, {user.username}
              </span>

              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden">
          <Menu size={28} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
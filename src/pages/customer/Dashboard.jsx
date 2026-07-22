import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Dashboard() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await api.get("/rentals/");
      setRentals(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const total = rentals.length;
  const pending = rentals.filter(
    (rental) => rental.status === "Pending"
  ).length;

  const approved = rentals.filter(
    (rental) => rental.status === "Approved"
  ).length;

  const rejected = rentals.filter(
    (rental) => rental.status === "Rejected"
  ).length;

  const returned = rentals.filter(
    (rental) => rental.status === "Returned"
  ).length;

  const badgeColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Returned":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-2xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="text-4xl font-bold">
          Welcome, {user?.username} 
        </h1>

        <p className="mt-2 text-gray-600">
          Here's an overview of your rental activity.
        </p>

        {/* Statistics */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">Total Rentals</h2>
            <p className="mt-2 text-4xl font-bold text-blue-600">
              {total}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">Pending</h2>
            <p className="mt-2 text-4xl font-bold text-yellow-500">
              {pending}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">Approved</h2>
            <p className="mt-2 text-4xl font-bold text-green-600">
              {approved}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">Rejected</h2>
            <p className="mt-2 text-4xl font-bold text-red-600">
              {rejected}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">Returned</h2>
            <p className="mt-2 text-4xl font-bold text-purple-600">
              {returned}
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-10 rounded-xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="mt-6 flex flex-wrap gap-4">

            <Link
              to="/equipment"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Browse Equipment
            </Link>

            <Link
              to="/my-rentals"
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              My Rentals
            </Link>

          </div>
        </div>

        {/* Recent Rentals */}
        <div className="mt-10 rounded-xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Recent Rentals
          </h2>

          {rentals.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              You haven't rented any equipment yet.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="border-b bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left">Equipment</th>
                    <th className="px-4 py-3 text-left">Start</th>
                    <th className="px-4 py-3 text-left">End</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>

                  {rentals.map((rental) => (
                    <tr
                      key={rental.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        {rental.equipment_name}
                      </td>

                      <td className="px-4 py-3">
                        {rental.start_date}
                      </td>

                      <td className="px-4 py-3">
                        {rental.end_date}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeColor(
                            rental.status
                          )}`}
                        >
                          {rental.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default Dashboard;
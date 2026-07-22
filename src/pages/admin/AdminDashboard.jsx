import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminDashboard() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await api.get("/rentals/all/");
      setRentals(response.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
        "Failed to load rental requests."
      );
    } finally {
      setLoading(false);
    }
  };

  const approveRental = async (id) => {
    try {
      await api.patch(`/rentals/${id}/approve/`);
      alert("Rental approved successfully.");
      fetchRentals();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
        "Failed to approve rental."
      );
    }
  };

  const rejectRental = async (id) => {
    try {
      await api.patch(`/rentals/${id}/reject/`);
      alert("Rental rejected successfully.");
      fetchRentals();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
        "Failed to reject rental."
      );
    }
  };

  const returnRental = async (id) => {
    try {
      await api.patch(`/rentals/${id}/return/`);
      alert("Equipment returned successfully.");
      fetchRentals();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
        "Failed to return equipment."
      );
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

  if (loading) {
    return (
      <div className="py-20 text-center text-2xl">
        Loading rentals...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-8 text-4xl font-bold">
          Admin Dashboard
        </h1>

        {/* Statistics */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">Total Requests</h2>
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

        {rentals.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-xl text-gray-500">
              No rental requests found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="min-w-full">

              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Equipment</th>
                  <th className="px-4 py-3 text-left">Start Date</th>
                  <th className="px-4 py-3 text-left">End Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {rentals.map((rental) => (
                  <tr key={rental.id} className="border-b">

                    <td className="px-4 py-3">
                      {rental.customer_name}
                    </td>

                    <td className="px-4 py-3">
                      {rental.equipment_name}
                    </td>

                    <td className="px-4 py-3">
                      {rental.start_date}
                    </td>

                    <td className="px-4 py-3">
                      {rental.end_date}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      {rental.status}
                    </td>

                    <td className="space-x-2 px-4 py-3 text-center">

                      {rental.status === "Pending" && (
                        <>
                          <button
                            onClick={() => approveRental(rental.id)}
                            className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => rejectRental(rental.id)}
                            className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {rental.status === "Approved" && (
                        <button
                          onClick={() => returnRental(rental.id)}
                          className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                        >
                          Return
                        </button>
                      )}

                      {rental.status === "Rejected" && (
                        <span className="font-semibold text-red-600">
                          Rejected
                        </span>
                      )}

                      {rental.status === "Returned" && (
                        <span className="font-semibold text-green-600">
                          Completed ✓
                        </span>
                      )}

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </section>
  );
}

export default AdminDashboard;
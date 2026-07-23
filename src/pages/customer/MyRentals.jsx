import { useEffect, useState } from "react";
import api from "../../services/api";

function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const cancelRental = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this rental request?"
    );

    if (!confirmCancel) return;

    try {
      await api.delete(`/rentals/${id}/`);

      alert("Rental request cancelled successfully.");

      fetchRentals();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Failed to cancel rental."
      );
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading rentals...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-6">

        <h1 className="mb-8 text-4xl font-bold">
          My Rentals
        </h1>

        {rentals.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            <p className="text-gray-600">
              You haven't rented any equipment yet.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-white shadow">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">
                    Equipment
                  </th>

                  <th className="px-6 py-4 text-left">
                    Start
                  </th>

                  <th className="px-6 py-4 text-left">
                    End
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {rentals.map((rental) => (
                  <tr
                    key={rental.id}
                    className="border-b"
                  >

                    <td className="px-6 py-4">
                      {rental.equipment_name}
                    </td>

                    <td className="px-6 py-4">
                      {rental.start_date}
                    </td>

                    <td className="px-6 py-4">
                      {rental.end_date}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          rental.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : rental.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : rental.status === "Returned"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {rental.status}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-center">

                      {rental.status === "Pending" ? (
                        <button
                          onClick={() =>
                            cancelRental(rental.id)
                          }
                          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-gray-400">
                          —
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

export default MyRentals;
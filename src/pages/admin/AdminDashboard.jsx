import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function AdminDashboard() {
  const [rentals, setRentals] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      const [rentalsResponse, equipmentResponse] = await Promise.all([
        api.get("/rentals/all/"),
        api.get("/equipment/"),
      ]);

      setRentals(rentalsResponse.data);
      setEquipment(equipmentResponse.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const approveRental = async (id) => {
    try {
      await api.patch(`/rentals/${id}/approve/`);
      alert("Rental approved successfully.");
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to approve rental.");
    }
  };

  const rejectRental = async (id) => {
    try {
      await api.patch(`/rentals/${id}/reject/`);
      alert("Rental rejected successfully.");
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to reject rental.");
    }
  };

  const returnRental = async (id) => {
    try {
      await api.patch(`/rentals/${id}/return/`);
      alert("Equipment returned successfully.");
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to return equipment.");
    }
  };

  const deleteEquipment = async (id) => {
    if (!window.confirm("Delete this equipment?")) return;

    try {
      await api.delete(`/equipment/${id}/`);
      alert("Equipment deleted successfully.");
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete equipment.");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>

            <p className="mt-2 text-gray-600">
              Manage rental requests and equipment.
            </p>
          </div>

          <Link
            to="/admin/add-equipment"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Equipment
          </Link>
        </div>

        {/* Rental Requests */}
        <div className="mb-12 overflow-x-auto rounded-xl bg-white shadow">

          <h2 className="border-b px-6 py-4 text-2xl font-bold">
            Rental Requests
          </h2>

          <table className="min-w-full">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Equipment</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {rentals.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-500"
                  >
                    No rental requests found.
                  </td>
                </tr>
              ) : (
                rentals.map((rental) => (
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

                    <td className="px-4 py-3">
                      {rental.status}
                    </td>

                    <td className="space-x-2 px-4 py-3">

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
                          Mark Returned
                        </button>
                      )}

                      {rental.status === "Returned" && (
                        <span className="font-semibold text-green-600">
                          Returned ✓
                        </span>
                      )}

                      {rental.status === "Rejected" && (
                        <span className="font-semibold text-red-600">
                          Rejected
                        </span>
                      )}

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

        {/* Equipment Inventory */}

        <div className="overflow-x-auto rounded-xl bg-white shadow">

          <h2 className="border-b px-6 py-4 text-2xl font-bold">
            Equipment Inventory
          </h2>

          <table className="min-w-full">

            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Available</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {equipment.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-500"
                  >
                    No equipment available.
                  </td>
                </tr>
              ) : (
                equipment.map((item) => (
                  <tr key={item.id} className="border-b">

                    <td className="px-4 py-3">{item.name}</td>

                    <td className="px-4 py-3">
                      {item.category_name}
                    </td>

                    <td className="px-4 py-3">
                      KSh {item.daily_price}
                    </td>

                    <td className="px-4 py-3">
                      {item.quantity}
                    </td>

                    <td className="px-4 py-3">
                      {item.available ? "✅ Yes" : "❌ No"}
                    </td>

                    <td className="space-x-2 px-4 py-3">

                      <Link
                        to={`/admin/edit-equipment/${item.id}`}
                        className="rounded bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteEquipment(item.id)}
                        className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>
    </section>
  );
}

export default AdminDashboard;
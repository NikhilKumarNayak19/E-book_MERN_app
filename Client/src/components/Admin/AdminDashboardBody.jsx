import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Retrieve the token from sessionStorage
        const token = sessionStorage.getItem("token");
        if (!token) {
          setError(true);
          return;
        }

        // Fetch admin data from the API
        const response = await axios.get("https://e-book-mern-app.onrender.com/api/user/data", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        setAdminData(response.data.userData); // Update the state with admin data
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-red-500">
        Failed to load admin data. Please try again.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      {/* Sidebar */}
      <div className="lg:w-1/4 bg-zinc-800 p-4 flex flex-col items-center">
        {/* Admin Profile */}
        <div className="text-center flex flex-col items-center">
          <img
            src={adminData?.avatar || "https://via.placeholder.com/100"}
            alt="Admin"
            className="h-24 w-24 rounded-full border border-gray-500"
          />
          <div className="mt-4">
            <p className="text-xl font-bold">{adminData?.name || "Admin"}</p>
            <p className="text-gray-400 text-sm mt-1">{adminData?.email || "admin@example.com"}</p>
          </div>
        </div>
        <hr className="w-full border-gray-700 my-6" />
        {/* Sidebar Options */}
        <nav className="flex flex-col w-full">
          <Link
            to="/admin-dashboard"
            className="text-lg py-2 px-4 hover:bg-zinc-700 rounded transition-all duration-300"
          >
            View All Resources
          </Link>
          <Link
            to="/admin-dashboard/add-resource"
            className="text-lg py-2 px-4 hover:bg-zinc-700 rounded transition-all duration-300"
          >
            Add Resource
          </Link>
          <Link
            to="/admin-dashboard/update-resource"
            className="text-lg py-2 px-4 hover:bg-zinc-700 rounded transition-all duration-300"
          >
            Update Resource
          </Link>
          <Link
            to="/admin-dashboard/delete-resource"
            className="text-lg py-2 px-4 hover:bg-zinc-700 rounded transition-all duration-300"
          >
            Delete Resource
          </Link>
          <Link
            to="/admin-dashboard/view-users"
            className="text-lg py-2 px-4 hover:bg-zinc-700 rounded transition-all duration-300"
          >
            View All Users
          </Link>
          <Link
            to="/admin-dashboard/mail-users"
            className="text-lg py-2 px-4 hover:bg-zinc-700 rounded transition-all duration-300"
          >
            Mail Users
          </Link>
        </nav>
        <button
          className="mt-auto w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-all duration-300"
          onClick={() => {
            // Log out logic
            sessionStorage.clear();
            window.location.href = "/login";
          }}
        >
          Log Out
        </button>
      </div>
      {/* Main Content */}
      <div className="lg:w-3/4 p-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">All Resources</h1>
        <table className="w-full bg-zinc-800 border border-gray-700 rounded text-left">
          <thead>
            <tr className="text-yellow-400">
              <th className="py-2 px-4 border-b border-gray-700">Sr.</th>
              <th className="py-2 px-4 border-b border-gray-700">Resources</th>
              <th className="py-2 px-4 border-b border-gray-700">Description</th>
              <th className="py-2 px-4 border-b border-gray-700">Status</th>
              <th className="py-2 px-4 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">1</td>
              <td className="py-2 px-4 border-b border-gray-700">Name</td>
              <td className="py-2 px-4 border-b border-gray-700">abc</td>
              <td className="py-2 px-4 border-b border-gray-700">
                downloaded/reading online
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                <button className="text-blue-500 hover:underline">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../Loder";
import { FaBookReader, FaFileDownload, FaReadme } from "react-icons/fa";

const ViewResources = () => {
  const { id } = useParams(); // Extract resource ID from URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId); // Assuming user ID is in auth state
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/resource/get-resource-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching resource:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const addToReadLater = async () => {
    if (!isLoggedIn) {
      setNotification("You need to sign in to save this book to Read Later.");
      setTimeout(() => setNotification(""), 3000);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/readlater/add-resource-to-read-later",
        {},
        {
          headers: {
            resourceid: id,
            id: userId,
          },
        }
      );
      setNotification(response.data.message);
    } catch (error) {
      console.error("Error adding to Read Later:", error);
      setNotification("Failed to add to Read Later. Please try again.");
    } finally {
      setTimeout(() => setNotification(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <p className="text-red-500">Failed to load resource. Please try again later.</p>
      </div>
    );
  }

  return (
    data && (
      <div className="h-full w-full bg-zinc-900 flex flex-col items-start px-8 py-8">
        {notification && (
          <div className="w-full max-w-lg mx-auto p-4 bg-yellow-500 text-black text-center font-bold rounded-lg mb-6">
            {notification}
          </div>
        )}

        <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-zinc-800 rounded-lg p-6">
          <div className="lg:w-1/2">
            <div className="h-[88vh] bg-zinc-900 rounded flex justify-center items-center p-4">
              <img
                src={data.image}
                alt={data.title}
                className="h-full max-h-[88vh] object-contain rounded"
              />
            </div>
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
            <h1 className="text-4xl text-white font-bold">{data.title}</h1>
            <p className="text-lg text-zinc-400 mt-2">By {data.author}</p>
            <p className="text-lg text-zinc-500 mt-4">{data.desc}</p>
            <p className="text-lg text-zinc-400 font-medium mt-4">
              Category: {data.category}
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              <button
                onClick={addToReadLater}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all duration-300 text-lg"
              >
                <FaBookReader size={20} />
                Read Later
              </button>

              <button
                onClick={() => {
                  if (data?.url) {
                    window.location.href = data.url; // Redirect to the resource URL directly
                  } else {
                    setNotification("No valid link found for this resource.");
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300 text-lg"
              >
                <FaReadme size={20} />
                Read Now
              </button>
            </div>
            <button
  onClick={() => {
    if (isLoggedIn) {
      // Handle download logic
      window.open(data.url, "_blank"); // Example: Open the file in a new tab
    } else {
      setNotification("You need to sign in to download the resource.");
    }
  }}
  className={`flex items-center gap-2 px-6 py-3 ${
    isLoggedIn
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-gray-400 cursor-not-allowed"
  } text-white font-bold rounded-lg transition-all duration-300 text-lg`}
>
  <FaFileDownload size={20} />
  Download
</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewResources;

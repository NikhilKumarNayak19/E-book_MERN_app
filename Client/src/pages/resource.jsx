//import React from 'react'
import Loader from "../components/Loder";
import ResourceCard from "../components/ResourceCard/ResourceCard";
import { useState, useEffect } from "react";
import axios from "axios";

const Resource = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://e-book-mern-app.onrender.com/api/resource/get-all-resource"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recently added resources:", error);
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-zinc-900 text-white px-12 py-8 min-h-screen  h-auto">
      <h4 className="text-3xl text-yellow-200">Resources</h4>

      {/* Loader */}
      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Display Data */}
          {data.length > 0 ? (
            data.map((item, i) => <ResourceCard key={i} data={item} />)
          ) : (
            <p className="text-yellow-400">No resources found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Resource;

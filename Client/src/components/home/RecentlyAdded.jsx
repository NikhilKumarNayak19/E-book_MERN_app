import { useState, useEffect } from "react";
import ResourceCard from "../ResourceCard/ResourceCard";
import axios from "axios";

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/resource/get-recently-added-resource");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recently added resources:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once after component mounts.

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-200">Recently Added Resources</h4>

      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Data.length > 0 ? (
          Data.map((item, i) => (
            <div key={i}>
              <ResourceCard data={item} />
            </div>
          ))
        ) : (
          <p className="text-yellow-400">No resources found</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;

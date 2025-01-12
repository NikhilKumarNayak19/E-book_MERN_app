//import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ResourceCard = ({ data }) => {
  console.log(data);

  return (
    <Link>
      <div className="bg-zinc-800 rounded p-4 flex flex-col">
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img
            src={data.url}
            alt={data.title || "Resource"}
            className="w-full h-[25vh] object-cover rounded"
          />
        </div>
        <h2 className="mt-4 text-xl  font-semibold">{data.title}</h2>
        <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
      </div>
    </Link>
  );
};

// PropTypes for ResourceCard
ResourceCard.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
};

export default ResourceCard;

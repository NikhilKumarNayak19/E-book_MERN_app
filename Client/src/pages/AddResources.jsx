import React, { useState } from 'react';
import axios from 'axios';

const AddResources = () => {
  const [data, setData] = useState({
    url: '',
    title: '',
    author: '',
    language: '',
    desc: '',
  });

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const Change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (
        data.url === '' ||
        data.title === '' ||
        data.author === '' ||
        data.language === '' ||
        data.desc === ''
      ) {
        alert('All fields are required');
        return;
      }

      // Make API request
      const response = await axios.post(
        '/api/add-resource',
        { ...data },
        { headers }
      );

      if (response.status === 200) {
        alert('Resource added successfully!');
        setData({
          url: '',
          title: '',
          author: '',
          language: '',
          desc: '',
        });
      }
    } catch (error) {
      alert('An error occurred while adding the resource.');
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Resources
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            name="url"
            value={data.url}
            onChange={Change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="URL of image"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title of Book
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={Change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Title of book"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Author of Book
          </label>
          <input
            type="text"
            name="author"
            value={data.author}
            onChange={Change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Author of book"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Language
          </label>
          <input
            type="text"
            name="language"
            value={data.language}
            onChange={Change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Language of book"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description of Book
          </label>
          <input
            type="text"
            name="desc"
            value={data.desc}
            onChange={Change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Description of book"
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Add Resources
        </button>
      </div>
    </div>
  );
};

export default AddResources;

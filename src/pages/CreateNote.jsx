import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";
import { toast } from "react-toastify"; // Import toast

export default function CreateNote() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tagline: "",
    pin: false,
    createdAt: new Date(),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!formData.title || !formData.body || !formData.tagline) {
      toast.error("All fields are required!"); // Show toast error if any field is empty
      return;
    }

    try {
      await firebase.handleCreateNewNotes(
        formData.title,
        formData.body,
        formData.tagline,
        formData.pin,
        formData.createdAt
      );
      toast.success("Note created successfully!");  // Show toast on success
      setFormData({ title: "", body: "", tagline: "", pin: false });
      navigate('/');  // Redirect after successful creation
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Error creating note. Please try again.");  // Show toast on error
    }
  };

  return (
    <div>
      <span className="flex justify-center mt-8 text-4xl font-bold">
        Create a Note
      </span>
      <div className="flex justify-center mt-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-blue-300 p-4 border shadow-xl shadow-gray-400 rounded-lg bg-gray-200 "
        >
          <label htmlFor="title" className="text-2xl mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-96 border-2 border-blue-300 rounded-lg p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="title"
            placeholder="Enter title here"
            onChange={handleChange}
            value={formData.title}
          />

          <label htmlFor="tagline" className="text-xl mb-1">
            Tagline
          </label>
          <input
            type="text"
            className="w-96 border-2 border-blue-300 rounded-lg p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="tagline"
            placeholder="Enter tagline here"
            onChange={handleChange}
            value={formData.tagline}
          />

          <label htmlFor="body" className="text-xl mb-1">
            Body
          </label>
          <textarea
            className="w-96 h-24 resize-none border-2 border-blue-300 rounded-lg p-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="body"
            placeholder="Enter body here..."
            onChange={handleChange}
            value={formData.body}
          />
          <div className="flex justify-center gap-2 mb-4 text-lg">
            <input
              type="checkbox"
              onChange={handleChange}
              name="pin"
              id="pin"
              checked={formData.pin}
            />
            <label htmlFor="pin">Pin the note</label>
          </div>

          <button className="px-6 py-2 mb-4 bg-blue-600 text-white rounded-md hover:bg-white transition duration-300 hover:text-blue-400 hover:font-semibold hover:border-2 hover:outline-none hover:border-blue-400 ease-in-out text-sm md:text-base lg:text-lg">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

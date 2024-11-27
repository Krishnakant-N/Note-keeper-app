import React, { useState, useEffect } from "react";

function Modal({ showModal, closeModal, noteData, onSave, onDelete }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    if (showModal && noteData) {
      setTitle(noteData.title);
      setBody(noteData.body);
      setTagline(noteData.tagline);
    }
  }, [showModal, noteData]);

  const modalOverlayClasses = showModal
    ? "fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-100 z-50 flex justify-center items-center"
    : "fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 pointer-events-none";

  const modalContentClasses = showModal
    ? "transition-transform transform opacity-100 translate-y-0 duration-300 ease-out"
    : "transition-transform transform opacity-0 translate-y-10 duration-300 ease-in";

  const handleSave = () => {
    const updatedNote = { title, body, tagline };
    onSave(updatedNote);
    closeModal();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(); // Call the delete function passed as a prop
    }
    closeModal();
  };
  

  return (
    <div
      className={modalOverlayClasses}
      onClick={closeModal}
    >
      <div
        className={`${modalContentClasses} relative p-4 mx-auto my-auto bg-white rounded-lg w-11/12 max-w-md border-2 border-blue-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Edit Note</h2>

        <div>
          <label className="block text-xl font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 px-3 py-2 w-full border-2 border-blue-300 rounded-lg p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
          />
        </div>
        <div className="mt-4">
          <label className="block text-lg italic font-medium">Tagline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="mt-2 px-3 py-2 italic w-full border-2 border-blue-300 rounded-lg p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tagline"
          />
        </div>
        <div className="mt-4">
          <label className="block text-lg font-medium">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-2 px-3 py-2 resize-none w-full border-2 border-blue-300 rounded-lg p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter note content"
          />
        </div>
        <div className="mt-4 flex justify-between gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          <div className="flex gap-4">
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useFirebase } from "../Context/Firebase";
import Modal from "../components/Modal";
import loadingGif from "../assets/loading.gif";
import { ToastContainer, toast } from "react-toastify"; // Correct import
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported

function Notes() {
  const firebase = useFirebase();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const notesPerPage = 6; // Number of notes to show per page

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const notes = await firebase.listAllNotes();
        setNotes(notes.docs);
        setLoading(false);

        if (notes.docs.length === 0) {
          "No notes available. Create the note from the 'Create Note' button."
        }
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch notes. Please try again.", {
          autoClose: 5000,
        });
      }
    };
    fetchNotes();
  }, []);

  const handlePinToggle = async (noteId, currentStatus) => {
    try {
      await firebase.togglePinStatus(noteId, currentStatus);
      const updatedNotes = await firebase.listAllNotes();
      setNotes(updatedNotes.docs);
      toast.success("Pin status updated!", {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to update pin status. Please try again.", {
        autoClose: 5000,
      });
    }
  };

  const handleCardClick = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  const handleModalSave = async (formData) => {
    try {
      await firebase.updateNote(selectedNote.id, formData);
      const updatedNotes = await firebase.listAllNotes();
      setNotes(updatedNotes.docs);
      toast.success("Note updated successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to update note. Please try again.", {
        autoClose: 5000,
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const totalPages = Math.ceil(notes.length / notesPerPage);
  const paginatedNotes = notes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await firebase.deleteNote(noteId); // Calling the delete function from Firebase context
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete note.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-start pt-20">
        <img src={loadingGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen max-w-5xl mx-auto mt-10 mb-12 px-4">
      {notes.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-xl font-semibold">No notes available.</p>
          <p className="text-lg">Create the note from the Create Note button.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-2">
          {paginatedNotes.map((note) => (
            <Card
              key={note.id}
              title={note.data().title}
              tagline={note.data().tagline}
              body={note.data().body}
              pin={note.data().pin}
              onPinToggle={() => handlePinToggle(note.id, note.data().pin)}
              onCardClick={() => handleCardClick(note)}
            />
          ))}
        </div>
      )}

      {notes.length > 0 && (
        <div className="fixed bottom-4 w-full flex justify-center items-center gap-6">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white rounded-md ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white rounded-md ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}

      <Modal
        showModal={showModal}
        closeModal={closeModal}
        noteData={selectedNote?.data()}
        onSave={handleModalSave}
        onDelete={() => handleDeleteNote(selectedNote?.id)}
      />

      <ToastContainer /> {/* Make sure ToastContainer is here */}
    </div>
  );
}

export default Notes;

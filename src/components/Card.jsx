import React from "react";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";

function Card(props) {
  const { title, tagline, body, pin, onPinToggle, onCardClick } = props;

  const handlePinClick = (e) => {
    e.stopPropagation(); // Prevent the click event from triggering modal opening
    onPinToggle(); // Handle pin/unpin toggle
  };

  return (
    <div
      className="flex flex-col h-full bg-gray-200 rounded-xl shadow-lg shadow-blue-400 overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl relative cursor-pointer"
      onClick={onCardClick} // Open modal when the card is clicked
    >
      <div className="p-6 h-full relative">
        {/* Pin Button with Tooltip */}
        <div className="absolute top-4 right-4 group">
          <button
            onClick={handlePinClick} // Handle pin toggle
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              pin ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
            } hover:bg-blue-900 hover:text-white transition`}
          >
            {pin ? (
              <AiFillPushpin size={20} /> // Filled Pin
            ) : (
              <AiOutlinePushpin size={20} /> // Outline Pin
            )}
          </button>

          {/* Tooltip */}
          <div
            className="absolute top-full mt-1 right-0 p-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-max"
          >
            {pin ? "Unpin the Note" : "Pin the Note"}
          </div>
        </div>

        {/* Scrollable Title */}
        <div className="text-2xl font-bold text-gray-800 break-words max-h-10 pr-2 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {title}
        </div>

        {/* Scrollable Tagline */}
        <div className="italic font-semibold break-words max-h-8 pr-2 mt-1 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {tagline}
        </div>

        {/* Scrollable Body */}
        <div className="mt-2 text-gray-600 break-words max-h-24 pr-2 pb-4 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {body}
        </div>
      </div>
    </div>
  );
}

export default Card;

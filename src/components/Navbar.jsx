import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // Determine the active tab based on the current path
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src="https://r2.erweima.ai/i/6AaQTbLJTTqYE5_-cQm37Q.png"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <h1 className="text-xl font-bold">Note Keeper App</h1>
        </div>

        {/* Center Options */}
        <div className="flex space-x-6 mr-24 ml-10">
          <NavLink
            to="/"
            className={`text-lg font-bold ${
              isActive("/") ? "shadow-lg p-1 px-2 rounded-lg border-b-2 font-semibold" : "opacity-75 hover:border-b-2 "
            }`}
          >
            Notes List
          </NavLink>
        </div>

        {/* Create Note Button */}
        <div>
          {!isActive("/add-note") && (
            <NavLink
              to="/create-note"
              className="bg-white text-blue-600 font-semibold py-2 px-4 mx-4 rounded hover:bg-gray-200"
            >
              Create Note
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

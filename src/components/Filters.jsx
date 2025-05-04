// src/components/Filters.js
"use client";
import React from "react";

export const Filters = ({
  filters,
  setFilters,
  applyFilters,
  hideSpecialty = false,
}) => {
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "specialty" || name === "mode_of_consult") {
      // For single-selection fields (specialty and modeOfConsult)
      setFilters((prev) => ({
        ...prev,
        [name]: checked ? value : "", // If unchecked, clear the value
      }));
    } else {
      // For multi-selection fields (experience, fees, language)
      setFilters((prev) => {
        const currentValues = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...currentValues, value] };
        } else {
          return { ...prev, [name]: currentValues.filter((v) => v !== value) };
        }
      });
    }
  };

  const handleClearFilters = () => {
    console.log("Clear ALL clicked, current filters:", filters);
    setFilters({
      specialty: hideSpecialty ? filters.specialty : "", // Preserve specialty if hidden
      mode_of_consult: "", // Reset to empty string (single selection)
      experience: [],
      fees: [],
      language: [],
    });
    console.log("Filters after clear:", filters);
  };

  return (
    <div className="text-gray-700">
      {/* Filters Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={handleClearFilters}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Clear ALL
        </button>
      </div>

      {/* Show Doctors Near Me Button */}
      <button
        onClick={() => alert("Geolocation feature not implemented.")}
        className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-200 transition duration-150 ease-in-out mb-6"
      >
        Show Doctors Near Me
      </button>

      {/* Specialty */}
      {!hideSpecialty && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Specialty</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="specialty"
                value=""
                checked={filters.specialty === ""}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">None</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="specialty"
                value="General Physician"
                checked={filters.specialty === "General Physician"}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">General Physician</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="specialty"
                value="Cardiologist"
                checked={filters.specialty === "Cardiologist"}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">Cardiologist</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="specialty"
                value="Orthopedic Surgeon"
                checked={filters.specialty === "Orthopedic Surgeon"}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">Orthopedic Surgeon</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="specialty"
                value="Pediatrician"
                checked={filters.specialty === "Pediatrician"}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">Pediatrician</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="specialty"
                value="Dermatologist"
                checked={filters.specialty === "Dermatologist"}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">Dermatologist</span>
            </label>
          </div>
        </div>
      )}

      {/* Mode of Consult */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Mode of Consult
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="mode_of_consult"
              value=""
              checked={filters.mode_of_consult === ""}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">None</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="mode_of_consult"
              value="Hospital Visit"
              checked={filters.mode_of_consult === "Hospital Visit"}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">Hospital Visit</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="mode_of_consult"
              value="Online Consult"
              checked={filters.mode_of_consult === "Online Consult"}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">Online Consult</span>
          </label>
        </div>
      </div>

      {/* Experience (in Years) */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Experience (in Years)
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="experience"
              value="0-5"
              checked={filters.experience?.includes("0-5") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">0-5</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="experience"
              value="6-10"
              checked={filters.experience?.includes("6-10") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">6-10</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="experience"
              value="11-16"
              checked={filters.experience?.includes("11-16") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">11-16</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="experience"
              value="16+"
              checked={filters.experience?.includes("16+") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">+1 More</span>
          </label>
        </div>
      </div>

      {/* Fees (in Rupees) */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Fees (in Rupees)
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="fees"
              value="100-500"
              checked={filters.fees?.includes("100-500") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">100-500</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="fees"
              value="500-1000"
              checked={filters.fees?.includes("500-1000") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">500-1000</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="fees"
              value="1000+"
              checked={filters.fees?.includes("1000+") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">1000+</span>
          </label>
        </div>
      </div>

      {/* Language */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Language</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="language"
              value="English"
              checked={filters.language?.includes("English") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">English</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="language"
              value="Hindi"
              checked={filters.language?.includes("Hindi") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">Hindi</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="language"
              value="Tamil"
              checked={filters.language?.includes("Tamil") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">Tamil</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="language"
              value="Urdu"
              checked={filters.language?.includes("Urdu") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">Urdu</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="language"
              value="Gujarati"
              checked={filters.language?.includes("Gujarati") || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">Gujarati</span>
          </label>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-150 ease-in-out"
      >
        Apply Filters
      </button>
    </div>
  );
};

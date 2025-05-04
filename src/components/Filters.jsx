// src/components/Filters.js
"use client";
import React, { useEffect } from "react";

export const Filters = ({
  filters = {
    specialty: "",
    mode_of_consult: "",
    experience: "",
    fees: "",
    language: [],
  },
  setFilters = () => console.error("setFilters prop is missing"),
  applyFilters = () => console.error("applyFilters prop is missing"),
  hideSpecialty = false,
}) => {
  // Validate filters structure
  useEffect(() => {
    if (
      typeof filters.mode_of_consult !== "string" ||
      typeof filters.experience !== "string" ||
      typeof filters.fees !== "string" ||
      !Array.isArray(filters.language)
    ) {
      console.warn("Invalid filters structure, resetting to default");
      setFilters({
        specialty:
          typeof filters.specialty === "string" ? filters.specialty : "",
        mode_of_consult:
          typeof filters.mode_of_consult === "string"
            ? filters.mode_of_consult
            : "",
        experience:
          typeof filters.experience === "string" ? filters.experience : "",
        fees: typeof filters.fees === "string" ? filters.fees : "",
        language: Array.isArray(filters.language) ? filters.language : [],
      });
    }
  }, [filters, setFilters]);

  // Log filter state changes
  useEffect(() => {
    console.log("Filters state:", filters);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(
      `Input: name=${name}, value=${value}, type=${type}, checked=${checked}`
    );

    if (
      name === "specialty" ||
      name === "mode_of_consult" ||
      name === "experience" ||
      name === "fees"
    ) {
      setFilters((prev) => {
        const newFilters = { ...prev, [name]: value };
        console.log(`Set ${name} to:`, value);
        return newFilters;
      });
    } else if (name === "language") {
      setFilters((prev) => {
        const currentValues = Array.isArray(prev.language) ? prev.language : [];
        const newValues = checked
          ? [...currentValues, value]
          : currentValues.filter((v) => v !== value);
        const newFilters = { ...prev, language: newValues };
        console.log(`Set language to:`, newValues);
        return newFilters;
      });
    }
  };

  const handleClearFilters = () => {
    console.log("Clearing filters, current state:", filters);
    const newFilters = {
      specialty: hideSpecialty ? filters.specialty : "",
      mode_of_consult: "",
      experience: "",
      fees: "",
      language: [],
    };
    setFilters(newFilters);
    console.log("Filters cleared to:", newFilters);
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", filters);
    applyFilters();
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
            {[
              { value: "", label: "None" },
              { value: "General Physician", label: "General Physician" },
              { value: "Cardiologist", label: "Cardiologist" },
              { value: "Orthopedic Surgeon", label: "Orthopedic Surgeon" },
              { value: "Pediatrician", label: "Pediatrician" },
              { value: "Dermatologist", label: "Dermatologist" },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="specialty"
                  value={option.value}
                  checked={filters.specialty === option.value}
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Mode of Consult */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Mode of Consult
        </h3>
        <div className="space-y-2">
          {[
            { value: "", label: "None" },
            { value: "Hospital Visit", label: "Hospital Visit" },
            { value: "Online Consult", label: "Online Consult" },
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="mode_of_consult"
                value={option.value}
                checked={filters.mode_of_consult === option.value}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience (in Years) */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Experience (in Years)
        </h3>
        <div className="space-y-2">
          {[
            { value: "", label: "None" },
            { value: "0-5", label: "0-5" },
            { value: "6-10", label: "6-10" },
            { value: "11-16", label: "11-16" },
            { value: "16+", label: "+16 More" },
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="experience"
                value={option.value}
                checked={filters.experience === option.value}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fees (in Rupees) */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Fees (in Rupees)
        </h3>
        <div className="space-y-2">
          {[
            { value: "", label: "None" },
            { value: "100-500", label: "100-500" },
            { value: "500-1000", label: "500-1000" },
            { value: "1000+", label: "1000+" },
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="fees"
                value={option.value}
                checked={filters.fees === option.value}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Language</h3>
        <div className="space-y-2">
          {["English", "Hindi", "Marathi", "Tamil", "Urdu", "Gujarati"].map(
            (value) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  name="language"
                  value={value}
                  checked={filters.language?.includes(value) || false}
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">{value}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-150 ease-in-out"
      >
        Apply Filters
      </button>
    </div>
  );
};

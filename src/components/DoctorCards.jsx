// src/components/DoctorCard.js
"use client";
import React from "react";

export const DoctorCard = ({ doctor }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
      {/* Left: Image */}
      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto md:mx-0">
        <img
          src={doctor.profileURL || "https://via.placeholder.com/150"}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Middle: Info */}
      <div className="flex-1 md:px-6 mt-4 md:mt-0 text-center md:text-left">
        <h2 className="text-lg font-semibold">
          Dr. {doctor.name}
          <span className="inline-block text-sm text-gray-500 ml-1">ⓘ</span>
        </h2>
        <p className="text-gray-600">
          {doctor.specialty || "General Practitioner"}
        </p>
        <p className="text-[#5b2f9c] font-semibold text-sm mt-1">
          {doctor.experience || 0} YEARS •{" "}
          {doctor.degree?.toUpperCase() || "N/A"}
        </p>
        <p className="text-sm text-gray-600">{doctor.city || "Hyderabad"}</p>
        <p className="text-xs text-gray-400">
          {doctor.hospital ||
            "Apollo 24|7 Virtual Clinic - Telangana, Hyderabad"}
        </p>
      </div>

      {/* Right: Fee + Button */}
      <div className="flex flex-col items-center md:items-end gap-2 mt-4 md:mt-0 min-w-[160px]">
        <div className="flex items-center text-sm">
          <p className="font-semibold text-lg">
            ₹{doctor.consultation_fee || 0}
          </p>
          <span className="text-xs text-orange-600 ml-2">
            <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full text-[10px]">
              Circle
            </span>{" "}
            ₹60 Cashback
          </span>
        </div>
        <button className="border border-[#297c96] px-4 py-2 rounded text-[#297c96] text-sm w-full text-center">
          <div className="font-semibold">Consult Online</div>
          <div className="text-xs text-gray-500">Available in 9 minutes</div>
        </button>
      </div>
    </div>
  );
};

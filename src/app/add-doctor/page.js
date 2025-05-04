// src/app/add-doctor/page.js
"use client";
import { useState } from "react";
import { Header } from "@/components/Header";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    profileURL: "",
    name: "",
    specialty: "",
    experience: "",
    degree: "",
    language: "",
    consultation_fee: "",
    city: "",
    hospital: "",
    mode_of_consult: "", // Changed to match database field
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      setError("Please upload a valid image (JPEG, PNG, or GIF).");
      return;
    }

    setUploading(true);
    setMessage("");
    setError("");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Doctor-Listing");
      data.append("cloud_name", "smash007");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/smash007/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload image. Please try again.");
      }

      const uploadedImage = await res.json();
      const imageUrl = uploadedImage.secure_url;

      setFormData((prev) => ({ ...prev, profileURL: imageUrl }));
      setMessage("Image uploaded successfully!");
    } catch (err) {
      setError(err.message || "Failed to upload image. Please try again.");
      console.error("Image Upload Error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Name is required.";
    }
    if (
      formData.experience &&
      (isNaN(formData.experience) || formData.experience < 0)
    ) {
      return "Experience must be a positive number.";
    }
    if (
      formData.consultation_fee &&
      (isNaN(formData.consultation_fee) || formData.consultation_fee < 0)
    ) {
      return "Consultation fee must be a positive number.";
    }
    if (!formData.mode_of_consult) {
      return "Mode of Consult is required.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("doctors")
        .insert([
          {
            profileURL: formData.profileURL || null,
            name: formData.name.trim(),
            specialty: formData.specialty.trim() || null,
            experience: formData.experience
              ? parseInt(formData.experience)
              : null,
            degree: formData.degree.trim() || null,
            language: formData.language.trim() || null,
            consultation_fee: formData.consultation_fee
              ? parseInt(formData.consultation_fee)
              : null,
            city: formData.city.trim() || null,
            hospital: formData.hospital.trim() || null,
            mode_of_consult: formData.mode_of_consult,
          },
        ])
        .select();

      if (error) {
        throw new Error(error.message || "Failed to add doctor to Supabase.");
      }

      setMessage("Doctor added successfully!");
      setFormData({
        profileURL: "",
        name: "",
        specialty: "",
        experience: "",
        degree: "",
        language: "",
        consultation_fee: "",
        city: "",
        hospital: "",
        mode_of_consult: "",
      });
      console.log("Inserted Doctor:", data);
    } catch (err) {
      setError(err.message || "Failed to add doctor. Please try again.");
      console.error("Submission Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Add a New Doctor
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="profileURL"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Profile Image (Optional)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="profileURL"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading || submitting}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 disabled:cursor-not-allowed"
                />
                {formData.profileURL && (
                  <img
                    src={formData.profileURL}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-full border-2 border-blue-100"
                  />
                )}
              </div>
              {uploading && (
                <p className="mt-2 text-blue-600 flex items-center text-sm">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                    />
                  </svg>
                  Uploading...
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Dr. John Doe"
                required
                disabled={submitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out disabled:cursor-not-allowed"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="specialty"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Specialty
                </label>
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  placeholder="e.g., General Physician"
                  disabled={submitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Experience (Years)
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g., 10"
                  min="0"
                  disabled={submitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="degree"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g., MBBS, MD"
                  disabled={submitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="e.g., English, Hindi"
                  disabled={submitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="consultation_fee"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Consultation Fee (₹)
                </label>
                <input
                  type="number"
                  id="consultation_fee"
                  name="consultation_fee"
                  value={formData.consultation_fee}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  min="0"
                  disabled={submitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="mode_of_consult"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mode of Consult <span className="text-red-500">*</span>
                </label>
                <select
                  id="mode_of_consult"
                  name="mode_of_consult"
                  value={formData.mode_of_consult}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out disabled:cursor-not-allowed"
                >
                  <option value="">Select Mode of Consult</option>
                  <option value="Online Consult">Online Consult</option>
                  <option value="Hospital Visit">Hospital Visit</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., Hyderabad"
                  disabled={submitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="hospital"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Hospital
                </label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  placeholder="e.g., Apollo 24|7 Virtual Clinic - Telangana, Hyderabad"
                  disabled={submitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={uploading || submitting}
            className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out flex items-center justify-center"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                  />
                </svg>
                Adding Doctor...
              </>
            ) : (
              "Add Doctor"
            )}
          </button>
          {message && (
            <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg text-center border border-green-200">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg text-center border border-red-200">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;

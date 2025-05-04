// src/app/doctors/page.js
"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { createClient } from "@supabase/supabase-js";
import { Filters } from "@/components/Filters";
import { DoctorCard } from "@/components/DoctorCards";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    page_size: 5,
    total_records: 0,
    total_pages: 1,
  });
  const [filters, setFilters] = useState({
    specialty: "",
    language: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDoctors = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const pageNum = parseInt(page);
      const pageSize = parseInt(pagination.page_size);
      const offset = (pageNum - 1) * pageSize;

      let query = supabase
        .from("doctors")
        .select("*", { count: "exact" })
        .range(offset, offset + pageSize - 1);

      if (filters.specialty) {
        query = query.ilike("specialty", `%${filters.specialty}%`);
      }
      if (filters.language) {
        query = query.ilike("language", `%${filters.language}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        throw new Error(error.message || "Failed to fetch doctors");
      }

      const totalPages = Math.ceil(count / pageSize);

      setDoctors(data);
      setPagination({
        current_page: pageNum,
        page_size: pageSize,
        total_records: count,
        total_pages: totalPages,
      });
    } catch (err) {
      setError(err.message);
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(1);
  }, []);

  const applyFilters = () => {
    fetchDoctors(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      fetchDoctors(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 text-center">
          List of Doctors
        </h1>

        {/* Main Layout: Filters on Left, Doctor Cards in Middle */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar: Filters */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Filter Doctors
              </h2>
              <Filters
                filters={filters}
                setFilters={setFilters}
                applyFilters={applyFilters}
              />
            </div>
          </div>

          {/* Main Content: Doctor Cards */}
          <div className="md:w-3/4 flex flex-col items-center">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-center border border-red-200 w-full max-w-4xl">
                {error}
              </div>
            )}

            {/* Doctor List */}
            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : doctors.length === 0 ? (
              <p className="text-center text-gray-600">No doctors found.</p>
            ) : (
              <>
                <div className="flex justify-center w-full">
                  <div className="flex flex-col gap-6 w-full max-w-4xl">
                    {doctors.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                  </div>
                </div>

                {/* Pagination Controls */}
                <div className="mt-8 flex justify-center items-center gap-4">
                  <button
                    onClick={() =>
                      handlePageChange(pagination.current_page - 1)
                    }
                    disabled={pagination.current_page === 1}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                  >
                    Previous
                  </button>
                  <span className="text-gray-700">
                    Page {pagination.current_page} of {pagination.total_pages}
                  </span>
                  <button
                    onClick={() =>
                      handlePageChange(pagination.current_page + 1)
                    }
                    disabled={
                      pagination.current_page === pagination.total_pages
                    }
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;

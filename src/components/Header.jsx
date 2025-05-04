import { MapPin, Search, User } from "lucide-react";
import Link from "next/link";
export const Header = () => {
  return (
    <header className="border-b ">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-around gap-4">
        {/* Title */}
        <div className="text-xl font-bold flex-shrink-0 min-w-[250px]">
          <p>Doctor Consultation</p>
          <div className="flex items-center gap-2 min-w-[180px]">
            <MapPin className="w-4 h-4 text-black" />
            <div>
              <p className="text-xs text-gray-500">Select Location</p>
              <select className="bg-transparent text-black font-semibold text-sm focus:outline-none">
                <option>Select Address</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location Selector */}

        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px] md:max-w-[400px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search Doctors, Specialities, Conditions etc."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none text-sm"
          />
        </div>

        {/* Login */}
        <div className="flex-shrink-0">
          <button className="flex items-center gap-1 px-4 py-1.5 border border-teal-700 text-teal-800 rounded-md text-sm">
            Login
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="border-t">
        <ul className="container mx-auto px-4 py-3 flex flex-wrap justify-center gap-6 font-semibold text-sm ">
          <li className="hover:underline hover:cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:underline hover:cursor-pointer">
            Buy Medicines
          </li>
          <li className="hover:underline hover:cursor-pointer">Find Doctors</li>
          <li className="hover:underline hover:cursor-pointer">Lab Tests</li>
          <li className="hover:underline hover:cursor-pointer">
            Circle Membership
          </li>
          <li className="hover:underline hover:cursor-pointer">
            Health Records
          </li>
          <li className="hover:underline hover:cursor-pointer">
            Diabetes Reversal
          </li>
          <li className="flex items-center gap-1 hover:underline hover:cursor-pointer">
            Buy Insurance
            <span className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded">
              New
            </span>
          </li>
          <li className="hover:underline hover:cursor-pointer">
            <Link href="/add-doctor">Add Doctor</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

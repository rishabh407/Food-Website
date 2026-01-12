// import React from 'react'

// const Profile = () => {
//   return (
//     <div>
//       Hi i am profile.
//     </div>
//   )
// }

// export default Profile

import React from "react";
import { useAuth } from "../Context/AuthContext";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";

const Profile = () => {
  const { userdata } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* PAGE TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          👤 My Profile
        </h1>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            {/* AVATAR */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
              {userdata?.name?.charAt(0).toUpperCase()}
            </div>

            {/* BASIC INFO */}
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {userdata?.name || "User"}
              </p>
              <p className="text-gray-500 text-sm">
                Manage your personal information
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <User size={18} />
              <span>{userdata?.name || "Not available"}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={18} />
              <span>{userdata?.email || "Not available"}</span>
            </div>

            {userdata?.phone && (
              <div className="flex items-center gap-3 text-gray-700">
                <Phone size={18} />
                <span>{userdata.phone}</span>
              </div>
            )}
          </div>

          {/* EDIT BUTTON */}
          <button
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-700"
            disabled
          >
            <Edit size={16} />
            Edit Profile (Coming Soon)
          </button>
        </div>

        {/* ADDRESS SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📍 Saved Address
          </h2>

          {userdata?.address ? (
            <div className="text-gray-700 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {userdata.address}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              No address saved yet. Address will appear after placing an order.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

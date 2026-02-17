import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { User, Mail, Phone, MapPin, Edit, Save, X, Home } from "lucide-react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const Profile = () => {
  const { userdata, setuserdata } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  })
  // Load user data into form when editing starts
  useEffect(() => {
    if (userdata) {
      setFormData({
        name: userdata.name || "",
        phone: userdata.address?.phone || "",
        street: userdata.address?.street || "",
        city: userdata.address?.city || "",
        pincode: userdata.address?.pincode || "",
      });
    }
  }, [userdata, isEditing]);

  const handleSave = async () => {
    try {
      const res = await api.put("/user/profile", {
        name: formData.name,
        address: {
          fullName: formData.name,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          pincode: formData.pincode,
        },
      });

      if (res.data.success) {
        setuserdata(res.data.user); // Update global state
        setIsEditing(false);
        toast.success("Profile Updated!");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">👤 My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              isEditing ? "bg-gray-200 text-gray-700" : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {isEditing ? <><X size={18} /> Cancel</> : <><Edit size={18} /> Edit Profile</>}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Banner */}
          <div className="h-24 bg-gradient-to-r from-red-500 to-orange-500"></div>
          
          <div className="px-8 pb-8">
            <div className="relative -top-12 flex items-end gap-4 mb-2">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md">
                <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center text-3xl font-bold text-red-500">
                  {userdata?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {/* Personal Info */}
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-500">Full Name</span>
                  <input
                    disabled={!isEditing}
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-70"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-500">Email Address</span>
                  <input
                    disabled
                    className="w-full mt-1 p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                    value={userdata?.email || ""}
                  />
                </label>
              </div>

              {/* Address Info */}
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-500">Phone Number</span>
                  <input
                    disabled={!isEditing}
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-500">Street Address</span>
                  <input
                    disabled={!isEditing}
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  />
                </label>

                <div className="flex gap-4">
                  <label className="w-1/2">
                    <span className="text-sm font-medium text-gray-500">City</span>
                    <input
                      disabled={!isEditing}
                      className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </label>
                  <label className="w-1/2">
                    <span className="text-sm font-medium text-gray-500">Pincode</span>
                    <input
                      disabled={!isEditing}
                      className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    />
                  </label>
                </div>
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full mt-8 bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-lg shadow-green-100"
              >
                <Save size={20} /> Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
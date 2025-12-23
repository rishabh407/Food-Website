import { X, DoorOpen, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AuthModal = ({ isOpen, type, setAuthType, onClose }) => {

  if (!isOpen) return null;
  const isLogin = type === "login";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          
        {/* What this does:
fixed → stays on screen
inset-0 → covers full screen
z-[100] → appears above navbar & home
flex items-center justify-center → center modal
👉 This makes modal full-screen overlay. */}

          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>

            {/* HEADER */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white">
                  {isLogin ? <DoorOpen size={24} /> : <UserPlus size={24} />}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                {isLogin ? "Welcome Back 👋" : "Create Your Account 🍔"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {isLogin
                  ? "Login to continue ordering delicious food"
                  : "Register to start your food journey"}
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold text-lg hover:opacity-90 transition"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-500 mt-5">
  {type === "login" ? "Don’t have an account?" : "Already have an account?"}
  <span
    className="ml-1 text-red-600 font-semibold cursor-pointer hover:underline"
    onClick={() =>
      setAuthType(type === "login" ? "register" : "login")
    }
  >
    {type === "login" ? "Register" : "Login"}
  </span>
</p>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;

import { X, DoorOpen, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { fetchCartAsync } from "../redux/cartActions";
import { useDispatch } from "react-redux";
const AuthModal = ({ isOpen, type, setAuthType, onClose }) => {

  const {login}=useAuth();
  if (!isOpen) return null;
  const dispatch=useDispatch();
  const isLogin = type === "login";
//   For login data
  const [reform, resetform] = useState({
    name:"",
    email:"",
    password:"",
  })
//   For register data 
   const [loform, setloform] = useState({
    email:"",
    password:"",
   })

  const handleformlogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/login",
      loform,
          { withCredentials: true } // 🔥 REQUIRED To Store Cookies In The Browser.
    );

    toast.success("User Login Successfully 🎉");

    // // 1️⃣ Save token
    // localStorage.setItem("foodtoken", response.data.token);

    // 2️⃣ Save user in context
    login(response.data.user);

    // 3️⃣ 🔥 FETCH CART FROM BACKEND
    // dispatch(fetchCartAsync());

    // 4️⃣ Close modal
    onClose();
  } catch (error) {
    const msg = error.response?.data?.message || "Something went wrong";
    toast.error(msg);
  }
};

   const handleformregister=async(e)=>{
    e.preventDefault();
    try{
        const response=await axios.post("http://localhost:5000/register",reform);
        toast.success("User Registered Successfully 🎉");
        setAuthType("login");    
   }
   catch(error){
    const msg = error.response?.data?.message || "Something went wrong";
    toast.error(msg); 
   }
   }
   const handlechangeforregister=(e)=>{
         resetform({...reform,[e.target.name]:e.target.value})
   }
   const handlechangeforlogin=(e)=>{
      setloform({...loform,[e.target.name]:e.target.value})
   }   

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          

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
            <form className="space-y-4" onSubmit={isLogin?handleformlogin:handleformregister}>
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  value={reform.name}
                  onChange={handlechangeforregister}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                required
                value={isLogin?loform.email:reform.email}
                onChange={isLogin?handlechangeforlogin:handlechangeforregister}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={isLogin?loform.password:reform.password}
                onChange={isLogin?handlechangeforlogin:handlechangeforregister}
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

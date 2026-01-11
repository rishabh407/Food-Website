import Navbar from "./components/Navbar";
import MobileBottomNav from "./components/MobileBottomNav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 pb-20">
        <Outlet />
      </div>
      <MobileBottomNav />
    </>
  );
};

export default AppLayout;

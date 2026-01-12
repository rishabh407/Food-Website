import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
   console.log(pathname);
  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo(0, 0);
  }, [pathname]); // runs whenever pathname (URL) changes

  return null; // this component doesn't render anything
};

export default ScrollToTop;

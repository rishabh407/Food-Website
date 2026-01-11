import { Link, useLocation } from "react-router-dom";
import {
  Home,
  UtensilsCrossed,
  Heart,
  ShoppingCart,
  User
} from "lucide-react";
import { useSelector } from "react-redux";

const MobileBottomNav = () => {
  const location = useLocation();
  const { Items } = useSelector(state => state.cart);
  const { Items: wishlistItems } = useSelector(state => state.wishlist);

  const cartCount = Items.reduce((a, i) => a + i.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Menu", path: "/menu", icon: UtensilsCrossed },
    { label: "Wishlist", path: "/wishlist", icon: Heart, count: wishlistCount },
    { label: "Cart", path: "/cart", icon: ShoppingCart, count: cartCount },
    { label: "Account", path: "/account", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ label, path, icon: Icon, count }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={label}
              to={path}
              className={`relative flex flex-col items-center text-xs ${
                active ? "text-red-600" : "text-gray-600"
              }`}
            >
              <Icon size={22} />
              <span>{label}</span>

              {count > 0 && (
                <span className="absolute -top-1 right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;

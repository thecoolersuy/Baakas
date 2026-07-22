import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, User } from "lucide-react";
import useCartStore from "@store/cartStore";
import baakaslogo from "../../public/baakaslogo.png";

function preloadProducts() {
  import("../pages/ProductsPage");
}

function preloadCart() {
  import("../pages/CartPage");
}

function Navbar() {
  const itemCount = useCartStore((state) => state.getTotalItems());
  const navigate = useNavigate();
  const location = useLocation();

  function handleSearchClick() {
    if (location.pathname !== "/products") {
      navigate("/products");
      return;
    }

    document.getElementById("product-search")?.focus();
  }

  return (
    <header
      role="banner"
      className="border-b border-[#E5E5E5] bg-white sticky top-0 z-50"
    >
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-6 h-18 items-center justify-between flex"
      >
        <div className="flex items-center gap-6">
          <NavLinks />
        </div>
        <Link
          to="/"
          aria-label="Logo mark"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <img src={baakaslogo} alt="baakas" className="h-23 w-auto" />
        </Link>
        <div className="flex items-center gap-8">
          <button
            aria-label="ssearch products"
            className="text-brand-gray-600 hover:text-brand-black transition-colors"
            onClick={handleSearchClick}
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link
            to="/cart"
            onMouseEnter={preloadCart}
            aria-label={`Cart, ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
            className="relative text-brand-gray-600 hover:text-brand-black transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1.5 -right-1.5 bg-brand-black text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center"
              >
                {itemCount}
              </span>
            )}
          </Link>

          <button
            aria-label="Account"
            className="text-brand-gray-600 hover:text-brand-black transition-colors"
          >
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>
    </header>
  );
}

function NavLinks() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/products", preload: preloadProducts, label: "Collection" },
    { to: "/cart", preload: preloadCart, label: "Cart" },
  ];
  return (
    <>
      {links.map(({ to, label, preload }) => (
        <NavLink
          key={to}
          to={to}
          onMouseEnter={preload}
          className={({ isActive }) =>
            `text-md transition-colors,
              ${
                isActive
                  ? "text-brand-black font-medium"
                  : "text-brand-gray-600 hover:text-brand-black"
              }`
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );
}

export default Navbar;

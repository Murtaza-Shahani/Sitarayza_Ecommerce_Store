import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "@/app/slices/cartSlice";
import { openCart } from "@/app/slices/uiSlice";

export default function Navbar({
  onSearch = () => {},
  onCategorySelect = () => {},   // ✅ ADDED
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);

  const close = () => setOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(adminFlag);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  const navLinkBase =
    "px-3 py-2 text-sm font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]";
  const navLinkActive = "text-[var(--accent)] bg-[var(--tint)]";
  const navLinkIdle = "text-white hover:text-blue-400";

  // ✅ UPDATED Item to support category click
  const Item = ({ to, children, onClick }) => (
    <NavLink
      to={to}
      onClick={() => {
        close();
        onClick && onClick();
      }}
      className={({ isActive }) =>
        `${navLinkBase} ${isActive ? navLinkActive : navLinkIdle}`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--brand)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-md hover:bg-[var(--tint)]"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[var(--brand)]">
                S
              </span>
              <span className="text-lg">Sitarayza</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Item to="/">Home</Item>
            {/* <Item to="/shop" onClick={() => onCategorySelect("all")}>Shop</Item> */}
         <Item to="/shop" onClick={() => { onCategorySelect("all"); }}>
  Shop
</Item>
<Item to="/shop" onClick={() => { onCategorySelect("men"); }}>
  Men
</Item>
<Item to="/shop" onClick={() => { onCategorySelect("women"); }}>
  Women
</Item>
<Item to="/shop" onClick={() => { onCategorySelect("child"); }}>
  Kids
</Item>


            {isLoggedIn && isAdmin && (
              <Item to="/dashboard">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" /> Dashboard
                </span>
              </Item>
            )}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <form
  onSubmit={(e) => {
    e.preventDefault();
    navigate("/shop"); // <-- go to shop page
    onSearch(q);       // <-- pass query
    className="hidden md:flex"
  }}
>

              
            
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                <Search className="h-4 w-4" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products…"
                  className="bg-transparent text-sm outline-none"
                />
              </div>
            </form>

            <button
              onClick={() => dispatch(openCart())}
              className="relative p-2 rounded-md hover:bg-[var(--tint)]"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-[var(--accent)] px-1 text-[11px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full bg-red-500 text-sm"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1 rounded-full bg-[var(--accent)] text-sm">
                  Login
                </Link>
                <Link to="/signup" className="px-3 py-1 rounded-full bg-[var(--tint)] text-sm">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

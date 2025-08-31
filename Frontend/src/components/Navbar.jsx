import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "@/app/slices/cartSlice";
import { openCart } from "@/app/slices/uiSlice";

export default function Navbar({ onSearch = () => {} }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  const close = () => setOpen(false);

  const navLinkBase =
    "px-3 py-2 text-sm font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]";
  const navLinkActive = "text-[var(--accent)] bg-[var(--tint)]";
  const navLinkIdle = "text-white hover:text-blue-400";

  const Item = ({ to, children }) => (
    <NavLink
      to={to}
      onClick={close}
      className={({ isActive }) =>
        `${navLinkBase} ${isActive ? navLinkActive : navLinkIdle}`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--brand)] text-white border-[var(--border)]/0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-md hover:bg-[var(--tint)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              to="/"
              className="flex items-center gap-2 font-semibold tracking-tight text-white"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[var(--brand)]">
                S
              </span>
              <span className="text-lg">Sitarayza</span>
            </Link>
          </div>

          {/* Middle: Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Item to="/">Home</Item>
            <Item to="/shop">Shop</Item>
            <Item to="/categories/men">Men</Item>
            <Item to="/categories/women">Women</Item>
            <Item to="/dashboard">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Dashboard
              </span>
            </Item>
          </nav>

          {/* Right: search + cart */}
          <div className="flex items-center gap-2">
            {/* Desktop search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSearch(q);
              }}
              className="hidden md:flex items-center"
            >
              <label className="sr-only" htmlFor="site-search">
                Search products
              </label>
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2 bg-[var(--surface)] border-[var(--border)] focus-within:ring-2 focus-within:ring-[var(--accent)]">
                <Search className="h-4 w-4 text-[var(--text-muted)]" />
                <input
                  id="site-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products…"
                  className="w-44 lg:w-64 bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)] text-[var(--text)]"
                />
              </div>
            </form>

            {/* Cart */}
            <button
              onClick={() => dispatch(openCart())}
              className="relative p-2 rounded-md hover:bg-[var(--tint)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Open cart"
              title="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[11px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={close}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 h-full w-[88%] max-w-sm bg-[var(--brand)] text-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3 border-[var(--border)]">
              <span className="font-semibold">Menu</span>
              <button
                onClick={close}
                className="p-2 rounded-md hover:bg-[var(--tint)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-2">
              <Item to="/">Home</Item>
              <Item to="/shop">Shop</Item>
              <Item to="/categories/men">Men</Item>
              <Item to="/categories/women">Women</Item>
              <Item to="/dashboard">Dashboard</Item>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}

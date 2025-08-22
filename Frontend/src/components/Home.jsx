import React from "react";
import { Link } from "react-router-dom";
import { Truck, BadgeCheck, Sparkles, RotateCcw, ArrowRight, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/slices/cartSlice";
import { openCart } from "@/app/slices/uiSlice";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--text)]">
      {/* HERO (single bg image) */}
      <section className="relative h-[70vh] md:h-[80vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
          alt="Fashion apparel banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
          <div className="max-w-2xl text-[var(--on-brand)]">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Shop the Latest Trends
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/90">
              Curated styles for every season. Discover new arrivals, essentials,
              and limited drops—crafted for comfort and made to last.
            </p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-white"
              >
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Shop by Category</h2>
          <Link
            to="/categories"
            className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] underline"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} />
          ))}
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className="bg-[var(--muted)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Trending Now</h2>
            <Link
              to="/trending"
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] underline"
            >
              See more
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((item) => (
              <TrendingCard key={item.id} {...item} dispatch={dispatch} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="sr-only">Store features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={<BadgeCheck className="h-6 w-6" />} title="Premium Quality" desc="Fabric and stitching you can feel—built to last." />
          <FeatureCard icon={<Truck className="h-6 w-6" />} title="Fast Delivery" desc="Dispatch within 24–48 hours on most orders." />
          <FeatureCard icon={<Sparkles className="h-6 w-6" />} title="Latest Trends" desc="Fresh drops weekly. Stay ahead of the curve." />
          <FeatureCard icon={<RotateCcw className="h-6 w-6" />} title="Easy Returns" desc="Hassle-free returns within 7–14 days." />
        </div>
      </section>
    </main>
  );
}

/* ---------- Subcomponents ---------- */

function CategoryCard({ title, desc, href, img, cta }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-[var(--surface)] shadow-sm hover:shadow-md transition border-[var(--border)]">
      <div className="relative h-56">
        <img
          src={img}
          alt={`${title} category`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-white/90">{desc}</p>
          <Link
            to={href}
            className="mt-3 inline-flex items-center rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-white"
          >
            {cta} <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function TrendingCard({ id, title, price, img, href, dispatch }) {
  return (
    <article className="group rounded-2xl border bg-[var(--surface)] shadow-sm hover:shadow-md transition overflow-hidden border-[var(--border)]">
      <div className="relative aspect-[4/5]">
        <img
          src={img}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 font-medium text-[var(--text)]">{title}</h3>
        <p className="mt-1 text-[var(--text-muted)]">PKR {price.toLocaleString()}</p>
        <div className="mt-3 flex gap-2">
          <Link
            to={href}
            className="flex-1 inline-flex items-center justify-center rounded-full border border-[var(--border)] px-3 py-1.5 text-sm hover:bg-[var(--tint)]"
          >
            View
          </Link>
          <button
            onClick={() => {
              dispatch(addItem({ id, slug: href.replace("/product/", ""), name: title, price, image: img, qty: 1 }));
              dispatch(openCart());
            }}
            className="flex-1 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-3 py-1.5 text-sm text-white hover:bg-[var(--accent-hover)]"
          >
            <ShoppingCart className="h-4 w-4 mr-1" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-[var(--surface)] p-5 shadow-sm border-[var(--border)]">
      <div className="rounded-xl bg-[var(--muted)] p-2 text-[var(--brand)]" aria-hidden="true">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[var(--text)]">{title}</h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{desc}</p>
      </div>
    </div>
  );
}

/* ---------- Mock Data ---------- */
const categories = [
  {
    slug: "men",
    title: "Men",
    desc: "From everyday essentials to statement fits.",
    cta: "Shop Men",
    href: "/category/men",
    img: "https://images.unsplash.com/photo-1520975962293-2450f7f040ee?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "women",
    title: "Women",
    desc: "Elegant silhouettes and modern staples.",
    cta: "Shop Women",
    href: "/category/women",
    img: "https://images.unsplash.com/photo-1519744346363-63e0d7c38f7a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "kids",
    title: "Kids",
    desc: "Play-ready outfits for little trendsetters.",
    cta: "Shop Kids",
    href: "/category/kids",
    img: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=1600&auto=format&fit=crop",
  },
];

const trending = [
  {
    id: 1,
    title: "Oversized Cotton Tee",
    price: 1999,
    href: "/product/oversized-cotton-tee",
    img: "https://images.unsplash.com/photo-1520976389440-e0a1110a1d95?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Relaxed Denim Jacket",
    price: 5499,
    href: "/product/relaxed-denim-jacket",
    img: "https://images.unsplash.com/photo-1520975922323-737b0f35b2c1?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Everyday Chinos",
    price: 3299,
    href: "/product/everyday-chinos",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Minimal Sneakers",
    price: 5999,
    href: "/product/minimal-sneakers",
    img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1600&auto=format&fit=crop",
  },
];

import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../components/ui/Button";
import { useProducts } from "../features/products/hooks";
import ProductCard from "../features/products/components/ProductCard";
import LoadingGrid from "../components/ui/LoadingGrid";

const homesliders = [
  {
    id: 1,
    tag: "New collection",
    title: "Furniture for the way you live",
    description:
      "Thoughtfully designed pieces that bring calm and purpose to everyday spaces.",
    image:
      "https://plus.unsplash.com/premium_photo-1682582241642-d16c69cc087c?q=80&w=1091&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Modern sofa in a minimal living room",
  },
  {
    id: 2,
    tag: "Best sellers",
    title: "Timeless pieces, built to last",
    description:
      "Each product is crafted with materials chosen for durability and quiet beauty.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    imageAlt: "Minimal wooden shelf with decor",
  },
  {
    id: 3,
    tag: "Limited edition",
    title: "Designed for calm, everyday living",
    description:
      "Simple forms and honest materials for spaces that feel like home.",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
    imageAlt: "Clean minimal bedroom with natural light",
  },
];

function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const { data, isLoading } = useProducts({ limit: 8, skip: 43 });

  const slide = homesliders[activeSlide];

  return (
    <div>
      <section
        aria-label="Featured promotion"
        className="max-w-6xl mx-auto px-6 py-12 md:py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[420px]">
          <div
            key={`text-${slide.id}`}
            className="flex flex-col gap-5 animate-fadeIn"
          >
            <span className="text-xs text-[#9A9A9A] uppercase tracking-[0.2em]">
              {slide.tag}
            </span>
            <h1 className="text-4xl md:text-5xl font-medium text-[#111111] leading-tight">
              {slide.title}
            </h1>
            <p className="text-sm text-[#666666] leading-relaxed max-w-sm">
              {slide.description}
            </p>
            <div>
              <Link to="/products">
                <Button variant="primary" size="lg">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>

          <div
            key={`image-${slide.id}`}
            className="relative flex items-center justify-center animate-fadeIn"
          >
            <div className="w-full aspect-square max-w-md rounded-full bg-[#F1F1F1] overflow-hidden">
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Hero slides"
          className="flex justify-center gap-2 mt-8"
        >
          {homesliders.map((slide, index) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={activeSlide === index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`
                rounded-full transition-all duration-300
                ${
                  activeSlide === index
                    ? "bg-[#111111] w-5 h-2"
                    : "bg-[#E5E5E5] w-2 h-2 hover:bg-[#9A9A9A]"
                }
              `}
            />
          ))}
        </div>
      </section>

      <section
        aria-label="Featured products"
        className="max-w-6xl mx-auto px-6 pb-16"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium text-[#111111]">
            Featured Products
          </h2>
          <p className="text-sm text-[#9A9A9A] mt-2 max-w-lg mx-auto leading-relaxed">
            A curated selection of our most loved pieces. Designed for comfort,
            built for everyday life.
          </p>
        </div>

        {isLoading ? (
          <LoadingGrid />
        ) : (
          <ul
            aria-label="Featured products"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8"
          >
            {data?.products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="text-sm text-[#111111] underline underline-offset-4 hover:text-[#666666] transition-colors"
          >
            View all products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

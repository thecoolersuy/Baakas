import ErrorMessage from "@components/ui/ErrorMessage";
import LoadingGrid from "@components/ui/LoadingGrid";
import { useProduct } from "../features/products/hooks";
import useCartStore from "@store/cartStore";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import Button from "@components/ui/Button";
import { ShoppingBag } from "lucide-react";
import { RotateCcw, ArrowLeft, Shield, Truck } from "lucide-react";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useProduct(Number(id));

  const [selectedImage, setSelectedImage] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const isinCart = cartItems.find((item) => item.product.id === Number(id));
  const itemsInCartCount = cartItems.filter(
    (item) => item.product.id === Number(id),
  );
  function handleAddToCart() {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    navigate("/cart");
  }

  function handleQuantityChange(newQty: number) {
    if (!product) return;

    const clamped = Math.min(
      Math.max(1, newQty),
      product.minimumOrderQuantity
        ? Math.max(product.minimumOrderQuantity, 10)
        : 10,
    );
    setQuantity(clamped);
  }

  if (isLoading) {
    return <LoadingGrid />;
  }
  if (isError || !product) {
    return (
      <>
        <ErrorMessage message="Product not found or failed to load." />
        <Link to="/products">Back to collection</Link>
      </>
    );
  }

  const discountedPrice =
    product.discountPercentage > 0
      ? product.price * (1 - product.discountPercentage / 100)
      : null;
  return (
    <>
      <div className="max-w-6xl mx-auto px-8 py-10">
        <nav
          aria-label="breadcrumb navigation"
          className="flex text-sm gap-2 items-center text-[#9A9A9A] mb-8"
        >
          <Link to="/" className="hover:text-[#111111] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            to="/products"
            className="hover:text-[#111111] transition-colors"
          >
            Collection
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-label="current page" className="text-[#111111]">
            {product.title}
          </span>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-3">
            <div className="aspect-square bg-[#F9F9F9] rounded overflow-hidden">
              <img
                src={product.images[selectedImage] ?? product.thumbnail}
                alt={`${product.title}`}
                className="w-full h-full object-contain"
              />
            </div>

            {product.images.length > 1 && (
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                role="list"
                aria-label="product images"
              >
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`view image ${index + 1}`}
                    className={`
                    shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors
                    ${
                      selectedImage === index
                        ? "border-[#111111]"
                        : "border-transparent hover:border-[#E5E5E5]"
                    }
                  `}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-xs text-[#9a9a9a] uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl font-medium text-[#111111] leading-snug">
              {product.title}
            </h1>

            <div
              className="flex items-center gap-2"
              aria-label={`Ratings: ${product.rating} out of 5`}
            >
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(product.rating)
                        ? "fill-[#111111] text-[#111111]"
                        : "text-[#e5e5e5]"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-[#9a9a9a]">
                {product.rating} /5
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              {discountedPrice ? (
                <>
                  <span className="text-2xl font-medium text-[#111111]">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-[#9A9A9A] line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {Math.round(product.discountPercentage)}% off
                  </span>
                </>
              ) : (
                <span className="text-2xl font-medium text-[#111111]">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-sm text-[#666666] leading-relaxed">
              {product.description}
            </p>
            <hr className="border-[#e5e5e5]" />
            <div className="flex flex-col gap-2">
              <label
                htmlFor="quantity"
                className="text-xs text-[#9a9a9a] uppercase tracking-wider"
              >
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label="decrease Quanitity"
                  className="w-8 h-8 flex items-center jutify-center border border-[#e5e5e5] rounded hover:border-[#9a9a9a] diabled:cursor-not-allowed transition-colors"
                >
                  -
                </button>
                <span
                  id="quantity"
                  aria-live="polite"
                  aria-label={`Quantity: ${quantity}`}
                  className="w-8 text-center text-sm font-medium"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] rounded hover:border-[#9A9A9A] transition-colors"
                >
                  +
                </button>
                {product.stock <= 10 && (
                  <span className="text-xs text-orange-500">
                    Only {product.stock} items left
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} className="mr-2" aria-label="true" />
              {isinCart
                ? `Add more (${itemsInCartCount} in cart`
                : "Add to Cart"}
            </Button>
            <div className="flex flex-col gap-3 pt-2">
              {product.shippingInformation && (
                <div className="flex items-center gap-3 text-xs text-[#666666]">
                  <Truck size={14} aria-hidden="true" className="shrink-0" />
                  <span>{product.shippingInformation}</span>
                </div>
              )}
              {product.warrantyInformation && (
                <div className="flex items-center gap-3 text-xs text-[#666666]">
                  <Shield size={14} aria-hidden="true" className="shrink-0" />
                  <span>{product.warrantyInformation}</span>
                </div>
              )}
              {product.returnPolicy && (
                <div className="flex items-center gap-3 text-xs text-[#666666]">
                  <RotateCcw
                    size={14}
                    aria-hidden="true"
                    className="shrink-0"
                  />
                  <span>{product.returnPolicy}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[#666666] hover:text-[#111111] transition-colors mt-12"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back
        </button>
      </div>
      ;
    </>
  );
}

export default ProductDetailPage;

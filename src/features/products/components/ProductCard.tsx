import type { Product } from "../../../types/index";
import useCartStore from "@store/cartStore";
import { Link } from "react-router-dom";
import Button from "@components/ui/Button";
import { memo } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = memo(function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const discountedPrice =
    product.discountPercentage > 0
      ? product.price * (1 - product.discountPercentage / 100)
      : null;
  return (
    <>
      <article className={`group flex flex-col ${className}`}>
        <Link
          to={`/products/${product.id}`}
          aria-label={`View ${product.title}`}
          className="block overflow-hidden bg-[#F9F9F9] rounded mb-3"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex flex-col flex-1 gap-1">
          <span className="text-[11px] text-[#9A9A9A] uppercase tracking-wider">
            {product.category}
          </span>

          <Link
            to={`/products/${product.id}`}
            className="text-sm font-medium text-[#111111] hover:text-[#666666] transition-colors line-clamp-2 leading-snug"
          >
            {product.title}
          </Link>

          <div className="flex items-baseline gap-2 mt-1">
            {discountedPrice ? (
              <>
                <span className="text-sm font-medium text-[#111111]">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-xs text-[#9A9A9A] line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-green-600">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-[#111111]">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="mt-2 w-full"
            onClick={() => addItem(product)}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </Button>
        </div>
      </article>
    </>
  );
}
)

export default ProductCard;

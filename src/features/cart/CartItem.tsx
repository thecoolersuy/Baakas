import type { CartItem as CartItemType } from "../../types/index";
import { memo } from "react";
import useCartStore from "@store/cartStore";
import { useCallback } from "react";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = memo(function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrease = useCallback(() => {
    updateQuantity(item.product.id, item.quantity + 1);
  }, [item.product.id, item.quantity, updateQuantity]);

  const handleDecrease = useCallback(() => {
    updateQuantity(item.product.id, item.quantity - 1);
  }, [item.product.id, item.quantity, updateQuantity]);

  const handleRemove = useCallback(() => {
    removeItem(item.product.id);
  }, [item.product.id, removeItem]);

  const lineTotal = item.product.price * item.quantity;
  return (
    <article className="flex gap-4 py-6 border-b border-[#E5E5E5]">
      <Link
        to={`/products/${item.product.id}`}
        className="shrink-0"
        aria-label={`View ${item.product.title}`}
      >
        <div className="w-24 h-24 bg-[#F9F9F9] rounded overflow-hidden">
          <img
            src={item.product.thumbnail}
            alt={item.product.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <Link
          to={`/products/${item.product.id}`}
          className="text-sm font-medium text-[#111111] hover:text-[#666666] transition-colors truncate"
        >
          {item.product.title}
        </Link>
        <span className="text-xs text-[#9A9A9A] capitalize">
          {item.product.category}
        </span>

        <div className="flex flex-col gap-1 mt-2">
          <span className="text-xs text-[#666666]">✓ Order today</span>
          {item.product.shippingInformation && (
            <span className="text-xs text-[#666666]">
              ↗ {item.product.shippingInformation}
            </span>
          )}
          {item.product.stock <= 10 && (
            <span className="text-xs text-orange-500">
              ⚠ Only {item.product.stock} available
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between shrink-0">
        <span className="text-sm font-medium text-[#111111]">
          ${lineTotal.toFixed(2)}
        </span>

        <div
          className="flex items-center gap-2"
          role="group"
          aria-label={`Quantity for ${item.product.title}`}
        >
          <button
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            className="w-6 h-6 flex items-center justify-center border border-[#E5E5E5] rounded text-sm text-[#666666] hover:border-[#9A9A9A] transition-colors"
          >
            −
          </button>
          <span
            aria-live="polite"
            aria-label={`Quantity: ${item.quantity}`}
            className="text-sm w-5 text-center"
          >
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            aria-label="Increase quantity"
            className="w-6 h-6 flex items-center justify-center border border-[#E5E5E5] rounded text-sm text-[#666666] hover:border-[#9A9A9A] transition-colors"
          >
            +
          </button>
        </div>

        <button
          onClick={handleRemove}
          aria-label={`Remove ${item.product.title} from cart`}
          className="text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          Remove
        </button>
      </div>
    </article>
  );
});

export default CartItem;

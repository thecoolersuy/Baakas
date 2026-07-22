import useCartStore from "@store/cartStore";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import Button from "@components/ui/Button";
import CartItem from "../features/cart/CartItem";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const summary = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const shipping = subtotal > 50 ? 0 : 9.99;
    const vat = subtotal * 0.1;
    const total = subtotal + shipping + vat;

    return { subtotal, shipping, vat, total };
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-[#111111] mb-2">Your cart</h1>
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="text-sm text-[#666666]">Your cart is empty</p>
          <Link
            to="/products"
            className="text-sm text-[#111111] underline underline-offset-4 hover:text-[#666666] transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-[#111111]">
          Your cart total is ${summary.total.toFixed(2)}
        </h1>
        {summary.shipping === 0 ? (
          <p className="text-sm text-[#9A9A9A] mt-1">
            Free shipping and return
          </p>
        ) : (
          <p className="text-sm text-[#9A9A9A] mt-1">
            Add ${(50 - summary.subtotal).toFixed(2)} more for free shipping
          </p>
        )}
        <Button
          variant="primary"
          size="lg"
          className="mt-4"
          onClick={() => alert("You have successfully placed an order.")}
        >
          Check out
        </Button>
      </div>

      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-6"
      >
        <Link to="/" className="hover:text-[#111111] transition-colors">
          Home
        </Link>
        <span aria-hidden="true">›</span>
        <Link to="/products" className="hover:text-[#111111] transition-colors">
          Collection
        </Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page" className="text-[#111111]">
          Cart
        </span>
      </nav>

      <section aria-label="Cart items">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </section>

      <section
        aria-label="Order summary"
        className="mt-8 border-t border-[#E5E5E5] pt-6 max-w-sm ml-auto"
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#111111] font-medium">Subtotal</span>
            <span className="text-[#111111]">
              ${summary.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#111111] font-medium">Shipping</span>
            <span className="text-[#111111]">
              {summary.shipping === 0
                ? "Free"
                : `$${summary.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#111111] font-medium">VAT</span>
            <span className="text-[#111111]">${summary.vat.toFixed(2)}</span>
          </div>

          <hr className="border-[#E5E5E5] my-1" />

          <div className="flex justify-between">
            <span className="text-base font-medium text-[#111111]">Total</span>
            <span className="text-base font-medium text-[#111111]">
              ${summary.total.toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full mt-6"
          onClick={() => {
            alert("You have successfully placed an order.");
            navigate("/products");
          }}
        >
          Check out
        </Button>

        <button
          onClick={clearCart}
          className="w-full text-xs text-[#9A9A9A] hover:text-red-500 transition-colors mt-3 py-2"
        >
          Clear cart
        </button>
      </section>
    </div>
  );
}
export default CartPage;

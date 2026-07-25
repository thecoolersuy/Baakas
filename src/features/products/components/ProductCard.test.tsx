import { describe, it, expect, beforeEach } from "vitest";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test/utils";
import ProductCard from "./ProductCard";
import useCartStore from "../../../store/cartStore";

const mockProduct = {
  id: 1,
  title: "Modern Bookshelf",
  description: "A beautiful bookshelf",
  price: 239.98,
  discountPercentage: 10,
  rating: 4.5,
  stock: 8,
  brand: "Baakas",
  category: "furniture",
  thumbnail: "https://example.com/bookshelf.jpg",
  images: [],
};

beforeEach(() => {
  act(() => {
    useCartStore.getState().clearCart();
  });
});

describe("ProductCard", () => {
  it("renders product title", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Modern Bookshelf")).toBeInTheDocument();
  });

  it("renders the category label", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText("furniture")).toBeInTheDocument();
  });

  it("shows discounted price when discount exists", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    // ProductCard renders prices as "$215.98" and "$239.98"
    // getByText must match the exact string in the DOM including $
    // 239.98 * (1 - 10/100) = 215.982 → toFixed(2) = "215.98"
    expect(screen.getByText("$215.98")).toBeInTheDocument();
    expect(screen.getByText("$239.98")).toBeInTheDocument();
  });

  it("shows only original price when no discount", () => {
    const noDiscountProduct = { ...mockProduct, discountPercentage: 0 };
    renderWithProviders(<ProductCard product={noDiscountProduct} />);

    expect(screen.getByText("$239.98")).toBeInTheDocument();

    // Discount badge should not exist
    expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument();
  });

  it("has accessible add to cart button", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(
      screen.getByRole("button", { name: "Add Modern Bookshelf to cart" }),
    ).toBeInTheDocument();
  });

  it("adds product to cart when button clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductCard product={mockProduct} />);

    await user.click(
      screen.getByRole("button", { name: "Add Modern Bookshelf to cart" }),
    );

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].product.id).toBe(1);
    expect(items[0].quantity).toBe(1);
  });

  it("links to the product detail page", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const link = screen.getByRole("link", { name: "View Modern Bookshelf" });
    expect(link).toHaveAttribute("href", "/products/1");
  });
});

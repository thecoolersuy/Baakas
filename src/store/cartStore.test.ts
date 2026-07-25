import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import useCartStore from "./cartStore";

//mock product for testing

const mockProduct = {
  id: 1,
  title: "Test Bookshelf",
  description: "A test product",
  price: 99.99,
  discountPercentage: 0,
  rating: 4.5,
  stock: 10,
  brand: "TestBrand",
  category: "furniture",
  thumbnail: "https://example.com/image.jpg",
  images: [],
};

const mockProduct2 = {
  ...mockProduct,
  id: 2,
  title: "Test Table",
  price: 49.99,
};

beforeEach(() => {
  act(() => {
    useCartStore.getState().clearCart();
  });
});

describe("cartStore", () => {
  //testforr additem method
  describe("addItem", () => {
    it("adds a new product to the cart", () => {
      act(() => {
        useCartStore.getState().addItem(mockProduct);
      });
    });

    it("increments quantity when same product added twice", () => {
      act(() => {
        useCartStore.getState().addItem(mockProduct);
        useCartStore.getState().addItem(mockProduct);
      });

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(2);
    });

    it("adds multiple different products seperately", () => {
      act(() => {
        useCartStore.getState().addItem(mockProduct);
        useCartStore.getState().addItem(mockProduct2);

        const { items } = useCartStore.getState();
        expect(items).toHaveLength(2);
      });
    });
  });
  //testfor removeitem
  describe("removeItem", () => {
    it("removes the product from the cart", () => {
      act(() => {
        useCartStore.getState().addItem(mockProduct);
        useCartStore.getState().removeItem(mockProduct.id);
      });
      const { items } = useCartStore.getState();
      expect(items).toHaveLength(0);
    });
    it("only removes the specific product", () => {
      act(() => {
        useCartStore.getState().addItem(mockProduct);
        useCartStore.getState().addItem(mockProduct2);

        useCartStore.getState().removeItem(mockProduct2.id);
      });
      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].product.id).toBe(1);
    });
  });
  describe("updateItem", () => {
    it("updates the quantity of an item", () => {
      act(() => {
        useCartStore.getState().addItem(mockProduct);
        useCartStore.getState().updateQuantity(mockProduct.id, 2);

        const { items } = useCartStore.getState();
        expect(items[0].quantity).toBe(2);
      });
    });
    it("removes the item when the quantity is 0", () => {
      act(() => {
        useCartStore.getState().addItem(mockProduct);
        useCartStore.getState().removeItem(mockProduct.id);

        const { items } = useCartStore.getState();
        expect(items).toHaveLength(0);
      });
    });
  });

  describe("getTotalItems", () => {
    it("returns 0 for empty cart", () => {
      const total = useCartStore.getState().getTotalItems();
      expect(total).toBe(0);
    });

    it("returns correct total across multple items", () => {
      useCartStore.getState().addItem(mockProduct);
      useCartStore.getState().addItem(mockProduct);
      useCartStore.getState().addItem(mockProduct2);
      const total = useCartStore.getState().getTotalItems();

      expect(total).toBe(3);
    });
  });

  describe("getTotalPrice", () => {
    it("returns 0 for empty cart", () => {
      expect(useCartStore.getState().getTotalPrice()).toBe(0);
    });

    it("calculates total price", () => {
      act(() => {
        useCartStore.getState().addItem(mockProduct);
        useCartStore.getState().addItem(mockProduct);
        useCartStore.getState().addItem(mockProduct2);

        const total = useCartStore.getState().getTotalPrice();
        expect(total).toBeCloseTo(249.97, 2);
      });
    });
  });

  //test for clearcart
  describe("clearCart", () => {
    it("empties out items in the cart", () => {
      act(() => {
        useCartStore.getState().addItem(mockProduct);
        useCartStore.getState().addItem(mockProduct2);

        useCartStore.getState().clearCart();
      });

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(0);
    });
  });
});

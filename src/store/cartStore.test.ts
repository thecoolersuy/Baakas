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
  });
});

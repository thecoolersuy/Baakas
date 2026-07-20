import type { Product } from "../../../types/index";
import ProductCard from "./ProductCard";
import { memo } from "react";

interface ProductGridProps {
  list: Product[];
}

const ProductGrid = memo(function ProductGrid({ list }: ProductGridProps) {
  if (list.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-[#666666]">No products found</p>
      </div>
    );
  }
  return (
    <>
      <ul
        aria-label="product section"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8"
      >
        {list.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}
)

export default ProductGrid;

import { useState } from "react";
import { useProducts, useCategories } from "@features/products/hooks";

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError, refetch } = useProducts({
    limit: 20,
    skip: page * 20,
    q: debouncedSearch || undefined,
    category: category || undefined,
  });

  const { data: categories } = useCategories();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(0);
  }

  function handleCategoryChange(cat: string) {
    setCategory(cat);
    setSearch("");
    setPage(0);
  }

  function handlePrevPage() {
    setPage((p) => Math.max(0, p - 1));
  }

  function handleNextPage() {
    setPage((p) => Math.max(0, p + 1));
  }

  const totalPages = data ? Math.ceil(data.total / 20) : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="font-sans text-2xl text-brand-black font-medium">
          Collection
        </h1>
        {data && (
          <p className="text-sm text-[#9a9a9a] mt-1">{data.total} products</p>
        )}
      </div>
      #search section
      <div className="mb-6">
        <label htmlFor="product-search" className="sr-only">
          Search Products
        </label>
        <input
          id="product-search"
          type="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search Products"
          className="w-full max-w-sm text-sm border-b border-[#e5e5e5] pb-2 bg-transparent outline-none placeholder:text-[#9a9a9a] text-[#111111] focus:border-[#111111] transotion-colors"
        />
      </div>
      #category filter
      {categories && categories.length > 0 && (
        <div
          role="group"
          aria-label="Filter by categories"
          className="flex gap-2 flex-wrap mb-8"
        >
          <CategoryButton
            label="All"
            isActive={category === ""}
            onClick={() => handleCategoryChange("")}
          />
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              label={cat}
              isActive={category === cat}
              onClick={() => handleCategoryChange(cat)}
            />
          ))}
          //Main content
        </div>
      )}
    </div>
  );
}
export default ProductsPage;

import { useState } from "react";
import { useProducts, useCategories } from "../../src/features/products/hooks";
import LoadingGrid from "@components/ui/LoadingGrid";
import ErrorMessage from "@components/ui/ErrorMessage";
import ProductGrid from "../../src/features/products/components/ProductGrid";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useDebounce from "@hooks/useDebounce";

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
  const isLastPage = page === totalPages - 1;
  const isNextPage = !isLastPage && totalPages > 0;

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

      {categories && categories.length > 0 && (
        <div
          role="group"
          aria-label="Filter by categories"
          className="flex gap-2 flex-wrap mb-8"
        >
          <CategoryButton
            text="All"
            isActive={category === ""}
            onClick={() => handleCategoryChange("")}
          />
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              text={cat}
              isActive={category === cat}
              onClick={() => handleCategoryChange(cat)}
            />
          ))}

          {isLoading ? (
            <LoadingGrid />
          ) : isError ? (
            <ErrorMessage
              message="couldnt fetch the products you asked for"
              onRetry={refetch}
            />
          ) : (
            <ProductGrid list={data?.products ?? []} />
          )}
          {totalPages > 1 && (
            <div className="w-full">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
                hasNext={isNextPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface CategoryButtonProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

function CategoryButton({ text, isActive, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors capitalize
        ${
          isActive
            ? "bg-[#111111] text-white border-[#111111]"
            : "border-[#E5E5E5] text-[#666666] hover:border-[#9A9A9A]"
        }
      `}
    >
      {text}
    </button>
  );
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
}

function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
  hasNext,
}: PaginationProps) {
  return (
    <nav
      aaria-label="Pagination"
      className="flex items-center justify-center gap-6 mt-12"
    >
      <button
        onClick={onPrev}
        disabled={page === 0}
        aria-label="go to previous page"
        className="text-sm text-[#666666] hover:text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex gap-5 items-center"
      >
        <ArrowLeft size={24} />
        Previous
      </button>
      <span aria-current="page" className="text-sm text-[#9a9a9a]">
        {page + 1} /{totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={!hasNext}
        aria-label="go to next page"
        className="text-sm text-[#666666] hover:text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex gap-5 items-center"
      >
        Next <ArrowRight size={24} />
      </button>
    </nav>
  );
}

export default ProductsPage;

function LoadingGrid() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading Products"
      className="grid grid-cols-2 md:grid-cols-3 lg:cols-5 gap-x-4 gap-y-8"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="aspect-square bg-[#f1f1f1] rounded animate-pulse" />
          <div className="h-3 w-1/3 bg-[#f1f1f1] rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-[#f1f1f1] rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-[#f1f1f1] rounded animate-pulse" />
          <div className="h-8 mt-1 bg-[#f1f1f1] rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default LoadingGrid;

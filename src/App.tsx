import { Routes, Route } from "react-router-dom";
import Layout from "@components/Layout";
import ProductsPage from "@pages/ProductsPage";
const HomePage = lazy(() => import("@pages/HomePage"));
const ProductDetailPage = lazy(() => import("@pages/ProductDetailPage"));
const CartPage = lazy(() => import("@pages/CartPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));
import { lazy, Suspense } from "react";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-[#9A9A9A]">Loading...</span>
      </div>
    </div>
  );
}
function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

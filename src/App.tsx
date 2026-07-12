import { Routes, Route } from "react-router-dom";
import Layout from "@components/Layout";
import ProductsPage from "@pages/ProductsPage";
import HomePage from "@pages/HomePage";
import ProductDetailPage from "@pages/ProductsPage";
import CartPage from "@pages/CartPage";
import NotFoundPage from "@pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/ :id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

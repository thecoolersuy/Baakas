import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/ :id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

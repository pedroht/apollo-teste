import { MainLayout } from "@/view/layouts/main-layout";
import { Home } from "@/view/pages/Home";
import { Products } from "@/view/pages/Products";
import { CreateProduct } from "@/view/pages/Products/Create";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<CreateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

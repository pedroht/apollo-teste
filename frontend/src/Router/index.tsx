import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainLayout } from "@/view/layouts/main-layout";
import { Categories } from "@/view/pages/Categories";
import { CreateCategory } from "@/view/pages/Categories/Create";
import { Home } from "@/view/pages/Home";
import { Products } from "@/view/pages/Products";
import { CreateProduct } from "@/view/pages/Products/Create";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<CreateProduct />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/new" element={<CreateCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

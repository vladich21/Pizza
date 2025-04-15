import "./scss/app.scss";
import Home from "./pages/Home";
import FullPizza from "./pages/FullPizza";
import { Routes, Route } from "react-router-dom";
import NotFoundBlock from "./components/NotFoundBlock";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFoundBlock />} />
      </Route>
    </Routes>
  );
}

export default App;

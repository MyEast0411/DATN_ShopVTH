import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;

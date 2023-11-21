import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import EnterPassword from "./components/EnterPassword";
import DetailProduct from "./components/DetailProduct";
import SizeGuide from "./components/SizeGuide";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/enter-password" element={<EnterPassword />} />
        <Route path="/detail-product/:idSP" element={<DetailProduct />} />
        <Route path="/size-guide" element={<SizeGuide />} />
      </Routes>
    </>
  );
}

export default App;

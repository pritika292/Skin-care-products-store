import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import NewProductPage from "./pages/NewProductPage";
import PaymentPage from "./pages/PaymentPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ViewOrderPage from "./pages/ViewOrderPage";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  return (
    <Router>
      <ToastContainer position="top-left" autoClose={4000} theme="colored" />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/search/:id" element={<ProductPage />} />
        <Route exact path="/mycart/:id" element={<CheckoutPage />} />
        <Route exact path="/mycart/:id/review" element={<PaymentPage />} />
        <Route exact path="/myorders/:id" element={<MyOrdersPage />} />
        <Route exact path="/order/:id" element={<ViewOrderPage />} />
        <Route
          path="/products/add"
          element={isAdmin ? <NewProductPage /> : <HomePage />}
        />
        <Route
          path="/products/edit/:id"
          element={isAdmin ? <NewProductPage /> : <HomePage />}
        />
      </Routes>
    </Router>
  );
}

export default App;

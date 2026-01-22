import { Routes, Route } from "react-router-dom";
import AccountInformation from "./layouts/AccountInformationLayout";
import Address from "./pages/AddressPage";
import Profile from "./pages/ProfilePage";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/AboutPage";
import Home from "@/pages/HomePage";
import Login from "@/pages/LoginPage";
import ProductDetails from "@/pages/ProductDetailsPage";
import ProductLists from "@/pages/ProductListsPage";
import Register from "@/pages/RegisterPage";
import Help from "./pages/HelpPage";
import VerifyAccount from "@/pages/VerifyAccountPage";
import ResetPassword from "./pages/ResetPasswordPage";
import ProductListsLayout from "./layouts/ProductListsLayout";
import ProductDetailsLayout from "./layouts/ProductDetailsLayout";
import Blog from "./pages/BlogPage";
import BlogDetail from "./pages/BlogPage/shared/BlogDetail";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ChangePassword from "./pages/ChangePasswordPage";
import ForgotPasswordLayout from "./layouts/ForgotPasswordLayout";
import ForgotPasswordVerify from "./pages/ForgotPasswordPage/shared/ForgotPasswordVerify";
import MyOrders from "./pages/MyOrderPage";
import Checkout from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";

const App = () => {
  return (
    <Routes>
      {/* Dependencies component Header and Footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="help" element={<Help />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="about" element={<About />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="my-order" element={<MyOrders />} />
      </Route>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Forgot Password */}
      <Route path="/forgot-password" element={<ForgotPasswordLayout />}>
        <Route index element={<ForgotPassword />} />
        <Route
          path="forgot-password-verify"
          element={<ForgotPasswordVerify />}
        />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Register */}
      <Route path="/register" element={<Register />} />
      <Route path="/register/verify-account" element={<VerifyAccount />} />

      {/* Product Lists */}
      <Route path="/all-products" element={<ProductListsLayout />}>
        <Route index element={<ProductLists />} />
      </Route>

      {/* Product Details */}
      <Route path="/product-details/:id" element={<ProductDetailsLayout />}>
        <Route index element={<ProductDetails />} />
      </Route>

      {/* Account Inform */}
      <Route path="/account-information" element={<AccountInformation />}>
        <Route path="profile/:id" element={<Profile />} />
        <Route path="change-password/:id" element={<ChangePassword />} />
        <Route path="address/:id" element={<Address />} />
      </Route>
    </Routes>
  );
};

export default App;

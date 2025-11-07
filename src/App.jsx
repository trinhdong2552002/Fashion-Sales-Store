import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountInformation from "./layouts/AccountInformation";
import Address from "./pages/AddressPage";
import Profile from "./pages/ProfilePage";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/AboutPage";
import Home from "@/pages/HomePage";
import Login from "@/pages/LoginPage";
import MyOrder from "@/pages/MyOrderPage";
import OrderConfirmation from "@/pages/OrderConfirmationPage";
import ProductDetails from "@/pages/ProductDetailsPage";
import ProductLists from "@/pages/ProductListsPage";
import Register from "@/pages/RegisterPage";
import ShippingMethod from "@/pages/ShippingMethodPage";
import Help from "./pages/HelpPage";
import VerifyAccount from "@/pages/VerifyAccountPage";
import ResetPassword from "./pages/ResetPasswordPage";
import ProductListsLayout from "./layouts/ProductListsLayout";
import AddressInformation from "./pages/AddressPage/shared/AddressInformation";
import AddressList from "./pages/AddressPage/shared/AddressList";
import ProductDetailsLayout from "./layouts/ProductDetailsLayout";
import Blog from "./pages/BlogPage";
import BlogDetail from "./pages/BlogPage/shared/BlogDetail";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ChangePassword from "./pages/ChangePasswordPage";
import ForgotPasswordLayout from "./layouts/ForgotPasswordLayout";
import ForgotPasswordVerify from "./pages/ForgotPasswordPage/shared/ForgotPasswordVerify";

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

      {/* Prouduct Lists */}
      <Route path="/all-products" element={<ProductListsLayout />}>
        <Route index element={<ProductLists />} />
      </Route>

      {/* Product Details */}
      <Route path="/product-details/:id" element={<ProductDetailsLayout />}>
        <Route index element={<ProductDetails />} />
      </Route>

      {/* Shipping Method */}
      <Route path="/shipping-method" element={<ShippingMethod />} />

      {/* Order Confirmation */}
      <Route path="/order-confirmation" element={<OrderConfirmation />} />

      {/* Account Inform */}
      <Route path="/account-information" element={<AccountInformation />}>
        <Route path="profile/:id" element={<Profile />} />
        <Route path="change-password/:id" element={<ChangePassword />} />
        <Route path="address/:id" element={<Address />} />
        <Route path="address-list/:id" element={<AddressList />} />
        <Route path="new-address/:id" element={<AddressInformation />} />
      </Route>

      <Route path="/my-order" element={<MyOrder />} />
    </Routes>
  );
};

export default App;

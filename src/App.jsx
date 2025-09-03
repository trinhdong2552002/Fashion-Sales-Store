import { Route, Routes } from "react-router-dom";
import AccountInformation from "./layouts/AccountInformation";
import Address from "./pages/AddressPage";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/ProfilePage";
import ForgotPasswordLayout from "@/layouts/ForgotPasswordLayout";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/AboutPage";
import Blog from "@/pages/Blog";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/HomePage";
import Login from "@/pages/LoginPage";
import MyOrder from "@/pages/MyOrderPage";
import OrderConfirmation from "@/pages/OrderConfirmationPage";
import ProductDetails from "@/pages/ProductDetailsPage";
import ProductLists from "@/pages/ProductListsPage";
import Register from "@/pages/RegisterPage";
import ShippingMethod from "@/pages/ShippingMethodPage";
import Support from "@/pages/SupportPage";
import VerifyAccount from "@/pages/VerifyAccountPage";
import ResetPassword from "./pages/ResetPasswordPage";
import ForgotPasswordVerify from "./pages/ForgotPassword/shared/ForgotPasswordVerify";
import ProductListsLayout from "./layouts/ProductListsLayout";
import AddressInformation from "./pages/AddressPage/shared/AddressInformation";
import AddressList from "./pages/AddressPage/shared/AddressList";
import BlogDetail from "./pages/Blog/shared/BlogDetail";

const App = () => {
  return (
    <Routes>
      {/* Dependencies component Header and Footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="support" element={<Support />} />
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
      <Route path="/list-products" element={<ProductListsLayout />}>
        <Route index element={<ProductLists />} />
      </Route>

      {/* Product Details */}
      <Route path="/product-details/:id" element={<ProductDetails />} />

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

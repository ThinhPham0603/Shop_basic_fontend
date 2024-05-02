import AdminPage from "../pages/AdminPage/adminPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/detailsOrderPage";
import HomePage from "../pages/HomePage/homePage";
import MyOrderPage from "../pages/MyOrderPage/myOrderPage";
import notFoundPage from "../pages/NotFoundPage/notFoundPage";
import OrderPage from "../pages/OrderPage/orderPage";
import OrderSuccess from "../pages/OrderSuccess/orderSuccess";
import PaymentPage from "../pages/PaymentPage/paymentPage";
import ProductDetailPage from "../pages/ProductDetailPage/productDetailPage";
import ProductPage from "../pages/ProductPage/productPage";
import ProfilePage from "../pages/ProfilePage/profilePage";
import SignInPage from "../pages/SignInPage/signInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/typeProductPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
    isShowHeader: true,
  },
  {
    path: "/details-order/:id",
    page: DetailsOrderPage,
    isShowHeader: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "/orderSuccess",
    page: OrderSuccess,
    isShowHeader: true,
  },

  {
    path: "/products",
    page: ProductPage,
    isShowHeader: true,
  },
  {
    path: "product/:type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/product-details/:id",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    //isPrivate: true,
    isShowHeader: false,
  },
  {
    path: "*",
    page: notFoundPage,
  },
];
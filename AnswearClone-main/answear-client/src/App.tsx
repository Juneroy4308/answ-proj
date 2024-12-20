import AdminProtectedRoute from "components/guards/AdminProtectedRoute.tsx";
import AdminLayout from "components/layouts/AdminLayout.tsx";
import UserLayout from "components/layouts/UserLayout.tsx";
import ResetPasswordPage from "pages/admin/ResetPasswordPage.tsx";
import SignInPage from "pages/admin/SignInPage.tsx";
import SignUpPage from "pages/admin/SignUpPage.tsx";
import CategoriesPage from "pages/admin/category/CategoriesPage.tsx";
import CategoryCreatePage from "pages/admin/category/CategoryCreatePage.tsx";
import CategoryEditPage from "pages/admin/category/CategoryEditPage.tsx";
import DiscountCreatePage from "pages/admin/discount/DiscountCreatePage.tsx";
import DiscountEditPage from "pages/admin/discount/DiscountEditPage.tsx";
import DiscountsPage from "pages/admin/discount/DiscountsPage.tsx";
import FilterCreatePage from "pages/admin/filter/FilterCreatePage.tsx";
import FilterEditPage from "pages/admin/filter/FilterEditPage.tsx";
import FiltersPage from "pages/admin/filter/FiltersPage.tsx";
import OrdersPage from "pages/admin/order/OrdersPage.tsx";
import ProductCreatePage from "pages/admin/product/ProductCreatePage.tsx";
import ProductPage from "pages/admin/product/ProductPage.tsx";
import UsersPage from "pages/admin/user/UsersPage.tsx";
import AnswearClubPage from "pages/client/AnswearClubPage.tsx";
import ClientCategoryPage from "pages/client/CategoryPage.tsx";
import ClientFavoritePage from "pages/client/ClientFavoritePage.tsx";
import ClientHomePage from "pages/client/ClientHomePage.tsx";
import LoginPage from "pages/client/LoginPage.tsx";
import MyOrdersPage from "pages/client/MyOrdersPage.tsx";
import OrderPage from "pages/client/OrderPage.tsx";
import ClientProductPage from "pages/client/ProductPage.tsx";
import ProfilePage from "pages/client/ProfilePage.tsx";
import ShoppingCartPage from "pages/client/ShoppingCartPage.tsx";
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" />
                <Route element={<UserLayout />}>
                    <Route index element={<ClientHomePage />} />
                    <Route path="login" element={<LoginPage />} />

                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="product/:slug" element={<ClientProductPage />} />
                    <Route path="category/:slug" element={<ClientCategoryPage />} />
                    <Route path="favorites" element={<ClientFavoritePage />} />
                    <Route path="ac" element={<AnswearClubPage />} />
                    <Route path="cart" element={<ShoppingCartPage />} />
                    <Route path="checkout" element={<OrderPage />} />
                    <Route path="orders" element={<MyOrdersPage />} />

                    <Route path="reset-password" element={<ResetPasswordPage />} />
                </Route>

                <Route path="admin" element={<AdminLayout />}>
                    <Route element={<AdminProtectedRoute />}>
                        <Route path="categories">
                            <Route path="list" element={<CategoriesPage />} />
                            <Route path="create" element={<CategoryCreatePage />} />
                            <Route path="edit/:id" element={<CategoryEditPage />} />
                        </Route>

                        <Route path="products">
                            <Route path="list" element={<ProductPage />} />
                            <Route path="create" element={<ProductCreatePage />} />
                        </Route>

                        <Route path="orders">
                            <Route path="list" element={<OrdersPage />} />
                        </Route>

                        <Route path="discounts">
                            <Route path="list" element={<DiscountsPage />} />
                            <Route path="create" element={<DiscountCreatePage />} />
                            <Route path="edit/:id" element={<DiscountEditPage />} />
                        </Route>
                        <Route path="filters">
                            <Route path="list" element={<FiltersPage />} />
                            <Route path="create" element={<FilterCreatePage />} />
                            <Route path="edit/:id" element={<FilterEditPage />} />
                        </Route>
                        <Route path="users">
                            <Route path="list" element={<UsersPage />} />
                        </Route>
                    </Route>
                    <Route path="auth">
                        <Route path="sign-in" element={<SignInPage />} />
                        <Route path="register" element={<SignUpPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default App;

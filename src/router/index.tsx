import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AdminLayout from '../components/admin/AdminLayout';
import { StaffRoute, AuthenticatedRoute } from './guards';

import ProductListingPage from '../pages/ProductListingPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/orders/CheckoutPage';
import OrderHistoryPage from '../pages/orders/OrderHistoryPage';
import OrderDetailPage from '../pages/orders/OrderDetailPage';
import ReceiptPage from '../pages/orders/ReceiptPage';
import WishlistPage from '../pages/wishlist/WishlistPage';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import AccountPage from '../pages/auth/AccountPage';

import PromotionsListPage from '../pages/admin/PromotionsListPage';
import PromotionFormPage from '../pages/admin/PromotionFormPage';
import CategoriesListPage from '../pages/admin/CategoriesListPage';
import CategoryFormPage from '../pages/admin/CategoryFormPage';
import ProductsListPage from '../pages/admin/ProductsListPage';
import ProductFormPage from '../pages/admin/ProductFormPage';
import VariantsListPage from '../pages/admin/VariantsListPage';
import VariantFormPage from '../pages/admin/VariantFormPage';
import InventoriesListPage from '../pages/admin/InventoriesListPage';
import InventoryFormPage from '../pages/admin/InventoryFormPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <ProductListingPage /> },
            { path: 'product/:id', element: <ProductDetailPage /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'checkout', element: <CheckoutPage /> },
            { path: 'orders', element: <OrderHistoryPage /> },
            { path: 'orders/:id', element: <OrderDetailPage /> },
            { path: 'orders/:id/receipt', element: <ReceiptPage /> },
            { path: 'wishlist', element: <WishlistPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'verify-email', element: <VerifyEmailPage /> },
            { path: 'forgot-password', element: <ForgotPasswordPage /> },
            { path: 'reset-password', element: <ResetPasswordPage /> },
            {
                path: 'account',
                element: (
                    <AuthenticatedRoute>
                        <AccountPage />
                    </AuthenticatedRoute>
                ),
            },
            {
                path: 'admin',
                element: (
                    <StaffRoute>
                        <AdminLayout />
                    </StaffRoute>
                ),
                children: [
                    { path: 'promotions', element: <PromotionsListPage /> },
                    { path: 'promotions/new', element: <PromotionFormPage /> },
                    { path: 'promotions/:id/edit', element: <PromotionFormPage /> },
                    { path: 'categories', element: <CategoriesListPage /> },
                    { path: 'categories/new', element: <CategoryFormPage /> },
                    { path: 'categories/:id/edit', element: <CategoryFormPage /> },
                    { path: 'products', element: <ProductsListPage /> },
                    { path: 'products/new', element: <ProductFormPage /> },
                    { path: 'products/:id/edit', element: <ProductFormPage /> },
                    { path: 'variants', element: <VariantsListPage /> },
                    { path: 'variants/new', element: <VariantFormPage /> },
                    { path: 'variants/:id/edit', element: <VariantFormPage /> },
                    { path: 'inventories', element: <InventoriesListPage /> },
                    { path: 'inventories/new', element: <InventoryFormPage /> },
                    { path: 'inventories/:id/edit', element: <InventoryFormPage /> },
                ],
            },
        ],
    },
]);

export const AppRouter = () => <RouterProvider router={router} />;

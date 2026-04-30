import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductListingPage from '../pages/ProductListingPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import Layout from '../components/layout/Layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,          // Navbar + Footer wrap all pages
        children: [
            {
                index: true,               // matches exactly "/"
                element: <ProductListingPage />,
            },
            {
                path: 'product/:id',       // matches "/product/prod-001"
                element: <ProductDetailPage />,
            },
            {
                path: 'cart',              // matches "/cart"
                element: <CartPage />,
            },
        ],
    },
]);

export const AppRouter = () => <RouterProvider router={router} />;

import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProductsPage from "../components/pages/ProductsPage/ProductsPage";
import ProductPage from "../components/pages/ProductPage/ProductPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <h1>What are you doing here?</h1>,
            children: [
    {
        path: '/',
        element: <ProductsPage />,
    },
    {
        path: 'product/:productId',
        element: <ProductPage />,
    },
],
},
]);

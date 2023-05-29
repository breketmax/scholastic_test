
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProductsPage from "../components/pages/ProductsPage/ProductsPage";
import ProductPage from "../components/pages/ProductPage/ProductPage";
import ErrorView from "../components/ErrorView/ErrorView";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorView/>,
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

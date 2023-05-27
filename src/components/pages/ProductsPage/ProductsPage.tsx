import React, {useEffect} from 'react';
import ProductsList from "../../ProductsList/ProductsList";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {toggleFetching} from "../../../store/slices/ProductsSlice";

const ProductsPage:React.FC = () => {
    const {isFetching} = useAppSelector((state) => state.products)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(isFetching){
            setTimeout(() => {
                dispatch(toggleFetching())
            },500)
        }
    },[isFetching])

    return (
        <div className="container">
            <div className="products-list-wrapper">
                {isFetching ? <p>Loading...</p> :  <ProductsList />}
            </div>
        </div>
    );
};

export default ProductsPage;
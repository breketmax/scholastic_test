import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {toggleFetching} from "../../../store/slices/ProductsSlice";
import ProductCard from "../../ProductCard/ProductCard";

const ProductPage:React.FC = () => {
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
            <div className="product-wrapper">
                {isFetching ? <p>Loading...</p> :  <ProductCard />}
            </div>
        </div>
    );
};

export default ProductPage;
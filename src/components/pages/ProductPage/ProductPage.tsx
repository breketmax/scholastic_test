import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {toggleFetching} from "../../../store/slices/ProductsSlice";
import ProductCard from "../../ProductCard/ProductCard";
import Loader from "../../Loader/Loader";

const ProductPage:React.FC = () => {
    const {isFetching} = useAppSelector((state) => state.products)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(isFetching){
            setTimeout(() => {
                dispatch(toggleFetching())
            },2500)
        }
    },[isFetching])
    return (
        <div className="container">
            <div className="product-wrapper">
                {isFetching ? <Loader/> :  <ProductCard />}
            </div>
        </div>
    );
};

export default ProductPage;
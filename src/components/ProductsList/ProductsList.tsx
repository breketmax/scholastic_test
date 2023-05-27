import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import ProductRow from "../ProductRow/ProductRow";
import "./ProductsList.css"
import {createProduct, sortProducts} from "../../store/slices/ProductsSlice";
import {IProduct} from "../../types/types";
import TextButton from "../UI/TextButton/TextButton";
import ModalWindow from "../ModalWindow/ModalWindow";
import ProductForm from "../ProductForm/ProductForm";
const ProductsList:React.FC = () => {
    const observerTarget = useRef<HTMLDivElement>(null)

    const state = useAppSelector((state) => state)
    const [products,setProducts] = useState<IProduct[]>([])
    const [page,setPage] = useState(1)
    const [isFetching,setIsFetching] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const dispatch = useAppDispatch()
    const [createModal,setCreateModal] = useState(false)
    const [inputName,setName] = useState("")
    const [inputPrice,setPrice] = useState("")
    const [inputDescription, setDescription] = useState("")
    const toggleName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const togglePrice = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value)
    }
    const toggleDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }
    const toggleCreateModal = () => {
        setCreateModal(prevState => !prevState)
    }

    const createItem = () => {
        dispatch(createProduct({
            title:inputName,
            price:Number(inputPrice),
            description:inputDescription,
        }))
    }


    useEffect(() => {
        setProducts(sortProducts(state,page))
        const observer = new IntersectionObserver(scrollTrigger,{  rootMargin: '0px 0px 100px 0px',
            threshold: 0,})
        observer.observe(observerTarget.current!);
        return () => {
            observer.disconnect()
        }
    },[])

    useEffect(() => {
        fetchMoreProducts()
    },[page])
    const scrollTrigger = (entries: { isIntersecting: any; target: any; }[]) => {
        entries.forEach((entry: { isIntersecting: any; target: any; }) => {
            if (entry.isIntersecting && !isFetching) {
                setIsFetching(true)
                setPage(prevPage => prevPage + 1)
            }
        })
    }

    const fetchMoreProducts = () => {
        setTimeout(() => {
            const sortedProducts = sortProducts(state,page)
            if(sortedProducts.length < 5) setIsEmpty(true)
            setProducts(prevState => [...prevState,...sortedProducts])
            setIsFetching(false)
        },2500)
    }
    const exportXLS =() => {
        return true
    }

    return (
        <>
            <div className="list-header">
                <h2>Items list</h2>
                <div className="list-header-controls">
                    <TextButton text={"EXPORT AS .XLS"} onClick={exportXLS} size={"md"} type={"outline"}/>
                    <TextButton text={"create item"} onClick={toggleCreateModal} size={"lg"} type={"filled"}/>
                </div>
            </div>
            <div className="products-list">
                {products.map((product) => (
                    <ProductRow {...product} />
                ))}
            </div>
            <div ref={observerTarget} />
            {isFetching && <p>loading...</p>}


            {createModal &&
                <ModalWindow
                    close={true}
                    title={"Update item"}
                    closeModal={toggleCreateModal}
                    body={
                        <ProductForm
                            toggleName={toggleName}
                            togglePrice={togglePrice}
                            toggleDescription={toggleDescription}
                            inputName={inputName}
                            inputPrice={inputPrice}
                            inputDescription={inputDescription}
                            imageUrl={require(`../../assets/products/default.png`)}/>
                    }
                    footer={ <div className="control-row">
                        <TextButton text={"create item"} onClick={createItem} size={"lg"} type={"filled"}/>
                    </div>}/>}
        </>

    );
};

export default ProductsList;
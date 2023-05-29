import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import ProductRow from "../ProductRow/ProductRow";
import "./ProductsList.css"
import {createProduct, sortProducts} from "../../store/slices/ProductsSlice";
import {IProduct} from "../../types/types";
import TextButton from "../UI/TextButton/TextButton";
import ModalWindow from "../ModalWindow/ModalWindow";
import ProductForm from "../ProductForm/ProductForm";
import Loader from "../Loader/Loader";
import * as XLSX from 'xlsx';

const ProductsList:React.FC = () => {
    const observerTarget = useRef<HTMLDivElement>(null)

    const state = useAppSelector((state) => state)
    const [products,setProducts] = useState<IProduct[]>([])
    const [page,setPage] = useState(2)
    const [isFetching,setIsFetching] = useState(false)
    const dispatch = useAppDispatch()
    const [createModal,setCreateModal] = useState(false)
    const [inputName,setName] = useState("")
    const [inputPrice,setPrice] = useState("")
    const [inputDescription, setDescription] = useState("")
    const [disableButton, setDisableButton] = useState(false)
    useEffect(() => {
        setDisableButton(!(!!inputName && !!inputPrice && !!inputDescription))
    },[inputName,inputPrice,inputDescription])
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
        setName("")
        setPrice("")
        setDescription("")
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
        setProducts(sortProducts(state,1))

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
            setProducts(prevState => [...prevState,...sortedProducts])
            setIsFetching(false)
        },2500)
    }
    const exportXLS =() => {
        const ws = XLSX.utils.json_to_sheet(state.products.items)
        XLSX.utils.sheet_add_aoa(ws, [["Image name", "Product name","Desription", "Price","ID"]], { origin: "A1" });
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb,ws,"sheet")
        ws["!cols"] = [ { wch: 20 },{ wch: 30 },{ wch: 20 },{ wch: 10 },{ wch: 20 } ];
        XLSX.writeFile(wb,`products-${new Date().toISOString()}.xlsx`,{compression:true})
    }
    useEffect(() => {
        if(state.products.searchingQuery){
            setProducts(sortProducts(state,1))
            setPage(2)
        }
    },[state.products.searchingQuery])
    return (
        <>
            <div className="list-header">
                <h2>Items list</h2>
                <div className="list-header-controls">
                    <TextButton text={"EXPORT AS .XLS"} onClick={exportXLS} size={"md"} type={"outline"} disabled={!products.length}/>
                    <TextButton text={"create item"} onClick={toggleCreateModal} size={"lg"} type={"filled"}/>
                </div>
            </div>
            <div className="products-list">
                {!products.length && !isFetching && <h3 className="empty-list">
                    The list is empty =(</h3>}
                {products.map((product) => (
                    <ProductRow {...product} key={product.id}/>
                ))}
            </div>
            <div ref={observerTarget} />
            {isFetching && <Loader type="local"/>}


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
                        <TextButton text={"create item"} onClick={createItem} size={"lg"} type={"filled"} disabled={disableButton}/>
                    </div>}/>}
        </>

    );
};

export default ProductsList;
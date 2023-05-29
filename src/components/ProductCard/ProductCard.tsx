import React, {useEffect, useState} from 'react';
import {IProduct} from "../../types/types";
import { useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {deleteProduct, editProduct, getProduct} from "../../store/slices/ProductsSlice";
import TextButton from "../UI/TextButton/TextButton";
import backArrow from "../../assets/back-arrow.svg"
import IconButton from "../UI/IconButton/IconButton";
import deleteIcon from "../../assets/delete-icon.svg";
import {priceFormatter} from "../../helpers/scripts";
import "./ProductCard.css"
import ModalWindow from "../ModalWindow/ModalWindow";
import ProductForm from "../ProductForm/ProductForm";
const ProductCard:React.FC = () => {
    const [product,setProduct] = useState<IProduct>()
    const store = useAppSelector(state => state)
    let {productId} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const getImage = () => {
        try {
            const imagePath =  require(`../../assets/products/${product?.imageSrc}`)
            setImageUrl(imagePath)
        }
        catch (er){
            const defImagePath = require(`../../assets/products/default.png`)
            setImageUrl(defImagePath)
        }
    }
    const [imageUrl,setImageUrl] = useState("")

    const [editModal,setEditModal] = useState(false)
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
    const toggleEditModal = () => {
        if(product){
            setName(product.title)
            setPrice(String(product.price))
            setDescription(product.description)
        }
        setEditModal(prevState => !prevState)
    }
    const editItem =() => {
        dispatch(editProduct({title:inputName,price:Number(inputPrice),description:inputDescription,id:product?.id!}))
        toggleEditModal()
    }
    const [deleteModal,setDeleteModal] = useState(false)
    const toggleDeleteModal = () => {
        setDeleteModal(prevState => !prevState)
    }
    const deleteItem =() => {
        dispatch(deleteProduct(product?.id!))
        toggleDeleteModal()
        navigate("/")
    }
    const backToList = () => {
        if(store.products.searchingQuery) return navigate(`/?search=${store.products.searchingQuery}`)
        navigate("/")
    }
    useEffect(() => {
        setProduct(getProduct(store,productId!))
    },[productId])
    useEffect(() => {
        product &&  getImage()
    },[product])

    return (
        <>
            <div className="product-card-wrapper">
            <div className="product-card-header">
                    <TextButton text={"back"}  size={"sm"} type={"outline"} onClick={backToList}>
                        <img src={backArrow} alt="backArrow" />
                    </TextButton>
                <h2>{product?.title}</h2>
            </div>
            <div className="product-card-body">
                <div className="product-preview">
                    <img src={imageUrl} alt="product-preview"/>
                    <div className="product-preview-footer">
                        <div className="control-row">
                            <TextButton text={"edit"} onClick={toggleEditModal} size={"sm"} type={"filled"}/>
                            <IconButton onClick={toggleDeleteModal}>
                                <img  src={deleteIcon} alt="delete-icon"/>
                            </IconButton>
                        </div>
                        <span className="span-price">
                            {priceFormatter(product?.price!)}
                        </span>
                    </div>
                </div>
                <div className="product-info">
                    <span className="span-id">
                        ID: {product?.id}
                    </span>
                    <h2>{product?.title}</h2>
                    <p>
                        {product?.description}
                    </p>
                </div>

            </div>
        </div>
    {deleteModal &&
    <ModalWindow
        close={false}
        title={"Are you sure you want to delete this item?"}
        closeModal={toggleDeleteModal}
        body={<p>You will not be able to restore it. </p>}
        footer={ <div className="control-row">
            <TextButton text={"cancel"} onClick={toggleDeleteModal} size={"md"} type={"outline"}/>
            <TextButton text={"delete item"} onClick={deleteItem} size={"lg"} type={"filled"}/>

        </div>}/>}
            {editModal &&
                <ModalWindow
                    close={true}
                    title={"Update item"}
                    closeModal={toggleEditModal}
                    body={
                        <ProductForm toggleName={toggleName} togglePrice={togglePrice} toggleDescription={toggleDescription} inputName={inputName} inputPrice={inputPrice} inputDescription={inputDescription} imageUrl={imageUrl}/>
                    }
                    footer={ <div className="control-row">
                        <TextButton text={"update item"} onClick={editItem} size={"lg"} type={"filled"} disabled={disableButton}/>
                    </div>}/>}
        </>
    );
};

export default ProductCard;
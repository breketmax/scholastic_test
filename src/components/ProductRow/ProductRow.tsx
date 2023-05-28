import React, { useEffect, useState } from 'react';
import {IProduct} from "../../types/types";
import {lengthValidator, onlyNumberValidator, priceFormatter, stringCutter} from "../../helpers/scripts";
import "./ProductRow.css"
import TextButton from "../UI/TextButton/TextButton";
import IconButton from "../UI/IconButton/IconButton";
import deleteIcon from '../../assets/delete-icon.svg'
import ModalWindow from "../ModalWindow/ModalWindow";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {deleteProduct, editProduct} from "../../store/slices/ProductsSlice";
import { Link } from 'react-router-dom';
import ProductForm from "../ProductForm/ProductForm";

const ProductRow:React.FC<IProduct> = ({id,description,price,imageSrc,title}) => {
    const dispatch = useAppDispatch()
    const getImage = () => {
        try {
            const imagePath =  require(`../../assets/products/${imageSrc}`)
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
        setName(title)
        setPrice(String(price))
        setDescription(description)
        setEditModal(prevState => !prevState)
    }
    const editItem =() => {
        dispatch(editProduct({title:inputName,price:Number(inputPrice),description:inputDescription,id}))
        toggleEditModal()
    }
    const [deleteModal,setDeleteModal] = useState(false)
    const toggleDeleteModal = () => {
        setDeleteModal(prevState => !prevState)
    }
    const deleteItem =() => {
        dispatch(deleteProduct(id))
        toggleDeleteModal()
    }

    useEffect(() =>{
        getImage()
    },[])
    return (
        <>
        <div className="product-item">
            <div className="product-item-image">
                <img src={imageUrl} alt="product-preview"/>
            </div>
            <div className="product-item-description">
                <Link to={`product/${id}`}><h3>{title}</h3></Link>
                <p>{stringCutter(description)}</p>
            </div>
            <div className="product-item-control">
                <span className="span-id">
                    ID:{id}
                </span>
                <span className="span-price">
                    {priceFormatter(price)}
                </span>
                <div className="control-row">
                    <TextButton text={"edit"} onClick={toggleEditModal} size={"sm"} type={"filled"}/>
                    <IconButton onClick={toggleDeleteModal}>
                        <img  src={deleteIcon} alt="delete-icon"/>
                    </IconButton>
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

export default ProductRow;
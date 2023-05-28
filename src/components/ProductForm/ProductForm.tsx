import React from 'react';
import Input from "../UI/Input/Input";
import Textarea from "../UI/Textarea/Textarea";
import {IProductForm} from "../../types/types";
import {lengthValidator, onlyNumberValidator} from "../../helpers/scripts";

const ProductForm:React.FC<IProductForm> = ({imageUrl,toggleName,inputName,toggleDescription,togglePrice,inputPrice,inputDescription}) => {
    const nameValidator = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(lengthValidator(e.target.value,200))return
        toggleName(e)
    }
    const priceValidator = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value && onlyNumberValidator(e.target.value))return
        togglePrice(e)
    }
    const descriptionValidator = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        if(lengthValidator(e.target.value,1000))return
        toggleDescription(e)
    }


    return (
        <div className="edit-form">
            <div className="edit-info">
                <img src={imageUrl} alt="product-preview"/>
                <div className="edit-inputs">
                    <Input placeholder={"Name"} onChange={nameValidator} value={inputName}/>
                    <Input placeholder={"Price"} onChange={priceValidator} value={inputPrice}/>
                </div>
            </div>
            <div className="edit-description">
                <Textarea placeholder={"Description"} onChange={descriptionValidator} value={inputDescription}/>
            </div>
        </div>
    );
};

export default ProductForm;
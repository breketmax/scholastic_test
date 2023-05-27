import React from 'react';
import Input from "../UI/Input/Input";
import Textarea from "../UI/Textarea/Textarea";
import {IProductForm} from "../../types/types";

const ProductForm:React.FC<IProductForm> = ({imageUrl,toggleName,inputName,toggleDescription,togglePrice,inputPrice,inputDescription}) => {
    return (
        <div className="edit-form">
            <div className="edit-info">
                <img src={imageUrl} alt="product-preview"/>
                <div className="edit-inputs">
                    <Input placeholder={"Name"} onChange={toggleName} value={inputName}/>
                    <Input placeholder={"Price"} onChange={togglePrice} value={inputPrice}/>
                </div>
            </div>
            <div className="edit-description">
                <Textarea placeholder={"Description"} onChange={toggleDescription} value={inputDescription}/>
            </div>
        </div>
    );
};

export default ProductForm;
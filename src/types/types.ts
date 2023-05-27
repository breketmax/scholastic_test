import React from "react";

export interface IProducts{
    items:IProduct[]
    isFetching:boolean
}

export interface  IProduct{
    imageSrc?:string,
    title:string,
    description:string,
    price:number,
    id:number
}
export interface  ICreateProduct{
    title:string,
    description:string,
    price:number,
}
export interface ITextButton{
    text:string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    size: "sm" | "md" | "lg"
    type: "outline" | "filled"
    children?:React.ReactNode

}
export interface IIconButton{
    children:React.ReactNode
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export interface IModalWindow{
    close:boolean
    title:string
    footer:React.ReactNode
    body:React.ReactNode
    closeModal:() => void
}

export interface IInput {
    placeholder:string
    onChange:React.ChangeEventHandler<HTMLInputElement>
    value:string
}
export interface ITextarea {
    placeholder:string
    onChange:React.ChangeEventHandler<HTMLTextAreaElement>
    value:string
}
export interface IProductForm{
    toggleName:React.ChangeEventHandler<HTMLInputElement>
    togglePrice:React.ChangeEventHandler<HTMLInputElement>
    toggleDescription:React.ChangeEventHandler<HTMLTextAreaElement>
    inputName:string
    inputPrice:string
    inputDescription:string
    imageUrl:string
}
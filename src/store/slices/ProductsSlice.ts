import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ICreateProduct, IProduct, IProducts} from "../../types/types";
import {RootState} from "../store";

const initialState: IProducts = {
    items: [],
    isFetching:false,
    searchingQuery:""
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setItems:(state,action:PayloadAction<string>) => {
            state.isFetching = !state.isFetching
            state.items = JSON.parse(action.payload)
        },
        createProduct:(state, action:PayloadAction<ICreateProduct>) => {
            state.isFetching = !state.isFetching
            state.items.push({
                price:action.payload.price,
                title:action.payload.title,
                description:action.payload.description,
                id:Date.now(),
                imageSrc:"default.png",
            })
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.isFetching = !state.isFetching
            state.items = state.items.filter((item)=>  item.id !== action.payload)
        },
        editProduct:(state,action:PayloadAction<IProduct>)=>{
            state.isFetching = !state.isFetching
            const item = state.items.find(item => item.id === action.payload.id)
            if(item){
                item.description = action.payload.description
                item.price = action.payload.price
                item.title = action.payload.title
            }
        },
        toggleFetching:(state)=>{
            state.isFetching = !state.isFetching
        },
        setSearchingQuery: (state,action:PayloadAction<string>) => {
            state.isFetching = !state.isFetching
            state.searchingQuery = action.payload
        }
    },
})

export const sortProducts = (state: RootState,page : number) => {

    const copy = [...state.products.items]
     copy.sort((a,b) =>  {
        if(a.id > b.id) return 1
        return -1
    })

    return copy.filter(item => item.title.toLowerCase().includes(state.products.searchingQuery.toLowerCase())).slice((page-1) * 5, page* 5)

}
export const getProduct = (state: RootState,id : string):IProduct => {
    return state.products.items.filter((item) => item.id === Number(id))[0]
}

export const {  createProduct,
    deleteProduct,
    toggleFetching,
    editProduct,
    setItems,
    setSearchingQuery} = productSlice.actions

export default productSlice.reducer
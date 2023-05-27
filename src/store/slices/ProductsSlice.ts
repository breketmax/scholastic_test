import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ICreateProduct, IProduct, IProducts} from "../../types/types";
import {RootState} from "../store";

const initialState: IProducts = {
    items: [
        {
            imageSrc:"joe.png",
            title:"This is a girl",
            description:"The girl is wearing a pink sweatshirt and a black sleeveless dress above it. Her clothes are very simple but neat. If you look closely, you can see that they are slightly big for the child.",
            price:0,
            id:Date.now()+8
        },
        {
            imageSrc:"default.png",
            title:"There's no image",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price:900,
            id:Date.now()+1
        },
        {
            imageSrc:"krokant.jpg",
            title:"Candy krokant ",
            description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archite",
            price:29,
            id:Date.now()+2
        },
        {
            imageSrc:"yarche.jpg",
            title:"Yarche candy",
            description:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized ",
            price:14,
            id:Date.now()+3
        },
        {
            imageSrc:"versal.jpg",
            title:"The best candies ever VERSEL",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            price:19000,
            id:Date.now()
        },
        {
            imageSrc:"joe.png",
            title:"This is a girl",
            description:"The girl is wearing a pink sweatshirt and a black sleeveless dress above it. Her clothes are very simple but neat. If you look closely, you can see that they are slightly big for the child.",
            price:0,
            id:Date.now()+9
        },
        {
            imageSrc:"default.png",
            title:"There's no image",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price:900,
            id:Date.now()+10
        },
        {
            imageSrc:"krokant.jpg",
            title:"Candy krokant ",
            description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archite",
            price:29,
            id:Date.now()+12
        },
        {
            imageSrc:"yarche.jpg",
            title:"Yarche candy",
            description:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized ",
            price:14,
            id:Date.now()+13
        },
        {
            imageSrc:"versal.jpg",
            title:"The best candies ever VERSEL",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            price:19,
            id:Date.now()+17
        },
        {
            imageSrc:"joe.png",
            title:"This is a girl",
            description:"The girl is wearing a pink sweatshirt and a black sleeveless dress above it. Her clothes are very simple but neat. If you look closely, you can see that they are slightly big for the child.",
            price:0,
            id:Date.now()+20
        },
        {
            imageSrc:"default.png",
            title:"There's no image",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price:900,
            id:Date.now()+122
        },
        {
            imageSrc:"krokant.jpg",
            title:"Candy krokant ",
            description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archite",
            price:29,
            id:Date.now()+222
        },
        {
            imageSrc:"yarche.jpg",
            title:"Yarche candy",
            description:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized ",
            price:14,
            id:Date.now()+31
        },
        {
            imageSrc:"versal.jpg",
            title:"The best candies ever VERSEL",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            price:19,
            id:Date.now()+39
        },
    ],
    isFetching:false
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
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
        }
    },
})

export const sortProducts = (state: RootState,page : number) => {
    const copy = [...state.products.items]
     copy.sort((a,b) =>  {
        if(a.id <b.id) return 1
        return -1
    })
    return copy.slice((page-1) * 5, page* 5)
}
export const getProduct = (state: RootState,id : string):IProduct => {
    return state.products.items.filter((item) => item.id === Number(id))[0]
}

export const {  createProduct,deleteProduct,toggleFetching,editProduct } = productSlice.actions

export default productSlice.reducer
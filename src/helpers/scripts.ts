import {strLength} from "./constants";

/**
 * Разделение цены по тысячам и добавление запятых
 * @param price
 */
export const priceFormatter = (price:number):string => {
    let priceString = String(price).split("").reverse()
    let charArray:string[]= []
    for (let i = 0; i < priceString.length; i++) {
            charArray.push(priceString[i])
        if( (i+1) % 3 ===0 && i !== priceString.length-1)  {
            charArray.push(",")
        }
    }

    return "$"+ charArray.reverse().join("")
}
/**
 * Обрезание прудложения до strLength и добавление троеточия
 * @param str
 */
export const stringCutter = (str:string) => {
    if(str.length > strLength) return str.slice(0,strLength) + "..."
    return str
}
/**
 * Валидатор длины
 * @param value
 * @param length
 */
export const lengthValidator = (value:string,length:number):boolean => {
    return value.length > length
}
/**
 * Числовой валидатор
 * @param value
 */
export const onlyNumberValidator = (value:string):boolean => {
    return !/^\d+$/gm.test(value)
}

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


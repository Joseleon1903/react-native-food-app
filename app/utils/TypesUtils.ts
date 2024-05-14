import CartItem from "../types/CartItem";
import Profile from "../types/Profile";
import Restaurant from "../types/Restaurant";


export const EmptyRestaurant : Restaurant = {
    id: "",
    title: "",
    time: "",
    imageUrl: "",
    owner: "",
    code: "",
    logoUrl: "",
    rating: 0,
    ratingCount: "",
    coords: undefined
}

export const EmptyProfile : Profile = {
    id: "",
    username: "",
    email: "string",
    uid: "string",
    address: [ {city: "", street: "", postalCode: 0, country: '' } ],
    userType: "string",
    profileUrl: "string",
    updatedAt: undefined
}

export const EmptyCartItem : CartItem[] = [{
    id: "",
    userId: "string",
    productId: {id: "",title: "",restaurant: "",rating: 0,ratingCount: 0,imageUrl: ["", ""]},
    additives: [{ id: 0,title: "string",price: "string"}],
    instructions: "string",
    totalPrice: 0,
    quantity: 0,
    version: 0
}]

export const FormatTextLength =(word?: string, lenght? : number) =>{

    if(!word) return

    if(!lenght) return

    if(word.length >= lenght) {
       return word = word.substring(0, lenght) + '...';
    }
    return word;

}
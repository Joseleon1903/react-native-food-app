import Additives from "./Additives";
import Product from "./Product";

export default interface CartItem{
    id: string,
    userId: string,
    productId?: Product,
    additives?:Additives [],
    instructions: string,
    totalPrice: number,
    quantity: number,
    version: number
}
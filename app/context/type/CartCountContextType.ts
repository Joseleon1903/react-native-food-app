import CartItem from "../../types/CartItem";
import Restaurant from "../../types/Restaurant";

export type CartCountContextType = {
    cartCount: number;
    setCartCount : any;
    cartItem: CartItem[];
};
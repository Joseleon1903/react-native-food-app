import CartItem from "../../types/CartItem";

export type CartCountContextType = {
    cartCount: number;
    setCartCount : any;
    cartItem: CartItem[];
    setCartItem: any;
};
import CartItem from "../../types/CartItem";
import Food from "../../types/Food";

export type RootStackParamList = {

    FoodPage: {food: Food };
    OrderPage: {
        cardItem: CartItem,
        title: string,
        description: string,
        imageUrl: string[],
        restaurant: string,
        instruction: string
     },
     RestaurantPages:{}

};
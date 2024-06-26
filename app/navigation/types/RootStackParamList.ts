import CartItem from "../../types/CartItem";
import Food from "../../types/Food";
import Restaurant from "../../types/Restaurant";

export type RootStackParamList = {

    FoodPage: {food: Food };
    OrderPage: {
        cardItem: CartItem,
        productId : Food,
        title: string,
        description: string,
        imageUrl: string[],
        restaurant: string,
        instruction: string
     },
     RestaurantPages:{},
     Restaurant: { restaurant : Restaurant },
     AddRating: { restaurant : Restaurant},
     LoginPage:{}, 
     SignUpPage:{}, 

};
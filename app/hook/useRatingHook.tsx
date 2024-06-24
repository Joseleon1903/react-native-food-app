import axios from "axios";
import Restaurant from "../types/Restaurant";

export const putRatingHook = async (apiUrl : string , restaurantId : string, rating: number) => {

    console.log("entering in useRatingHook");
    console.log("param restaurantId: "+restaurantId);
    console.log("param rating: "+rating);

    const axiosInstance = axios.create({ baseURL: apiUrl });

    const pathRestaurantId = "/"+restaurantId;
    const pathRating = "/"+rating;

    try {
        const response = await axiosInstance.put('/mobile/api/rating/'+pathRestaurantId+pathRating);
        return response.data as Restaurant;
      } catch (error) {
        console.log(error);
      }   
};
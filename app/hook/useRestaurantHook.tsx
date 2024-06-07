import axios from 'axios';
import Restaurant from '../types/Restaurant';


export const fetchRestaurant = async (baseUrl: string) => {

    console.log("entering in fetchRestaurant");
    const axiosInstance = axios.create({ baseURL: baseUrl });

    try {
        const response = await axiosInstance.get('/mobile/api/restaurant');
        return response.data as Restaurant[];
      } catch (error) {
        console.log(error);
      }   
  };
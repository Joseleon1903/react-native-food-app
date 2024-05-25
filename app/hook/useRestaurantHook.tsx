import axios from 'axios';
import Restaurant from '../types/Restaurant';


const baseUrl = 'https://32f9-2001-1308-297e-d000-2188-58c1-6564-118.ngrok-free.app';

const axiosInstance = axios.create({ baseURL: baseUrl });

export const fetchRestaurant = async () => {

    console.log("entering in fetchRestaurant");

    try {
        const response = await axiosInstance.get('/mobile/api/restaurant');
        console.log(response.data);
        return response.data as Restaurant[];
      } catch (error) {
        console.log(error);
      }   
  };
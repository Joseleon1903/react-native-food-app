import axios from 'axios';
import Food from '../types/Food';

export const fetchFoods = async (baseUrl: string) => {

    console.log("entering in fetchFoods");

    const axiosInstance = axios.create({ baseURL: baseUrl });

    try {
        const response = await axiosInstance.get('/mobile/api/food');
        return response.data as Food[];
      } catch (error) {
        console.log(error);
      }   
  };
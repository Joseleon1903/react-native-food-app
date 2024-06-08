import axios from 'axios';
import Food from '../types/Food';

export const fetchFilterFoods = async (baseUrl: string, categoryValue: string, tagValue: string ) => {

    console.log("entering in fetchFoods");

    const axiosInstance = axios.create({ baseURL: baseUrl });

    try {
        const categoryPath= "/"+categoryValue;
        const tagsPath= "/"+tagValue;
        const response = await axiosInstance.get('/mobile/api/food'+categoryPath+ tagsPath);
        return response.data as Food[];
      } catch (error) {
        console.log(error);
      }   
  };
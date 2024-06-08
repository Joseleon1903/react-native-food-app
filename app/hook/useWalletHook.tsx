import axios from 'axios';
import Restaurant from '../types/Restaurant';


export const fetchWallet = async (baseUrl: string, profileId :string) => {

    console.log("entering in fetchWallet");
    const axiosInstance = axios.create({ baseURL: baseUrl });

    try {
        const pathId = "/"+profileId
        const response = await axiosInstance.get('/mobile/api/wallet'+pathId);
        return response.data as Restaurant[];
      } catch (error) {
        console.log(error);
      }   
  };
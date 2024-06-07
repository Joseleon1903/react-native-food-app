import axios from 'axios';

export default interface ApiVersion {
    version: string, 
}

export const fetchCheckOnlineApi = async (baseUrl: string) => {

    console.log("entering in fetchCheckOnlineApi");

    const axiosInstance = axios.create({ baseURL: baseUrl });

    try {
        const response = await axiosInstance.get('/mobile/api/info');
        return response.data as ApiVersion;
      } catch (error) {
        console.log(error);
      }   
  };
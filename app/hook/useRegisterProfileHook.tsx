import axios from 'axios';
import Profile from '../types/Profile';
 
export const PostRegisterProfile = async (apiUrl : string , profile : Profile) => {

    console.log("entering in postRegisterProfile");
    console.log("entering in profile");
    const axiosInstance = axios.create({ baseURL: apiUrl });

    try {
        const response = await axiosInstance.post('/mobile/api/profile', profile);
        return response.data as Profile;
      } catch (error) {
        console.log(error);
      }   
  };
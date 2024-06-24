import axios from 'axios';
import Profile from '../types/Profile';

 interface LoginDto {
    email: string,
    password: string 
}
 
export const useLoginHook = async (apiUrl : string , emailInput : string, passwordInput: string) => {

    console.log("entering in postRegisterProfile");
    console.log("entering in profile");
    const axiosInstance = axios.create({ baseURL: apiUrl });

    const logDto : LoginDto = {
        email: emailInput,
        password: passwordInput,
    };

    try {
        const response = await axiosInstance.post('/mobile/api/profile/login', logDto);
        return response.data as Profile;
      } catch (error) {
        console.log(error);
      }   
};
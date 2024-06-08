import Address from "../types/Address";
import CartItem from "../types/CartItem";
import OnlineService from "../types/OnlineService";
import Profile from "../types/Profile";
import Restaurant from "../types/Restaurant";
import Wallet from "../types/Wallet";

export default interface NetworkApi{
    baseUrl: string,
}

export const ApiNetwork : NetworkApi = {
    baseUrl: ""
}


export const EmptyRestaurant : Restaurant = {
    id: "",
    title: "",
    time: "",
    imageUrl: "",
    owner: "",
    code: "",
    logoUrl: "",
    rating: 0,
    ratingCount: "",
    coords: undefined
}

export const EmptyProfile : Profile = {
    id: "",
    username: "",
    email: "",
    password: "",
    uid: "",
    address: {city: "", street: "", postalCode: 0, country: '' },
    userType: "",
    profileUrl: "",
    updatedAt: undefined
}

export const MockProfile : Profile = {
    id: "asskdjfjg",
    username: "Prueba",
    email: "Prueba123@gmail.com",
    password: "prueba123",
    uid: "uuisjd12234",
    address: {city: "Barcelona", street: "Calle principal n.1", postalCode: 31100, country: 'Spain' },
    userType: "Admin",
    profileUrl: "https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg",
    updatedAt: new Date()
}

export const EmptyCartItem : CartItem[] = []

export const EmptyWallet: Wallet = {
    id: 0,
    uuid: "sample",
    currency: "USD",
    accountName: "asdd-000",
    accountNumber: "ASDT-00",
    balance: 100
}


export const DefaultUserType : string[] = [
    "Admin",
    "Visitor",
    "Guest",
    "Customer"
]

export const DefaultAddress : Address[] = [

    {
        city : "Madrid",
        street: "Calle Vereda N.01",
        postalCode: 32100,
        country: "Spain"
    },
    {
        city : "Santo Domingo",
        street: "Avenida 27 de Febrero N.27",
        postalCode: 32400,
        country: "Republica Dominicana"
    },
    {
        city : "New York",
        street: "Wall Street N.22",
        postalCode: 40100,
        country: "United State"
    },
    {
        city : "Paris",
        street: "Le Versallese N.9",
        postalCode: 50200,
        country: "France"
    },
    {
        city : "Rome",
        street: "La Colosseo N.90",
        postalCode: 60500,
        country: "Italy"
    }
]

export const EmptyOnlineService : OnlineService = {
    sessionId: "session-id-00000100011001",
    isOnlineApi: true,
    isInternetConnected: true,
    baseApi: "https://b1ab-2001-1308-293d-6000-49f0-12ee-b6ba-1d99.ngrok-free.app"
};

export const FormatTextLength =(word?: string, lenght? : number) =>{

    if(!word) return

    if(!lenght) return

    if(word.length >= lenght) {
       return word = word.substring(0, lenght) + '...';
    }
    return word;
}

export const GenerateRandomNumbers = (name:string): string => {
    
    let randomId: string = "";
    for (let i = 0; i < 4; i++) {
        randomId = name + Math.floor(Math.random() * 101).toString();
    }
    return randomId;
}

export const ParseUserName = (email:string, char: string): string => {
    
    const index = email.indexOf(char); // Encuentra la posición del carácter en la cadena
  if (index !== -1) {
    return email.substring(0, index); // Devuelve la subcadena hasta el carácter especificado
  }
  return email;
}

export const FindAddressByCountry = (country:string): Address => {
    const item = DefaultAddress.find((address) => address.country === country);
  return item as Address;
}
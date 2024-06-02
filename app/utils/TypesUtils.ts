import Address from "../types/Address";
import CartItem from "../types/CartItem";
import OnlineService from "../types/OnlineService";
import Profile from "../types/Profile";
import Restaurant from "../types/Restaurant";


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
    uid: "",
    address: {city: "", street: "", postalCode: 0, country: '' },
    userType: "",
    profileUrl: "",
    updatedAt: undefined
}

export const EmptyCartItem : CartItem[] = []

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
    isOnlineApi: false,
    isInternetConnected: false
    
};

export const FormatTextLength =(word?: string, lenght? : number) =>{

    if(!word) return

    if(!lenght) return

    if(word.length >= lenght) {
       return word = word.substring(0, lenght) + '...';
    }
    return word;

}
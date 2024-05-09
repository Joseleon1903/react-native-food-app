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


export const FormatTextLength =(word?: string, lenght? : number) =>{

    if(!word) return

    if(!lenght) return

    if(word.length >= lenght) {
       return word = word.substring(0, lenght) + '...';
    }
    return word;

}
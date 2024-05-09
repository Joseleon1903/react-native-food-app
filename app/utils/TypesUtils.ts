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
    ratingCount: ""
}


export const FormatTextLength =(word: string, lenght : number) =>{

    if(word.length >= lenght) {
       return word = word.substring(0, lenght) + '...';
    }
    return word;

}
import Additives from "./Additives"

export default interface Food{
    id: string,
    title: string,
    foodTags: string[],
    foodType: string[],
    code: string,
    isAvailable: boolean,
    restaurant: string,
    rating: number,
    ratingCount: string,
    description: string,
    price: number,
    additives: Additives[],
    imageUrl:string[],
    version: number,
    category: string,
    time:string
    available: boolean
}
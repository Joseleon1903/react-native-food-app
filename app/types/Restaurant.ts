import Coord from "./Coord"

export default interface Restaurant{
    id: string,
    title: string,
    time: string,
    imageUrl: string,
    owner: string,
    code: string,
    logoUrl: string,
    rating: number,
    ratingCount: string
    coords?: Coord
}
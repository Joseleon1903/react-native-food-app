import Address from "./Address";

export default interface Profile{
    id: string,
    username: string,
    email: string,
    uid: string,
    address: Address[],
    userType: string,
    profileUrl: string,
    updatedAt?: Date
}
import User from "../users/User";

export default interface Product {
    name: string,
    image: String,
    price: number,
    amount: number,
    uploadedBy: User,
    description?: String,
};
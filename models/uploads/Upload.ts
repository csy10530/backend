import User from "../users/User";
import Product from "../products/Product";

export default interface Upload {
    product: Product,
    uploadedBy: User
}
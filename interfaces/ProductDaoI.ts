import Product from "../models/products/Product";

export default interface ProductDaoI {
    findAllProducts(): Promise<Product[]>;

    findProductsByUser(uid: string): Promise<Product[]>;

    findProductById(pid: string): Promise<Product>;

    createProduct(product: Product): Promise<Product>;

    updateProduct(pid: string, product: Product): Promise<any>;

    deleteProduct(pid: string): Promise<any>;

    createProductByUser(uid: string, product: Product): Promise<Product>;
}
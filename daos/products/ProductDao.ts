import ProductDaoI from "../../interfaces/ProductDaoI";
import Product from "../../models/products/Product";
import ProductModel from "../../mongoose/products/ProductModel";

export default class ProductDao implements ProductDaoI {
    private static productDao: ProductDao | null = null;

    public static getInstance = (): ProductDao => {
        if (ProductDao.productDao === null) {
            ProductDao.productDao = new ProductDao();
        }

        return ProductDao.productDao;
    }

    private constructor() {}

    findAllProducts = async (): Promise<Product[]> =>
        // @ts-ignore
        ProductModel.find().populate("uploadedBy").exec();

    findProductsByUser = async (uid: string): Promise<Product[]> =>
        // @ts-ignore
        ProductModel.find({uploadedBy: uid}).populate("uploadedBy").exec();

    findProductById = async (pid: string): Promise<Product> =>
        // @ts-ignore
        ProductModel.findById(pid).populate("uploadedBy").exec();

    createProduct = async (product: Product): Promise<Product> =>
        // @ts-ignore
        ProductModel.create({...product});

    updateProduct = async (pid: string, product: Product): Promise<any> =>
        ProductModel.updateOne(
            {_id: pid},
            {$set: product}
        )

    deleteProduct = async (pid: string): Promise<any> =>
        ProductModel.deleteOne({_id: pid})

    createProductByUser = async (uid: string, product: Product): Promise<Product> =>
        // @ts-ignore
        ProductModel.create({...product, uploadedBy: uid});
}
import {Express, Response, Request} from "express";
import ProductControllerI from "../../interfaces/ProductControllerI";
import ProductDao from "../../daos/products/ProductDao";

export default class ProductController implements ProductControllerI{
    private static productDao: ProductDao = ProductDao.getInstance();
    private static productController: ProductController | null = null;

    public static getInstance = (app: Express): ProductController => {
        if (ProductController.productController === null) {
            ProductController.productController = new ProductController();
            app.get("/products", ProductController.productController.findAllProducts);
            app.get("/products/:pid", ProductController.productController.findProductById);
            app.get("/users/:uid/products", ProductController.productController.findProductsByUser);
            app.post("/users/:uid/products", ProductController.productController.createProductByUser);
            app.delete("/products/:pid", ProductController.productController.deleteProduct);
            app.put("/products/:pid", ProductController.productController.updateProduct);
        }
        return ProductController.productController;
    }

    private constructor() {}

    findAllProducts = (req: Request, res: Response) => {
        ProductController.productDao.findAllProducts()
            .then(products => res.json(products));
    }

    findProductsByUser = (req: Request, res: Response) => {
        ProductController.productDao.findProductsByUser(req.params.uid)
            .then(products => res.json(products))
            .catch(e => res.sendStatus(404));
    }

    findProductById = (req: Request, res: Response) => {
        ProductController.productDao.findProductsByUser(req.params.pid)
            .then(products => res.json(products));
    }

    updateProduct = (req: Request, res: Response) => {
        ProductController.productDao.updateProduct(req.params.pid, req.body)
            .then(status => res.json(status));
    }

    deleteProduct = (req: Request, res: Response) => {
        ProductController.productDao.deleteProduct(req.params.pid)
            .then(status => res.json(status));
    }

    createProductByUser = (req: Request, res: Response) => {
        ProductController.productDao.createProductByUser(req.params.uid, req.body)
            .then(product => res.json(product));
    }
}
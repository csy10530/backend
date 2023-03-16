import {Response, Request} from "express";

export default interface ProductControllerI {
    findAllProducts(req: Request, res: Response): void;

    findProductsByUser(req: Request, res: Response): void;

    findProductById(req: Request, res: Response): void;

    updateProduct(req: Request, res: Response): void;

    deleteProduct(req: Request, res: Response): void;

    createProductByUser(req: Request, res: Response): void;
}
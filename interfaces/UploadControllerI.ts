import {Request, Response} from "express";

export default interface UploadControllerI {
    findAllProductsUploadedByUser(req: Request, res: Response): void;

    userUploadsProduct(req: Request, res: Response): void;
}
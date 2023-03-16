import {Express, Response, Request} from "express";
import UploadDao from "../../daos/uploads/UploadDao";
import UploadControllerI from "../../interfaces/UploadControllerI";
import ProductDao from "../../daos/products/ProductDao";

export default class UploadController implements UploadControllerI {
    private static uploadDao: UploadDao = UploadDao.getInstance();
    private static productDao: ProductDao = ProductDao.getInstance();
    private static uploadController: UploadController | null = null;

    public static getInstance = (app: Express): UploadController => {
        if (UploadController.uploadController === null) {
            UploadController.uploadController = new UploadController();
            app.get("/users/:uid/uploads", UploadController.uploadController.findAllProductsUploadedByUser);
            app.post("/users/:uid/uploads/:pid", UploadController.uploadController.userUploadsProduct);
        }
        return UploadController.uploadController;
    }

    private constructor() {}

    findAllProductsUploadedByUser = async (req: Request, res: Response) => {
        let userId = req.params.uid;

        if (userId === "me") {
            res.sendStatud(404);
        } else {
            try {
                let uploads = await UploadController.uploadDao.findAllProductsUploadedByUser(userId);
                const products = uploads.map(upload => upload.product);
                res.json(products)
            } catch (e) {
                res.sendStatus(404);
            }
        }
    }

    userUploadsProduct = async (req: Request, res: Response) => {
        let userId = req.params.uid;

        if (userId === "me") {
            res.sendStatud(404);
        } else {

        }
    }
}
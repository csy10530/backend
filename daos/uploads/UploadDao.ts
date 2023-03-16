import UploadDaoI from "../../interfaces/UploadDaoI";
import UploadModel from "../../mongoose/uploads/UploadModel";
import Upload from "../../models/uploads/Upload";

export default class UploadDao implements UploadDaoI {
    private static uploadDao: UploadDao | null = null;

    public static getInstance = (): UploadDao => {
        if (UploadDao.uploadDao === null) {
            UploadDao.uploadDao = new UploadDao();
        }
        return UploadDao.uploadDao;
    }

    private constructor() {}

    findAllProductsUploadedByUser = async (uid: string): Promise<Upload[]> =>
        UploadModel.find({uploadedBy: uid}).populate({
            path: "product",
            populate: {
                path: "uploadedBy"
            }
        }).exec();

    userUploadsProduct = async (pid: string, uid: string): Promise<Upload> =>
        UploadModel.create({product: pid, uploadedBy: uid})
}
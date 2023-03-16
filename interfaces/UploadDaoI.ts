import Upload from "../models/uploads/Upload";

export default interface UploadDaoI {
    findAllProductsUploadedByUser(uid: string): Promise<Upload[]>;

    userUploadsProduct(pid: string, uid: string): Promise<Upload>;
}
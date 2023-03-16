import mongoose, {Schema} from "mongoose";
import Upload from "../../models/uploads/Upload";

const UploadSchema = new mongoose.Schema<Upload>({
    product: {type: Schema.Types.ObjectId, ref: "ProductModel"},
    uploadedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "uploads"});

export default UploadSchema;
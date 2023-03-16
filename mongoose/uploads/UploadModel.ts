import mongoose from "mongoose";
import UploadSchema from "./UploadSchema";

const UploadModel = mongoose.model("UploadModel", UploadSchema);
export default UploadModel;
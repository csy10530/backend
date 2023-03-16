import mongoose, {Schema} from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    image: {type: String},
    amount: {type: Number, default: 1},
    uploadedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "products"});

export default ProductSchema;
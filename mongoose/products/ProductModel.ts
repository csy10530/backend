import mongoose from "mongoose";
import ProductSchema from "./ProductSchema";
const ProductModel = mongoose.model("ProductModel", ProductSchema);
export default ProductModel;
import { Schema, model, Document } from 'mongoose';
import { categorySchema, ICategoria } from './Category';

interface IProduct extends Document {
    name: String,
    price: Number,
    description?: String,
    category: ICategoria
}


const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: categorySchema,
        required: true
    },
}, { timestamps: true });

const Product =  model<IProduct>("Product", productSchema);

module.exports = { Product };
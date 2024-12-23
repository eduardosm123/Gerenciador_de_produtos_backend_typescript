import { Schema, model, Document, Types } from 'mongoose';
import { categorySchema, ICategoria } from './Category';

interface IProduct extends Document {
    name: String,
    price: Number,
    description?: String,
    categoryId: ICategoria
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
    categoryId: {
       type: Schema.Types.ObjectId,
       ref: 'Category',
       required: true
    },
}, { timestamps: true });

const Product =  model<IProduct>("Product", productSchema);

module.exports = { Product };
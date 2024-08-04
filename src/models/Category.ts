import { Schema, model, Document } from 'mongoose';

export interface ICategoria extends Document {
    name: String
}

const categorySchema = new Schema<ICategoria>({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Category = model<ICategoria>('Category', categorySchema);

export { Category, categorySchema };
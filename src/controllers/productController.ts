const { Product } = require('../models/Product');
import { Request, Response } from "express"; 
import fs from "fs";
import path from "path";

const ProductController = {
    post: async (req: Request, res: Response): Promise<void> => {
        try {

            console.log(req)
            if (!req.file) {
                res.status(400).json({ msg: 'imagem obrigatoria para cadastro do produto.' })
                return
            }
            const product = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description ? req.body.description : '',
                image: req.file.filename,
                categoryId: req.body.categoryId
            };

            // remove a imagem que foi guarda durante o middleware
            if (!product.name || !product.price || !product.categoryId) {
                res.status(400).json({ msg: "Campos obrigatórios faltando" });
                fs.unlinkSync(`uploads/${req.file.filename}`);
                return;
            }

            const response = await Product.create(product);

            res.status(201).json({
                response,
                msg: "Produto criado com sucesso"
            })
        } catch (error) {
            console.log(error);
            if (req.file) {
                fs.unlinkSync(`uploads/${req.file.filename}`);
            }
            res.status(500).json({ msg: "Erro ao criar produto" });
        }
    },
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await Product.find().populate("categoryId", 'name');

            res.json(product);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao buscar os produtos" });
        }
    },
    getAllPaginate: async (req: Request, res: Response): Promise<void> => {
        try {
            const page = parseInt(req.params.page, 5);
            const limit = parseInt(req.params.limit, 5);

            const produtos = await Product.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('categoryId', 'name');

            const totalProdutos = await Product.countDocuments();

            res.json({
                produtos,
                totalPages: Math.ceil(totalProdutos / limit),
                currentPage: page,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar os produtos paginados" });
        }
    },
    get: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const produto = await Product.findById(id).populate('categoryId', 'name');;

            if (!produto) {
                res.status(404).json({ msg: "Produto não encontrada" });
                return;
            }

            res.json(produto);
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Erro ao buscar o produto" });
        }
    },
    delete: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const existingProduct = await Product.findById(id);

            if (!existingProduct) {
                res.status(404).json({ msg: "Produto não encontrada" })
                return
            }

            // remove a imagem antiga
            if (existingProduct.image) {
                const imagePath = path.resolve(__dirname, '../../uploads', existingProduct.image);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
            }

            const deleteProduto = await Product.findByIdAndDelete(id);

            res.status(200).json({
                existingProduct,
                msg: "Produto foi removido com sucesso"
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao remover o produto" });
        }
    },
    update: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;

            // verificacao se produto existe
            const existingProduct = await Product.findById(id);

            if (!existingProduct) {
                res.status(404).json({ msg: "Produto não encontrado" })
                return;
            }

            // remove a imagem antiga
            if (req.file && existingProduct.image) {
                const oldImagePath = path.resolve(__dirname, '../../uploads', existingProduct.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            const product = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description ? req.body.description : '',
                categoryId: req.body.categoryId,
                image: req.file ? req.file.filename : existingProduct.image,
            };


            const updateProduct = await Product.findByIdAndUpdate(id, product);

            if (!updateProduct) {
                res.status(404).json({ msg: "Produto não encontrada" })
                return;
            }

            res.status(200).json({
                msg: "Produto atualizado com sucesso",
                categoryId: updateProduct
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao atualizar o Produto" });
        }
    }
}

export default ProductController;
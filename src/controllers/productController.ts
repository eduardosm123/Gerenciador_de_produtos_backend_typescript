const { Product } = require('../models/Product');
import { Request, Response } from "express";

const ProductController = {
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const product = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description ? req.body.description : '',
                categoryId: req.body.categoryId
            };

            if (!product.name || !product.price || !product.categoryId) {
                res.status(400).json({ msg: "Campos obrigatórios faltando" });
                
                return;
            }

            const response = await Product.create(product);

            res.status(201).json({
                response,
                msg: "Produto criado com sucesso"
            })
        } catch (error) {
            console.log(error);
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
            const produto = await Product.findById(id);

            if (!produto) {
                res.status(404).json({ msg: "Produto não encontrada" })
                return
            }

            const deleteProduto = await Product.findByIdAndDelete(id);

            res.status(200).json({
                deleteProduto,
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

            const product = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description ? req.body.description : '',
                categoryId: req.body.categoryId
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
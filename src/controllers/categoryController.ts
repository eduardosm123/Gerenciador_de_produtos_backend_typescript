import { Category } from "../models/Category";
import { Request, Response } from "express";

const CategoryController = {
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const category = {
                name: req.body.name,
            };

            const response = await Category.create(category);

            res.status(201).json({
                response,
                msg: "Categoria cadastrada com sucesso"
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: "Erro ao cadastrar a categoria" });
        }
    },

    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const categories = await Category.find();

            res.json(categories);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao buscar as categorias" });
        }
    },
    getAllPaginate: async (req: Request, res: Response): Promise<void> => {
        try {
            const page = parseInt(req.params.page, 5);
            const limit = parseInt(req.params.limit, 5);

            const categories = await Category.find()
                .skip((page - 1) * limit)
                .limit(limit);

            const totalCategories = await Category.countDocuments();

            res.json({
                categories,
                totalPages: Math.ceil(totalCategories / limit),
                currentPage: page,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar as categorias paginadas" });
        }
    },
    get: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const category = await Category.findById(id);

            if (!category) {
                res.status(404).json({ msg: "Categoria não encontrada" });
                return;
            }

            res.json(category);
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Erro ao buscar a categoria" });
        }
    },
    delete: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const category = await Category.findById(id);

            if (!category) {
                res.status(404).json({ msg: "Categoria não encontrada" })
                return
            }

            const deleteCategory = await Category.findByIdAndDelete(id);

            res.status(200).json({
                deleteCategory,
                msg: "Categoria foi removida com sucesso"
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao remover a categoria" });
        }
    },
    update: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const category = {
                name: req.body.name
            };

            const updateCategory = await Category.findByIdAndUpdate(id, category);

            if (!updateCategory) {
                res.status(404).json({ msg: "Categoria não encontrada" })
                return
            }

            res.status(200).json({
                msg: "Categoria atualizada com sucesso",
                category: updateCategory
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao atualizar a categoria" });
        }
    }
}

export default CategoryController;
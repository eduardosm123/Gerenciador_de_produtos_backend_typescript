import { Router, Request, Response } from 'express';
import CategoryController from '../controllers/categoryController';

const router = Router(); 

// Rota para criar uma categoria (POST)
router.post("/category", CategoryController.create);

// Rota para obter todas as categorias (GET)
router.get("/category", CategoryController.getAll);

// Rota para obter categorias paginadas (GET)
router.get("/category/:page&:limit", CategoryController.getAllPaginate);

// Rota para obter uma única categoria pelo ID (GET)
router.get("/category/:id", CategoryController.get);

// Rota para deletar uma categoria pelo ID (DELETE)
router.delete("/category/:id", CategoryController.delete);

// Rota para atualizar uma categoria pelo ID (PUT)
router.put("/category/:id", CategoryController.update);
module.exports = router;
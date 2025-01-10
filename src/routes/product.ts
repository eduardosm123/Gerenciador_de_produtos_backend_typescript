import { Router, Request, Response } from 'express';
import ProductController from '../controllers/productController';
import { upload } from '../middleware/upload';

const router = Router(); 


router.post("/product", upload, ProductController.post);
router.get("/product", ProductController.getAll);
router.get("/product/:page&:limit", ProductController.getAllPaginate);
router.get("/product/:id", ProductController.get);
router.delete("/product/:id", ProductController.delete);
router.put("/product/:id", upload, ProductController.update);
module.exports = router;
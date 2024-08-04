import { Router, Request, Response } from 'express';
import ProductController from '../controllers/productController';

const router = Router(); 

router.route("/product").post((req: Request, res: Response) => ProductController.create(req, res));

router.route("/product").get((req: Request, res: Response) => ProductController.getAll(req, res))
router.route("/product/:page&:limit").get((req: Request, res: Response) => ProductController.getAllPaginate(req, res))
router.route("/product/:id").get((req: Request, res: Response) => ProductController.get(req, res));
router.route("/product/:id").delete((req: Request, res: Response) => ProductController.delete(req, res));
router.route("/product/:id").put((req: Request, res: Response) => ProductController.update(req, res));
module.exports = router;
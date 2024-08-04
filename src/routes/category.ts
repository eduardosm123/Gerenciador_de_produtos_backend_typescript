import { Router, Request, Response } from 'express';
import CategoryController from '../controllers/categoryController';

const router = Router(); 

router.route("/category").post((req: Request, res: Response) => CategoryController.create(req, res))
router.route("/category").get((req: Request, res: Response) => CategoryController.getAll(req, res))
router.route("/category/:page&:limit").get((req: Request, res: Response) => CategoryController.getAllPaginate(req, res))
router.route("/category/:id").get((req: Request, res: Response) => CategoryController.get(req, res));
router.route("/category/:id").delete((req: Request, res: Response) => CategoryController.delete(req, res));
router.route("/category/:id").put((req: Request, res: Response) => CategoryController.update(req, res));
module.exports = router;
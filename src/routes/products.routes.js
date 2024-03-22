import { Router } from "express";

const router = Router();

import * as productsCtrl from '../controllers/products.controller.js';
import { authJwt } from "../middlewares/index.js";


//Establecer ruta products mediante el metodo GET
router.get('/', productsCtrl.getProducts);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.createProduct);
router.get('/:productId', productsCtrl.getProductById);
router.put('/:productId', authJwt.verifyToken, [authJwt.isAdmin || authJwt.isModerator], productsCtrl.updateProductById);
router.delete('/:productId', authJwt.verifyToken, [authJwt.isAdmin || authJwt.isModerator], productsCtrl.deletProductById);

export default router;




// arquivo centralizador

const router = require('express').Router();

// importação
const categoryRouter = require('./category')


// rota categoria
router.use("/", categoryRouter);

const productRouter = require('./product')
// rota produto
router.use("/", productRouter);
module.exports = router;
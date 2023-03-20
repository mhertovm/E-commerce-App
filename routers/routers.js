const express = require('express');
const router = express.Router();
const Controllers = require("../controllers/controllers");
const { authenticateToken } = require('../middleware/authenticateToken');

router.get('/', Controllers.getRoot);
router.get('/:id', Controllers.getById);
router.post('/register', Controllers.register);
router.post('/login', Controllers.login);
router.post('/addtocart',authenticateToken, Controllers.addToCart);
router.post('/admin/addproduct', authenticateToken, Controllers.addProduct);
router.put('/admin/updateproduct', authenticateToken, Controllers.updateProdut);
router.delete('/admin/deleteproduct', authenticateToken, Controllers.deleteProduct);

module.exports = router;
const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const port = 5000;
const router = require('./routers/routers');
const db = new sqlite3.Database("database.db");
const usersSchema = require('./models/users_schema');
const productsSchema = require('./models/products_schema');
const cartsSchema = require('./models/carts_schema');
const cartItemSchema = require('./models/cartItem_schema');

usersSchema.createUsersTable(db);
productsSchema.createProductsTable(db);
cartsSchema.createCartsTabel(db);
cartItemSchema.createCartItemsTable(db);


app.use(express.json());
app.use('/', router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

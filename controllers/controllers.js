const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('database.db');
const CryptoJS = require("crypto-js");
const { generateAccessToken } = require('../functions/generateAccessToken');
const { checkAdmin } = require('../functions/checkAdmin');


function getRoot(req, res) {
    db.all('SELECT * FROM products', [], (error, data) => {
        if (error) {
            res.send('Error');
        } else {
            res.send(data);
        }
    })
};

function getById (req, res) {
    const product_Id = req.params.id;
    db.get('SELECT * FROM products WHERE product_id = ?', [product_Id], (error, data) => {
        if (error) {
            res.send('Error');
        } else {
            res.send(data);
        }
    })
};

function register (req, res) {
    const { username, password } = req.body;

    const hashed_password = CryptoJS.SHA256(password).toString();
    let sql = "INSERT INTO users (username,password,role) VALUES (?, ?, ?)";
    db.run(sql, [username, hashed_password, "1"], function (err) {
      if (err) {
        res.send(JSON.stringify({ status: "Error Reigstering" }));
      }
      res.send(JSON.stringify({ status: "User Created" }));
    });
};
  
function login (req, res)  {
const { username, password } = req.body;

    const hashed_password = CryptoJS.SHA256(password).toString();
    let sql = "SELECT * from users WHERE username = ?";
    db.get(sql, [username], function (err, row) {
        if (username == row.username && hashed_password == row.password) {
        const token = generateAccessToken(row.username, row.role);
        res.send(JSON.stringify({ status: "Logged in",jwt:token }));
        } else {
        res.send(JSON.stringify({ status: "Wrong credentials" }));
        }
    });
};

function addToCart (req, res) {
    if (checkAdmin(req, res)) {
        const {name, price} = req.body

        db.run('INSERT INTO products (name,price) values (?,?)', [name,price],(err) => {
        if (err){
            res.send(err);
        } else {
            res.send("Posted")
        }
        })
    } else {
        res.send(JSON.stringify({ status: "Denied Access" }));
    }
};
  
function updateProdut (req, res) {
    if (checkAdmin(req, res)) {
        const {name, price, product_id} = req.body

        db.run('UPDATE products SET name=?, price=? WHERE product_id=?', [name,price,product_id],(err) => {
        if (err){
            res.send(err);
        } else {
            res.send("Update")
        }
        })
    } else {
        res.send(JSON.stringify({ status: "Denied Access" }));
    }
};
  
function deleteProduct (req, res) {
    if (checkAdmin(req, res)) {
        const {product_id} = req.body

        db.run('DELETE FROM products WHERE product_id=?;', [product_id],(err) => {
        if (err){
            res.send(err);
        } else {
            res.send("Deleted")
        }
        })
    } else {
        res.send(JSON.stringify({ status: "Denied Access" }));
    }
};

  module.exports = {
    getRoot,
    getById,
    register,
    login,
    addToCart,
    updateProdut,
    deleteProduct
}
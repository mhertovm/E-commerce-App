const sql = 'CREATE TABLE IF NOT EXISTS products (product_id INTEGER PRIMARY KEY, name TEXT, price INTEGER)';

function createProductsTable(db) {
    db.run(sql);
}

module.exports = { createProductsTable }
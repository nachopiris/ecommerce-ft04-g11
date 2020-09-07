const { Product, Category } = require('./db.js');

function productsSeeder()
{
    for (let i = 0; i < 10; i++) {
        Product.create({
            name: 'Video juego de prueba '+(i+1),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: (Math.floor(Math.random() * 5001) + Math.random()).toFixed(2),
            stock: Math.floor(Math.random() * 21),
            images: JSON.stringify(['https://www.spdigital.cl/img/products/new_web/1567188090228-65167129_7039686832.jpg','https://sm.ign.com/t/ign_latam/news/p/pubg-leavi/pubg-leaving-xbox-one-game-preview-release-date-announced-ga_m6ka.h960.jpg'])
        });
    }
}

function categoriesSeeder()
{
    for (let i = 0; i < 3; i++) {
        Category.create({
            name: 'Cat '+(i+1),
        });
    }
}

module.exports = {
    productsSeeder,
    categoriesSeeder
}
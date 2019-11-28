

const getProducts = () => {
    const products = JSON.parse(localStorage.getItem('products')) || require('./data/products.json');
    let mock = new Promise((resolve, reject) => {
        resolve(products);
    })
    return mock;
}


const getProductById = (id) => {
    const products = JSON.parse(localStorage.getItem('products')) || require('./data/products.json');
    let mock = new Promise((resolve, reject) => {
        resolve(products.find(product => {
            return product.id === id;
        }));
    })
    return mock;
}


export {
    getProducts,
    getProductById
}

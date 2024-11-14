import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

let id = 3; // Id para los productos

function ProductsProvider({ children }) {
    const [products, setProducts] = useState([
        { id: 1, name: 'Producto 1', price: 10 },
        { id: 2, name: 'Producto 2', price: 20 },
    ]);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: id++, 
        };
        setProducts([...products, newProduct]);
    };
    const updateProduct = (updatedProduct) => {
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };
    const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

    return (
        <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductsContext.Provider>
    );
}

export default ProductsProvider;

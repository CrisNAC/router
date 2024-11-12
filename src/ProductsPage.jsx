import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

function ProductsPage({ children }) {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
    ]);

    const addProduct = (product) => setProducts([...products, product]);
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

export default ProductsPage;

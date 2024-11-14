import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../Contexts/ProductContext';

function ProductsPage() {
    const { products, deleteProduct } = useContext(ProductsContext);
    const navigate = useNavigate();

    return (
        <div>
            <h1>Productos</h1>
            <button onClick={() => navigate('/products/new')} className="btn btn-primary mb-3">Crear Producto</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => navigate(`/products/edit/${product.id}`)} className="btn btn-warning me-2">Editar</button>
                                <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsPage;

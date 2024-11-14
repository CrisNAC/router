import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsContext } from '../Contexts/ProductContext';

function ProductForm() {
    const { addProduct, updateProduct, products } = useContext(ProductsContext);
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    const [formData, setFormData] = useState({
        name: product ? product.name : '',
        price: product ? product.price : '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setFormData({ name: product.name, price: product.price });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product) {
            updateProduct({ ...product, ...formData });
        } else {
            addProduct(formData);
        }
        navigate('/products');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{product ? 'Editar Producto' : 'Agregar Producto'}</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Precio</label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {product ? 'Actualizar Producto' : 'Agregar Producto'}
            </button>
        </form>
    );
}

ProductForm.propTypes = {
    // addProduct: PropTypes.func.isRequired,
    // updateProduct: PropTypes.func.isRequired,
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
    }),
};

export default ProductForm;

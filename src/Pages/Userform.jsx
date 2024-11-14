import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import PropTypes from 'prop-types';

function UserForm() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });

    useEffect(() => {
        if (id) {
            axios.get(`/users/${id}`)
                .then(response => setUser(response.data.data))
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            // Actualizar usuario existente
            axios.put(`/users/${id}`, user)
                .then(() => navigate('/'))
                .catch(error => console.error(error));
        } else {
            // Crear nuevo usuario
            axios.post('/users', user)
                .then(() => navigate('/'))
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="container">
            <h2>{id ? 'Editar Usuario' : 'Crear Usuario'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={user.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={user.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? 'Actualizar' : 'Crear'}
                </button>
            </form>
        </div>
    );
}

// PropTypes
UserForm.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    })
};

export default UserForm;

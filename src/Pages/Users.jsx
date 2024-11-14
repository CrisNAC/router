// src/Pages/Users/index.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/users')
            .then(response => setUsers(response.data.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div>
            <h1>Usuarios</h1>
            <button className="btn btn-primary mb-3" onClick={() => navigate('/users/new')}>Crear Usuario</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td><img src={user.avatar} alt="Avatar" className="rounded-circle" width="50" /></td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => navigate(`/users/edit/${user.id}`)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersPage;

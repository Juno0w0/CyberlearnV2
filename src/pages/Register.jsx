import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Register.css';

const Register = () => {
    const navigate = useNavigate();
    
    // 1. Estado para guardar lo que escribe el usuario
    const [formData, setFormData] = useState({
        username: '', // Ojo: en tu HTML era 'name', pero Django espera 'username'
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(''); // Para mostrar errores (ej. "El usuario ya existe")

    // Función para ver/ocultar contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 2. Función que actualiza el estado cuando escribes en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 3. Función que envía los datos a Django
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue sola
        setError('');

        // Validación local: ¿Las contraseñas coinciden?
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            // Enviamos los datos a tu Backend
            // Nota: enviamos solo lo que Django necesita (username, email, password)
            const response = await axios.post('http://127.0.0.1:8000/api/register/', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            console.log("Registro exitoso:", response.data);
            
            // Guardamos el token para que el usuario quede logueado
            localStorage.setItem('token', response.data.token);
            
            // ¡Redirigimos al Dashboard!
            alert("¡Bienvenido a CyberLearn!");
            navigate('/dashboard');

        } catch (err) {
            console.error("Error en registro:", err.response);
            // Si el servidor responde con un error específico, lo mostramos
            if (err.response && err.response.data) {
                // Un truco para mostrar el primer error que llegue
                const firstError = Object.values(err.response.data)[0];
                setError(firstError);
            } else {
                setError("Ocurrió un error al intentar registrarte.");
            }
        }
    };

    return (
        <section className="register-container">
            <div className="form-register">
                <h2>Registro de Usuario</h2>
                
                {/* Mostramos errores si los hay */}
                {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

                <form id="registerForm" onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre de Usuario:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="username"  // Cambié 'name' a 'username' para coincidir con el estado
                        value={formData.username}
                        onChange={handleChange}
                        required 
                    />

                    <label htmlFor="email">Correo Electrónico:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />

                    <label htmlFor="password">Contraseña:</label>
                    <div className="password-field-group">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                        <button 
                            type="button" 
                            className="toggle-password" 
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>

                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required 
                    />

                    <button type="submit" className="btn-submit">Registrarse</button>
                </form>
            </div>
        </section>
    );
};

export default Register;
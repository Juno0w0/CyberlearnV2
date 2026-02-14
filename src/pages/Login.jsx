import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos useNavigate
import axios from 'axios'; // Importamos axios
import '../assets/css/Register.css';

const Login = () => {
    const navigate = useNavigate();
    
    // 1. Estados para guardar datos y errores
    const [formData, setFormData] = useState({
        username: '', // Django espera 'username', no 'email' por defecto
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // 2. Función para actualizar lo que escribes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 3. Función para enviar los datos a Django
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiamos errores previos

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
            
            console.log("Login exitoso:", response.data);

            // Guardamos el token y el usuario en el navegador
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);

            // Redirigimos al Dashboard
            navigate('/dashboard');

        } catch (err) {
            console.error(err);
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return (
        <section className="register-container">
            <div className="form-register ">
                <h2>Iniciar Sesión</h2>
                
                {/* Mensaje de error si falla el login */}
                {error && <p style={{ color: '#ff4d4d', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

                <form id="loginForm" onSubmit={handleSubmit}>
                    {/* CAMBIO IMPORTANTE: Usamos Username en vez de Email para coincidir con Django */}
                    <label htmlFor="username text-white">Nombre de Usuario:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username}
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
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>

                    <button type="submit" className="btn-submit">Entrar</button>
                </form>

                <p className="footer-login" style={{ marginTop: '20px', textAlign: 'center', color: 'white' }}>
                    ¿No tienes cuenta? <Link to="/register" style={{ color: 'var(--cyber-green)' }}><span className='purple purple:hover'>Regístrate aquí</span></Link>
                </p>
            </div>
        </section>
    );
};

export default Login;

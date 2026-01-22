import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Register.css'; // Usamos el mismo CSS para no repetir código

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="register-container">
            <div className="form-register">
                <h2>Iniciar Sesión</h2>
                <form id="loginForm">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Contraseña:</label>
                    <div className="password-field-group">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            name="password" 
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
import React, { useState } from 'react';
import '../assets/css/Register.css';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="register-container">
            <div className="form-register">
                <h2>Registro de Usuario</h2>
                <form id="registerForm">
                    <label htmlFor="name">Nombre de Usuario:</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required />

                    <label for="password">Contraseña:</label>
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
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>

                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />

                    <button type="submit" className="btn-submit">Registrarse</button>
                </form>
            </div>
        </section>
    );
};

export default Register;
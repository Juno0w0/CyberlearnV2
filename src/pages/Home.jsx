import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Home.css';

const Home = () => {
    return(
            <section className="home-container">
                <div className="intro-text">
                    <p>
                        <span className="white">En esta plataforma podrás aprender</span>
                        <br/>hacking ético, seguridad de redes,
                        <br/>análisis forense<span className="white"> y más.</span>
                    </p>
                    <div className="buttons-group">
                        <Link to="/register" className="btn btn-register">Registrarse</Link>
                        <Link to="/login" className="btn btn-login">Iniciar sesión</Link>
                    </div>
                </div>
            </section>
    );

}
export default Home;


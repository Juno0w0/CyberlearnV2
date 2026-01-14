import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <main className="main-content">
            <section className="container">
                <div className="intro-text">
                    <p>
                        <span className="white">En esta plataforma podrás aprender</span>
                        <br/>hacking ético, seguridad de redes,
                        <br/>análisis forense<span className="white"> y más.</span>
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn registro">Registrarse</Link>
                        <Link to="/login" className="btn login">Iniciar sesión</Link>
                    </div>
                </div>
            </section>
        </main>
    );

}
export default Home;


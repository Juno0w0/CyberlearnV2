import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../assets/css/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('Agente'); // Estado para el nombre

    // 1. Lógica de Protección y Carga de Datos
    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        // Si no hay token, lo mandamos al login (Seguridad)
        if (!token) {
            navigate('/login');
        } else {
            // Si hay token, cargamos el nombre del usuario
            if (username) {
                setUser(username);
            }
        }
    }, [navigate]);

    // Datos de ejemplo (Pronto vendrán de Django)
    const modules = [
        { id: 1, title: 'Introduccion a Linux', progress: 80, status: 'En curso' },
        { id: 2, title: 'Fundamentos de Redes', progress: 30, status: 'En curso' },
        { id: 3, title: 'Hacking Web Application', progress: 0, status: 'Pendiente' },
    ];

    return (
        <div className="dashboard-container">
            {/* Sidebar Lateral */}
            <Sidebar/>

            {/* Contenido Principal */}
            <main className="dashboard-content">
                <header className="dashboard-header">
                    {/* Aquí inyectamos la variable {user} */}
                    <h1>Bienvenido, <span className="cyber-green-text">Agente {user}</span></h1>
                    <p>Tu progreso actual en la misión:</p>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Nivel</h3>
                        <p className="stat-value">1</p>
                    </div>
                    <div className="stat-card">
                        <h3>Racha</h3>
                        <p className="stat-value">1 Día</p>
                    </div>
                    <div className="stat-card">
                        <h3>Puntos</h3>
                        <p className="stat-value">100</p>
                    </div>
                </div>

                <section className="modules-section">
                    <h2>Módulos de Entrenamiento</h2>
                    <div className="modules-grid">
                        {modules.map(mod => (
                            <div key={mod.id} className="module-card">
                                <h3>{mod.title}</h3>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${mod.progress}%` }}></div>
                                </div>
                                <span className="progress-text">{mod.progress}% Completado</span>
                                <button className="btn-start">Continuar</button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;

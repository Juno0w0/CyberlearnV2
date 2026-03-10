import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../assets/css/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    
    // Unificamos el estado para evitar inconsistencias
    const [userData, setUserData] = useState({
        username: '', // Inicializamos vacío en lugar de dejar que sea undefined
        profile: {
            nivel: 1,
            racha: 1,
            puntos: 0
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');

        if (!token) {
            navigate('/login');
            return;
        }

        // Seteamos el nombre del localStorage inmediatamente para evitar el "undefined"
        // mientras la API responde
        if (storedUsername) {
            setUserData(prev => ({ ...prev, username: storedUsername }));
        }

        const fetchProgreso = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/progreso/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                
                // Actualizamos con los datos reales de la DB
                setUserData(response.data);
            } catch (error) {
                console.error("Error cargando datos del agente:", error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProgreso();
    }, [navigate]);

    const modules = [
        { id: 1, title: 'Introduccion a Linux', progress: 80 },
        { id: 2, title: 'Fundamentos de Redes', progress: 30 },
        { id: 3, title: 'Hacking Web Application', progress: 0 },
    ];

    return (
        <div className="dashboard-container">
            <Sidebar/>

            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h1>
                        Bienvenido, <span className="cyber-green-text">
                            {/* Usamos un fallback por si userData.username sigue vacío */}
                            {loading && !userData.username ? "Sincronizando..." : `Agente ${userData.username || 'Recluta'}`}
                        </span>
                    </h1>
                    <p style={{ fontFamily: 'var(--font-code)' }}>
                        {loading ? "Sincronizando con la red central..." : "Estado de la misión: Operativo"}
                    </p>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Nivel</h3>
                        <p className="stat-value">{userData.profile?.nivel ?? 1}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Racha</h3>
                        <p className="stat-value">{userData.profile?.racha ?? 0} Días</p>
                    </div>
                    <div className="stat-card">
                        <h3>Puntos</h3>
                        <p className="stat-value">{userData.profile?.puntos ?? 0}</p>
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
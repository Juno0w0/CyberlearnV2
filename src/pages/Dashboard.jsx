import React from 'react';
import '../assets/css/Dashboard.css';

const Dashboard = () => {
    // Datos de ejemplo para los cursos
    const modules = [
        { id: 1, title: 'Introducción al Hacking', progress: 80, status: 'En curso' },
        { id: 2, title: 'Redes y Protocolos', progress: 30, status: 'En curso' },
        { id: 3, title: 'Análisis de Malware', progress: 0, status: 'Pendiente' },
    ];

    return (
        <div className="dashboard-container">
            {/* Sidebar Lateral */}
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li className="active">Dashboard</li>
                        <li>Mis Cursos</li>
                        <li>Laboratorios</li>
                        <li>Certificaciones</li>
                        <li>Configuración</li>
                    </ul>
                </nav>
            </aside>

            {/* Contenido Principal */}
            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Bienvenido, <span className="cyber-green-text">Agente Juno</span></h1>
                    <p>Tu progreso actual en la misión:</p>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Nivel</h3>
                        <p className="stat-value">12</p>
                    </div>
                    <div className="stat-card">
                        <h3>Racha</h3>
                        <p className="stat-value">5 Días</p>
                    </div>
                    <div className="stat-card">
                        <h3>Puntos</h3>
                        <p className="stat-value">1,250</p>
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import "../assets/css/Courses.css";

const Courses = () => {
    // 1. Estado para guardar los cursos reales
    const [coursesData, setCoursesData] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Pedimos los cursos a Django al cargar la página
    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cursos/');
                setCoursesData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar los cursos:", error);
                setLoading(false);
            }
        };

        fetchCursos();
    }, []);

    // Color por defecto si no hay imagen
    const defaultGradient = "linear-gradient(135deg, #000428, #004e92)";

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="courses-content">
                <header className="courses-header">
                    <h1>Rutas de Aprendizaje</h1>
                    <p>Selecciona tu curso para iniciar</p>
                </header>
                
                {loading ? (
                    <p style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>Cargando información clasificada...</p>
                ) : (
                    <div className="courses-list">
                        {/* 3. Mapeamos los datos reales de Django */}
                        {coursesData.length === 0 ? (
                            <p style={{ color: '#00ff88' }}>No hay cursos disponibles aún. ¡Crea uno en Django Admin!</p>
                        ) : (
                            coursesData.map(course => (
                                <div key={course.id} className="course-card">
                                    <div 
                                        className="course-image" 
                                        style={{ 
                                            // Si Django manda imagen, la usamos, si no, degradado
                                            background: course.imagen 
                                            ? `url(${course.imagen}) center center / cover no-repeat` 
                                            : defaultGradient 
                                        }}
                                    >
                                        {!course.imagen && <div className="course-icon">🎓</div>}
                                    </div>

                                    <div className="course-info">
                                        <div className="course-header-row">
                                            {/* Usamos 'titulo' porque así se llama en Django */}
                                            <h2>{course.titulo}</h2>
                                            <div className="badges">
                                                {/* Importante: Usar ` ` para que la clase sea dinámica */}
                                                <span className={`badge difficulty ${course.dificultad}`}>
                                                    {course.dificultad ? course.dificultad.charAt(0).toUpperCase() + course.dificultad.slice(1) : 'Sin Nivel'}
                                                </span>
    
                                                <span className="badge modules">
                                                    {course.lecciones ? course.lecciones.length : 0} Módulos
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Usamos 'descripcion' en vez de description */}
                                        <p className="course-desc">{course.descripcion}</p>
                                        
                                        <div className="course-footer">
                                            <div className="progress-placeholder">
                                                <span>Costo: 0 👾</span>
                                            </div>
                                            <button className="btn-enroll">Inscribirse</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Courses;
import React from 'react';
import Sidebar from '../components/Sidebar';
import "../assets/css/Courses.css";
import LinuxImg from '../assets/images/LinuxImg.jpeg';
import RedesImg from '../assets/images/RedesImg.jpeg';
import WebImg from '../assets/images/WebImg.jpeg';

const Courses = () => {
   const coursesData = [
      {
         id:1,
         title: "Introduccion a Linux",
         difficulty: "Facil",
         modules: 20,
         image: LinuxImg,
         description: " Este curso cubre los conceptos basicos del manejo del sistema de linux desde terminal. El manejo de linux es indispensable para un pentester y en este curso aprenderas lo necesario, desde moverte en el sistema mediante terminal hasta conseguir una escalacion de privilegios local",
         imageColor: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbd2d)"
      },
      {
         id:2,
         title: "Fundamentos de Redes",
         difficulty: "Intermedio",
         modules: 15,
         description: "Este curso presenta los conceptos básicos esenciales para comprender el mundo de las redes. Los estudiantes aprenderán sobre diversos tipos de redes, como las LAN y las WAN, analizarán los principios fundamentales de las redes, incluyendo los modelos OSI y TCP/IP, y explorarán componentes clave de red, como routers y servidores.",
         image: RedesImg,
         imageColor: "linear-gradient(135deg, #000428, #004e92)"
      },
      {
         id:3,
         title: "Hacking Web Application",
         difficulty: "Dificil",
         modules: 20,
         description: "Este curso cubre conceptos básicos de evaluación de seguridad web y pruebas de penetración web, y proporciona una comprensión profunda de las tácticas de ataque utilizadas durante las pruebas de penetración web.",
         image: WebImg,
         imageColor: "linear-gradient(135deg, #11998e, #38ef7d)"
      } 
   ];

   return (
      <div className="dashboard-container">
         <Sidebar/>
         <main className="courses-content">
            <header className="courses-header">
               <h1>Rutas de Aprendizaje</h1>
               <p>Selecciona tu curso</p>
            </header>
            <div className="courses-list">
                    {coursesData.map(course => (
                        <div key={course.id} className="course-card">
                            {/* Sección de Imagen (Izquierda) */}
                            <div 
                                className="course-image" 
                                style={{ 
                                // Si hay imagen, úsala con 'cover', si no, usa el gradiente
                                    background: course.image 
                                    ? `url(${course.image}) center center / cover no-repeat` 
                                    : course.imageColor 
                                }}
                            >
                                {/* 4. Solo mostramos el ícono 🎓 si NO hay imagen real */}
                                {!course.image && <div className="course-icon">🎓</div>}
                            </div>

                            {/* Sección de Info (Derecha) */}
                            <div className="course-info">
                                <div className="course-header-row">
                                    <h2>{course.title}</h2>
                                    <div className="badges">
                                        <span className={`badge difficulty ${course.difficulty.toLowerCase()}`}>
                                        {course.difficulty}
                                        </span>
                                        <span className="badge modules">{course.modules} Módulos</span>
                                        </div>
                                </div>
                                
                                <p className="course-desc">{course.description}</p>
                                
                                <div className="course-footer">
                                    <div className="progress-placeholder">
                                        <span>Costo: 0 👾</span>
                                    </div>
                                    <button className="btn-enroll">Inscribirse</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
         </main>
      </div>
   );
}
export default Courses;
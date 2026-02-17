import React from 'react';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import '../assets/css/Sidebar.css';

const Sidebar = () => {
   const navigate = useNavigate();
   const location = useLocation(); //ruta actual ACTIVE

   const handleLogout = () =>{
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/login');
   };
   const isActive = (path) =>{
     return location.pathname === path ? 'active' : ''; 
   };

   return(
      <aside className="sidebar">
         <nav>
            <ul>
      {/*Uso de Link en lugar de li para navegacion*/}
               <Link to="/dashboard">
                  <li className={isActive('/dashboard')}>Dashboard</li>
               </Link>

               <Link to="/courses">
                  <li className={isActive('/courses')}>Mis Cursos</li>
               </Link>               

               <Link to="/Laboratorios">
                  <li className={isActive('/labs')}>Laboratorios</li>
               </Link>

               <Link to="/Recursos">
                  <li className={isActive('/Recursos')}>Recursos</li>
               </Link>

               <Link to="/Settings">
                  <li className={isActive('/settings')}>Settings</li>
               </Link>
               <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#ff4d4d', marginTop: '20px'}}>⚠ Cerrar Sesión</li>  
            </ul>
         </nav>
      </aside>
   ); 
}

export default Sidebar;


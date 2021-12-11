import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';
import logo from "media/logo.png";
import { useUser } from 'context/userContext';
import { useNavigate } from 'react-router-dom';
const SidebarLinks = () => {
  return (
    <ul className='mt-4'>
      <SidebarRoute to='/app' title='Inicio' icon='fas fa-home' />
      <PrivateComponent roleList={['ADMINISTRADOR',"LIDER"]}>
        <SidebarRoute to='/app/usuarios' title='Usuarios' icon='fas fa-user' />
      </PrivateComponent>
      <PrivateComponent roleList={['ADMINISTRADOR']}>
      <SidebarRoute to='/app/proyectos' title='Proyectos' icon='fas fa-project-diagram' />
      </PrivateComponent>
      <PrivateComponent roleList={['ESTUDIANTE']}>
      <SidebarRoute to='/app/proyectos_estudiante' title='Proyectos' icon='fas fa-project-diagram' />
      </PrivateComponent>
      <PrivateComponent roleList={['LIDER']}>
      <SidebarRoute to='/app/proyectos_lider' title='Proyectos Liderados' icon='fas fa-project-diagram' />
      </PrivateComponent>
      <PrivateComponent roleList={['ESTUDIANTE']}>
      <SidebarRoute to='/app/Inscripciones' title='Proyectos Inscritos' icon='fas fa-clipboard-list' />
<<<<<<< HEAD
      <SidebarRoute to='/app/avances' title='Avances' icon='fas fa-file-upload' />
=======
      </PrivateComponent>
      <SidebarRoute to='/app/category1/page1' title='Avances' icon='fas fa-file-upload'/>
>>>>>>> d8b9f40a4b9b21cbfb495a908689a7b903632e18
      <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log('eliminar token');
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebar-route text-red-700'>
        <div className='flex items-center'>
          <i className='fas fa-sign-out-alt' />
          <span className='text-sm  ml-2'>Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src={logo} alt='Logo' className='h-48' />
    </div>
  );
};

const Sidebar = () => {

  const {userData,setUserData} = useUser();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <div className=" pl-9 font-semibold text-lg w-full flex items-center">¡Hola {userData.nombre}!<i onClick={()=>navigate(`/app/editprofile/${userData._id}`)} className="fas fa-user-edit pl-2 hover:text-green-600 cursor-pointer"></i></div>
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        end
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-blue-600'
            : 'sidebar-route text-gray-900 hover:text-white hover:bg-blue-300'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;

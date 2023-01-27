import React from 'react';
import logo from "media/logo.png"
const Index = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className="flex flex-col font-bold landing_page_title text-5xl text-center mt-28">Bienvenido a Maneja Tu Proyecto aqui podras aportar a proyectos existentes o iniciar tus propios proyectos</div>
      <img src={logo} className='max-w-md mt-32 animate-bounce'></img>
    </div>
  );
};

export default Index;

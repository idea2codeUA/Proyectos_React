import React from 'react';
import estudiantes from "media/students1.svg";
import ButtonJ from 'components/ButtonJ';
const LandingPage = () => {
    return (
        <>
        <div className="fixed top-0 right-4 background_app">
        <div className="bg-gray-100 p-5 rounded-md shadow-md hover:bg-gray-300 hover:text-green-500">
        <ButtonJ texto="Login" route="/app" className="rounded-md px-20 text-2xl font-medium hover:bg-gray-300"/>
        </div>
        </div>
        <div className="container mx-auto items-center flex flex-col">
        <div className="text-center text-7xl font-medium m-4 mt-14">    
        <h1 className="landing_page_title">
        “Maneja tu proyecto” es una plataforma<br></br>
        online donde podras administrar,<br></br>
        crear y unirte a proyectos en<br></br>
        desarrollo.</h1>
        </div>
        <img src={estudiantes} alt="estudiantes"></img>
        <div className="text-center text-5xl font-medium">
        <h1 className="landing_page_title" >Haz aportes únicos y cambia el futuro</h1>    
            </div>      
        </div>
        </>
    )
}

export default LandingPage

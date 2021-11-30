import React from 'react';
import estudiantes from "Media/students1.svg";
import GoogleButton from 'react-google-button';
const LandingPage = () => {
    return (
        <>
        <div className="fixed top-0 right-4">
        <div className="bg-gray-100 p-5 rounded-md shadow-md">
        <GoogleButton/>
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

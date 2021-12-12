import React, { useEffect,useState } from 'react';
import "styles/JohinyStyles.css";
import { useMutation } from '@apollo/client';


const MiniCard = (props) => {

    //minicards de opción
    let border_color = "border-green-500"
    let bg_color = "bg-green-500"

    if(props.item == "Rechazar")
    {
        border_color = "border-red-500"
        bg_color = "bg-red-500"
    }
        return(
        <div className='cursor-pointer'>
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 ${border_color} ${bg_color} m-1 p-2 rounded-md shadow-xl hover:bg-blue-500 hover:border-blue-500`}>
            <span>{props.item}</span>
        </div>
        </div>
        )
    }


const InscripcionCard = (props) => {

    //mutacion backend


    return(
        <div className="border-2 border-blue-600 p-5 m-10 rounded-xl shadow-xl max-w-2xl">
            <h1 className="text-center align-top text-2xl  projectCardsFont">{`El usuario ${props.inscripcion.estudiante.nombre} ${props.inscripcion.estudiante.apellido} quiere entrar al proyecto `}</h1>
            <br></br>
            <h1 className="text-center align-top text-2xl  projectCardsFont">{props.proyecto.nombre}</h1>
            <div className="flex flex-wrap justify-center">
            <MiniCard item={"Aceptar"} campo={"‎"}/>
            <MiniCard item={"Rechazar"} campo={"‎"}/>
            </div>
        </div>
    )
}

export default InscripcionCard;

import React from 'react'
import "styles/JohinyStyles.css"

const MiniCard = (props) => {
    return(
        <div className="inline-block">
        <label className="text-center justify-center self-center">{props.campo}</label>
        <div className="border-2 border-blue-500 m-1 p-1 rounded-md shadow-xl">
            <span>{props.item}</span>
        </div>
        </div>
    )
}

const ProjectCard = (props) => {

    return (
        <div className="border-2 border-blue-500 pb-14 m-10 rounded-xl shadow-xl">
            <h1 className="text-center align-top text-2xl  projectCardsTitle">{props.proyecto.nombre}</h1>
            <div className="inline-block object-center">
            <MiniCard item={props.proyecto.aprobado} campo={"Aprobación"}/>
            <MiniCard item={props.proyecto.estado} campo={"Estado"}/>
            <MiniCard item={props.proyecto.fase} campo={"Fase"}/>
            <br></br>
            <MiniCard item={props.proyecto.fechaInicio.slice(0,10)} campo={"Fecha Inicio"}/>
            <MiniCard item={props.proyecto.fechaFin.slice(0,10) } campo={"Fecha Fin"}/>
            <MiniCard item={props.proyecto.presupuesto} campo={"Presupuesto"}/>
            </div>
        </div>
    )
}

export default ProjectCard

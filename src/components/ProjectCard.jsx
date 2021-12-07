import React, { useEffect } from 'react';
import "styles/JohinyStyles.css";
import { EDIT_PROYECTO } from 'graphql/proyectos/mutations';
import { useMutation } from '@apollo/client';

const MiniCard = (props) => {

    let border_color  = "border-blue-500"
    if(props.item == "PENDIENTE" || props.item == "INACTIVO" )
    {
     border_color = "border-red-500";
    }
    if(props.campo == "Aprobación")
    {
    return(
        <div className="cursor-pointer">
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 ${border_color} m-1 p-1 rounded-md shadow-xl hover:bg-red-500`} onClick={props.openModal}>
            <span>{props.item}</span>
        </div>
        </div>
    )
    }
    else{
        return(
        <div>
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 ${border_color} m-1 p-1 rounded-md shadow-xl`}>
            <span>{props.item}</span>
        </div>
        </div>
        )
    }
}

const ProjectCard = (props) => {

    const [editEstadoProyecto,{data,loading,error}] = useMutation(EDIT_PROYECTO);

    useEffect(() => {
        if(props.acceptTrigger == true)
        {
        editEstadoProyecto({
            variables:{
                id: props.proyecto._id, 
                nombre: props.proyecto.nombre, 
                presupuesto: props.proyecto.presupuesto, 
                fechaInicio: props.proyecto.fechaInicio, 
                fechaFin: props.proyecto.fechaFin,
                aprobado: "APROBADO", 
                estado: props.proyecto.estado, 
                fase: props.proyecto.fase, 
                lider: props.proyecto.lider._id
            }
        })
        props.setAcceptTrigger(false);
    }
    },[props.acceptTrigger])

    return(
        <div className="border-2 border-blue-500 p-5 m-10 rounded-xl shadow-xl max-w-2xl">
            <h1 className="text-center align-top text-2xl  projectCardsFont">{props.proyecto.nombre}</h1>
            <div className="flex flex-wrap justify-center">
            <MiniCard item={props.proyecto.aprobado} campo={"Aprobación"} openModal={props.openModal}/>
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

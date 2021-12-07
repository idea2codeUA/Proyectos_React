import React, { useEffect,useState } from 'react';
import "styles/JohinyStyles.css";
import { EDIT_PROYECTO } from 'graphql/proyectos/mutations';
import { useMutation } from '@apollo/client';

const MiniCard = (props) => {

    //color predeterminado de las minicards
    let border_color  = "border-blue-500"
    let bg_color = "bg-white"
    //variantes minicards

    //Estado Pendiente
    if(props.item == "PENDIENTE")
    {
     border_color = "border-yellow-500";
    }
    if(props.item == "NO_APROBADO" || props.item == "INACTIVO" )
    {
     border_color = "border-red-500";
     bg_color = "bg-red-500";
    }
    if(props.item == "APROBADO" || props.item == "ACTIVO" )
    {
     border_color = "border-green-500";
     bg_color = "bg-green-500";
    }
    if(props.campo == "Aprobación" || props.campo =="Estado")
    {
    return(
        <div className="cursor-pointer">
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 ${border_color} m-1 p-1 rounded-md shadow-xl hover:bg-blue-500 hover:border-blue-500 ${bg_color}`} onClick={() => {props.openModal()
        props.setProyectSelected(true)}}>
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

    //mutacion backend
    const [editEstadoProyecto,{data,loading,error}] = useMutation(EDIT_PROYECTO);

    //estado del campo aprobado
    const [aprobadoState,setAprobadoState] = useState(props.proyecto.aprobado);
    //estado del campo de del estado del proyecto
    // estado proyecto seleccionado?
    const [proyectselected,setProyectSelected] = useState(false);

    //efectos del modal de aprobacion
    useEffect(() => {
        if(props.acceptTrigger == true && proyectselected == true)
        {
            setAprobadoState("APROBADO");
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
        setProyectSelected(false);
    }
    },[props.acceptTrigger])

    useEffect(() => {
        if(props.cancelTrigger == true && proyectselected == true )
        {
        setAprobadoState("NO_APROBADO");
        editEstadoProyecto({
            variables:{
                id: props.proyecto._id, 
                nombre: props.proyecto.nombre, 
                presupuesto: props.proyecto.presupuesto, 
                fechaInicio: props.proyecto.fechaInicio, 
                fechaFin: props.proyecto.fechaFin,
                aprobado: "NO_APROBADO", 
                estado: props.proyecto.estado, 
                fase: props.proyecto.fase, 
                lider: props.proyecto.lider._id
            }
        })
        props.setCancelTrigger(false);
        setProyectSelected(false);
    }
    },[props.cancelTrigger])

    //efectos del modal de estado


    return(
        <div className="border-2 border-blue-500 p-5 m-10 rounded-xl shadow-xl max-w-2xl">
            <h1 className="text-center align-top text-2xl  projectCardsFont">{props.proyecto.nombre}</h1>
            <div className="flex flex-wrap justify-center">
            <MiniCard item={aprobadoState} campo={"Aprobación"} openModal={props.openModal} setProyectSelected={setProyectSelected}/>
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

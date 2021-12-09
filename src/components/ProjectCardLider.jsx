import React, { useEffect,useState } from 'react';
import "styles/JohinyStyles.css";
import { useMutation } from '@apollo/client';
import { CREAR_INSCRIPCION } from 'graphql/Inscripciones/mutations';

const MiniCard = (props) => {

    //color predeterminado de las minicards
    let border_color  = "border-blue-500"
    let bg_color = "bg-white"
    //variantes minicards

    //Estado Pendiente
    if(props.item == "PENDIENTE")
    {
     border_color = "border-yellow-500";
     bg_color = "bg-yellow-500"
    }

    //estados negativos
    if(props.item == "INACTIVO" || props.item == "RECHAZADA" )
    {
     border_color = "border-red-500";
     bg_color = "bg-red-500";
    }

    //estados positivos
    if(props.item == "ACTIVO" || props.item == "ACEPTADA" || props.item == "INICIADO" || props.item == "EN_DESARROLLO")
    {
     border_color = "border-green-500";
     bg_color = "bg-green-500";
    }

    //minicards especiales

    //minicards de aprobacion y estado
    if(props.campo =="Estado")
    {
    return(
        <div>
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 ${border_color} m-1 p-1 rounded-md shadow-xl hover:bg-blue-500 hover:border-blue-500 ${bg_color}`}>
            <span>{props.item}</span>
        </div>
        </div>
    )
    }
    //minicard de fase
    if(props.item == "EN_DESARROLLO")
    {
        return(
        <div>
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 border-yellow-500 bg-yellow-500 m-1 p-1 rounded-md shadow-xl hover:bg-blue-500 hover:border-blue-500`}>
            <span>{props.item}</span>
        </div>
        </div>
        )
    }
    //mincard de terminado
    if(props.item == "TERMINADO")
    {
        return(
        <div>
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 border-indigo-500 bg-indigo-500 m-1 p-1 rounded-md shadow-xl`}>
            <span>{props.item}</span>
        </div>
        </div>
        )
    }
    //minicard de inscripción
    if(props.item == "¡Inscribete Aqui!")
    {
        return(
        <div className="cursor-pointer">
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 bg-green-300 border-green-200 m-1 p-1 rounded-md shadow-xl hover:bg-blue-500 hover:border-blue-500`}
        onClick={() => {
            props.openModal()
            props.setProyectSelected(true)}}>
            <span>{props.item}</span>
        </div>
        </div>
        )
    }

    if(props.item == "¡Inscripción enviada!")
    {
        return(
        <div>
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 bg-green-400 border-green-200 m-1 p-1 rounded-md shadow-xl`}>
            <span>{props.item}</span>
        </div>
        </div>
        )
    }
    //minicards normales
    else{
        return(
        <div>
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 ${border_color} ${bg_color} m-1 p-1 rounded-md shadow-xl`}>
            <span>{props.item}</span>
        </div>
        </div>
        )
    }
}

const ProjectCardLider = (props) => {

    //mutacion backend
    const [crearInscripcion,data,loading,error] = useMutation(CREAR_INSCRIPCION);

    // estado proyecto seleccionado?
    const [proyectselected,setProyectSelected] = useState(false);

    //Definicion del estado de la inscripción
    let inscripcionActual = "¡Inscribete Aqui!";
    props.proyecto.inscripciones.forEach(inscripcion => {
        if(inscripcion.estudiante._id == props.user._id)
        {
            inscripcionActual = inscripcion.estado;
        }
    });;

    const [inscripcion,setInscripcion] = useState(inscripcionActual);

    //efecto del modal de inscripción
    useEffect(() => {
        if(props.acceptTrigger == true && proyectselected == true)
        {
        crearInscripcion({
            variables:{
                proyecto: props.proyecto._id,
                estudiante: props.user._id
            }
        })
        props.setAcceptTrigger(false)
        setProyectSelected(false)
        setInscripcion("¡Inscripción enviada!")
        }
    },[props.acceptTrigger])

    useEffect(() => {
        if(props.cancelTrigger == true && proyectselected == true)
        {
        console.log("Inscripcion anulada!")
        props.setCancelTrigger(false)
        setProyectSelected(false)
        }
    },[props.cancelTrigger])

    return(
        <div className="border-2 border-blue-500 p-5 m-10 rounded-xl shadow-xl max-w-2xl">
            <h1 className="text-center align-top text-2xl  projectCardsFont">{props.proyecto.nombre}</h1>
            <div className="flex flex-wrap justify-center">
            <MiniCard item={props.proyecto.estado} campo={"Estado"}/>
            <MiniCard item={props.proyecto.fase} campo={"Fase"}/>
            <br></br>
            <MiniCard item={props.proyecto.fechaInicio.slice(0,10)} campo={"Fecha Inicio"}/>
            <MiniCard item={props.proyecto.fechaFin.slice(0,10) } campo={"Fecha Fin"}/>
            <MiniCard item={props.proyecto.presupuesto} campo={"Presupuesto"}/>
            <MiniCard item={inscripcion} campo={"Inscipción"} openModal={props.openModal} setProyectSelected={setProyectSelected}/>
            </div>
        </div>
    )
}

export default ProjectCardLider

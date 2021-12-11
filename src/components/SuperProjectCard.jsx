import React, { useEffect,useState } from 'react';
import "styles/JohinyStyles.css";
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
    
    if(props.campo == "Avances")
    {
        return(
            <div className='cursor-pointer' onClick={() => props.navigateAvances(`/app/proyectos/avances/${props.proyectoId}`)}>
            <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
            <div className={`border-2 border-blue-600 m-1 p-1 rounded-md shadow-xl bg-blue-400 hover:bg-blue-500`}>
                <span>{props.item}</span>
            </div>
            </div>
        )
    }
    
    if(props.campo =="Estado")
    {
    return(
        <div>
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 ${border_color} m-1 p-1 rounded-md shadow-xl ${bg_color}`}>
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

const SuperProjectCard = (props) => {

    //mutacion backend

    // estado proyecto seleccionado?
    const [proyectselected,setProyectSelected] = useState(false);

    return(
        <div className="border-2 border-blue-500 p-5 m-10 rounded-xl shadow-xl max-w-2xl">
            <h1 className="text-center align-top text-2xl  projectCardsFont">{props.proyecto.nombre}</h1>
            <div className="flex flex-wrap justify-center">
            <div className="border-2 border-blue-500 p-5 m-10 rounded-xl shadow-xl max-w-2xl">{props.proyecto.objetivos[0].descripcion}</div>
            <MiniCard item={props.proyecto.estado} campo={"Estado"}/>
            <MiniCard item={props.proyecto.fase} campo={"Fase"}/>
            <br></br>
            <MiniCard item={"Ver Avances"} campo ={"Avances"} navigateAvances={props.navigateAvances} proyectoId ={props.proyecto._id}/>
            <MiniCard item={props.proyecto.fechaInicio.slice(0,10)} campo={"Fecha Inicio"}/>
            <MiniCard item={props.proyecto.fechaFin.slice(0,10) } campo={"Fecha Fin"}/>
            <MiniCard item={props.proyecto.presupuesto} campo={"Presupuesto"}/>
            </div>
        </div>
    )
}

export default SuperProjectCard;

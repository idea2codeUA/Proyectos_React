import React, { useEffect,useState } from 'react';
import "styles/JohinyStyles.css";
import { useMutation } from '@apollo/client';
import { MODIFICAR_ESTADO_INSCRIPCION } from 'graphql/Inscripciones/mutations';
const MiniCard = (props) => {

    //minicards de opción
    let border_color = "border-green-500"
    let bg_color = "bg-green-500"
    let estadobuton = "ACEPTADA"
    let mensajenotify ="✔️ Inscripción Aceptada!"

    if(props.item == "Rechazar")
    {
        border_color = "border-red-500"
        bg_color = "bg-red-500"
        estadobuton = "RECHAZADA"
        mensajenotify ="❌ Inscripción Rechazada!"
    }
        return(
        <div className='cursor-pointer'>
        <label className="flex text-center justify-center self-center projectCardsFont font-bold">{props.campo}</label>
        <div className={`border-2 ${border_color} ${bg_color} m-1 p-2 rounded-md shadow-xl hover:bg-blue-500 hover:border-blue-500`} onClick={() => {props.alterInscripcion({
            variables:{
                aprobarInscripcionId: props.inscripcion._id,
                estado : estadobuton
            }}); 
            props.notify(mensajenotify);}}>
            <span>{props.item}</span>
        </div>
        </div>
        )
    }


const InscripcionCard = (props) => {

    //mutacion backend
    const [alterInscripcion,{data,loading,error}] = useMutation(MODIFICAR_ESTADO_INSCRIPCION);

    // estado del card
    const [visible,setVisible] = useState(true);

    // efectos de aceptacion o rechazo
    useEffect(() =>{
        if(data)
        {
            props.notify('✔️ Inscripción Aceptada!')
        if(data.aprobarInscripcion.estado == "ACEPTADA")
        {   
            
            props.notify('✔️ Inscripción Aceptada!')
        }
        if(data.aprobarInscripcion.estado == "RECHAZADA")
        {
            
            props.notify('❎ Inscripción Rechazada!')
        }
    }
    },[data]);

    if(visible == true)
    {
    return(
        <div className="border-2 border-blue-600 p-5 m-10 rounded-xl shadow-xl max-w-2xl">
            <h1 className="text-center align-top text-2xl  projectCardsFont">{`El usuario ${props.inscripcion.estudiante.nombre} ${props.inscripcion.estudiante.apellido} quiere entrar al proyecto `}</h1>
            <br></br>
            <h1 className="text-center align-top text-2xl  projectCardsFont">{props.proyecto.nombre}</h1>
            <div className="flex flex-wrap justify-center">
            <MiniCard item={"Aceptar"} campo={"‎"} alterInscripcion={alterInscripcion} inscripcion={props.inscripcion} notify={props.notify}/>
            <MiniCard item={"Rechazar"} campo={"‎"}alterInscripcion={alterInscripcion} inscripcion={props.inscripcion} notify={props.notify}/>
            </div>
        </div>
    )
    }
    else{
        return null;
    }
}

export default InscripcionCard;

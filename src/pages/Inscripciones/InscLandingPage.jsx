import React from 'react';
import SuperProjectCard from 'components/SuperProjectCard';
import { useLazyQuery,useQuery } from '@apollo/client';
import {GET_PROYECTOS_INSCRITOS_USER} from "graphql/proyectos/queries.js"
import { useUser } from 'context/userContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const InscLandingPage = () => {
    
    const {userData} = useUser();
    let dataQuery = null;

    // la query se hace antes de que el componente obtenga el userdata lo que conlleva a un query erroneo y otro ya bueno
    // intente con useLazyQuery pero no funciono esto esta quebrandome la cabeza 
    const {data,loading,error} = useQuery(GET_PROYECTOS_INSCRITOS_USER,{
        variables:{
            id: userData._id
        }
    })


    // filtra las inscripciones aceptadas, esto seria mejor hacerlo en el backend
        if(data)
        {
        dataQuery = data.UsuarioII.inscripciones.filter(inscripcion => 
            inscripcion.estado == "ACEPTADA")
        console.log(dataQuery)
        }
    
    // funcion de navegacion hacia la pagina de avances
    const navigateAvances = useNavigate();    

        if(loading) return(<div>Cargando...</div>)
    if(dataQuery)
    {
    return (
        <>
        <h1 className="text-center text-3xl font-medium m-4 mt-7 landing_page_title">
            Aquí podras administrar los proyectos a los que te has inscrito</h1>
        <div className="flex flex-wrap justify-center">
        {dataQuery.map(inscripcion => {
            return(
                <SuperProjectCard proyecto={inscripcion.proyecto} navigateAvances={navigateAvances}/>
            )
        })}
        </div>
        </>
    )
}
}

export default InscLandingPage
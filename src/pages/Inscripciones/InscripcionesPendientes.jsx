import React from 'react'
import InscripcionCard from 'components/InscripcionCard';
import { GET_INSCRIPCIONES_BY_LEADER } from 'graphql/Inscripciones/queries';
import { useUser } from 'context/userContext';
import { useMutation, useQuery } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
const InscripcionesPendientes = () => {
    
    //data del usuario
    const {userData} = useUser();

    //query
    const {data,loading,error} = useQuery(GET_INSCRIPCIONES_BY_LEADER,{
        variables:{
            id: userData._id 
        }
    });

    //haciendo la data del query mas manejable
    let queryData = null;
    
    if(data)
    {
     //flitrado de doble profundidad vamonos!!!
    queryData = data.Usuario.proyectosLiderados.map((proyecto) => {
        return ({...proyecto, inscripciones: proyecto.inscripciones.filter(inscripcion => inscripcion.estado == "PENDIENTE")});
    });
    };

    // notificacion de toastify
    const notify = (mensaje) => {toast(mensaje, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })};
    

    if(loading) return <div>Cargando...</div>

    return (
        <>
        <div className="flex flex-wrap justify-center">
            {queryData.map(proyecto => {
                return (
                proyecto.inscripciones.map(inscripcion => {
                    return(
                    <InscripcionCard key={inscripcion._id} proyecto={proyecto} inscripcion={inscripcion} notify={notify}/>
                    )
                })
                )
            })}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />    
        </div>
        </>
    )
}

export default InscripcionesPendientes;

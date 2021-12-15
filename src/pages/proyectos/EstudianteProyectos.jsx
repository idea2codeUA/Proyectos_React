import React from 'react';
import ProjectCardLider from 'components/ProjectCardLider';
import { useQuery } from '@apollo/client';
import { GET_PROYECTOS_INSCRIPCIONES } from 'graphql/proyectos/queries';
import { useEffect } from 'react';
import { useUser } from 'context/userContext';
import ModalJ from 'components/ModalJ';
import { useState } from 'react';

const EstudianteProyectos = () => {
    
    //data del usario logueado
    const {userData} = useUser();
    
    //QUERY proyectos
    const {data,error,loading} = useQuery(GET_PROYECTOS_INSCRIPCIONES);
    


    //estados del modal de Aprobacion
    const [open,setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const [cancelTrigger,setCancelTrigger] = useState(false);
    const [acceptTrigger,setAcceptTrigger] = useState(false);

    if (loading) return <div>Cargando....</div>;

    if(userData.rol == "ESTUDIANTE")
    {
    return (
        <div className="flex flex-wrap justify-center">
        {data.Proyectos.map((proyecto) => {
            return(
            <ProjectCardLider key={proyecto._id} user={userData} proyecto={proyecto} openModal={openModal} acceptTrigger={acceptTrigger} cancelTrigger={cancelTrigger} setAcceptTrigger={setAcceptTrigger} setCancelTrigger={setCancelTrigger}/>
            );
        })}
        <ModalJ open={open} closeModal={closeModal} setAcceptTrigger={setAcceptTrigger} setCancelTrigger={setCancelTrigger} titulo="¿Quieres inscribirte a este proyecto?" textbutton1="¡Si!" textbutton2="No"/>   
        </div>
    )
    }
}

export default EstudianteProyectos;

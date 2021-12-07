import React from 'react';
import ProjectCard from 'components/ProjectCard';
import { useQuery } from '@apollo/client';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { useEffect } from 'react';
import { useUser } from 'context/userContext';
import ModalJ from 'components/ModalJ';
import { useState } from 'react';
const IndexProjectos = () => {
    //QUERY proyectos
    const {data,error,loading} = useQuery(GET_PROYECTOS);
    //data del usario logueado
    const {userData} = useUser();

    //estados del modal
    const [open,setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const [cancelTrigger,setCancelTrigger] = useState(false);
    const [acceptTrigger,setAcceptTrigger] = useState(false);
    if (loading) return <div>Cargando....</div>;

    if(userData.rol == "ADMINISTRADOR")
    {
    return (
        <div className="flex flex-wrap justify-center">
        {data.Proyectos.map((proyecto) => {
            return(
            <ProjectCard key={proyecto._id} proyecto={proyecto} openModal={openModal} acceptTrigger={acceptTrigger} setAcceptTrigger={setAcceptTrigger}/>
            );
        })}
        <ModalJ open={open} closeModal={closeModal} titulo={"¿Quieres aprobar este proyecto?"}
         textbutton1="Aprobar" textbutton2="No Aprobar" setCancelTrigger={setCancelTrigger} setAcceptTrigger={setAcceptTrigger}/>    
        </div>
    )
    }
}

export default IndexProjectos

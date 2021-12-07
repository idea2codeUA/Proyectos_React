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

    //Actualizar infromacion despues de cambiarla

    //estados del modal de Aprobacion
    const [open,setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const [cancelTrigger,setCancelTrigger] = useState(false);
    const [acceptTrigger,setAcceptTrigger] = useState(false);

    //estados del modal de Estado
    const [open2,setOpen2] = useState(false);
    const closeModal2 = () => setOpen2(false);
    const openModal2 = () => setOpen2(true);
    const [cancelTrigger2,setCancelTrigger2] = useState(false);
    const [acceptTrigger2,setAcceptTrigger2] = useState(false);

    //estados del modal de Fase
    const [open3,setOpen3] = useState(false);
    const closeModal3 = () => setOpen3(false);
    const openModal3 = () => setOpen3(true);
    const [cancelTrigger3,setCancelTrigger3] = useState(false);
    const [acceptTrigger3,setAcceptTrigger3] = useState(false);


    if (loading) return <div>Cargando....</div>;

    if(userData.rol == "ADMINISTRADOR")
    {
    return (
        <div className="flex flex-wrap justify-center">
        {data.Proyectos.map((proyecto) => {
            return(
            <ProjectCard key={proyecto._id} proyecto={proyecto} openModal={openModal} openModal2={openModal2} openModal3={openModal3}
            acceptTrigger={acceptTrigger} setAcceptTrigger={setAcceptTrigger} cancelTrigger={cancelTrigger} setCancelTrigger={setCancelTrigger}
            acceptTrigger2={acceptTrigger2} setAcceptTrigger2={setAcceptTrigger2} cancelTrigger2={cancelTrigger2} setCancelTrigger2={setCancelTrigger2}
            acceptTrigger3={acceptTrigger3} setAcceptTrigger3={setAcceptTrigger3}/>
            );
        })}
        <ModalJ open={open} closeModal={closeModal} titulo={"¿Que quieres hacer con este proyecto?"}
         textbutton1="Aprobar" textbutton2="No Aprobar" setCancelTrigger={setCancelTrigger} setAcceptTrigger={setAcceptTrigger}/>
         <ModalJ open={open2} closeModal={closeModal2} titulo={"¿Que quieres hacer con este proyecto?"}
         textbutton1="Activar" textbutton2="Desactivar" setCancelTrigger={setCancelTrigger2} setAcceptTrigger={setAcceptTrigger2}/>
         <ModalJ open={open3} closeModal={closeModal3} titulo={"¿Quieres terminar el proyecto?"}
         textbutton1="Si" textbutton2="No" setCancelTrigger={setCancelTrigger3} setAcceptTrigger={setAcceptTrigger3}/>   
        </div>
    )
    }
}

export default IndexProjectos

import React, { useEffect } from 'react';
import ProjectCard from 'components/ProjectCard';
import { useQuery } from '@apollo/client';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import TableProyecto from 'components/TableProyecto';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { Enum_EstadoProyecto} from 'utils/enums';
import { useState } from 'react';
import { EDIT_PROYECTO } from 'graphql/proyectos/mutations';
import ModalJ from 'components/ModalJ';
import PrivateRoute from 'components/PrivateRoute';



const Proyecto = () => {
    //QUERY proyectos
    const {data,error,loading} = useQuery(GET_PROYECTOS );
    const [editarEstadoProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDIT_PROYECTO); 

  //estados del modal
    const [open,setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const [cancelTrigger,setCancelTrigger] = useState(false);
    const [acceptTrigger,setAcceptTrigger] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los Proyectos');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR']}>
      <div>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Objetivos Generales</th>
              <th>Objetivos Especificos</th>
              <th>Presupuesto</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
                {data.Proyectos.map((p) => {
                  return (
                    <TableProyecto key={p._id} proyecto={p} options={Enum_EstadoProyecto} 
                    cancelTrigger={cancelTrigger} setCancelTrigger={setCancelTrigger} acceptTrigger={acceptTrigger} setAcceptTrigger={setAcceptTrigger}
                     open={open} openModal={openModal} closeModal={closeModal} backendAction={editarEstadoProyecto} />
                  );
                })}
          </tbody>
        </table>
        <ModalJ open={open} closeModal={closeModal} titulo={"¿Autorizas al proyecto?"} textbutton1={"Aceptar"} textbutton2={"Cancelar"}
        setCancelTrigger={setCancelTrigger} setAcceptTrigger ={setAcceptTrigger}/>
      </div>
    </PrivateRoute>
  );
};

export default Proyecto;
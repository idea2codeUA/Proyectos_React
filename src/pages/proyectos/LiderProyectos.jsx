import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import TableProyecto from 'components/TableProyecto';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { EDIT_PROYECTO } from 'graphql/proyectos/mutations';
import PrivateRoute from 'components/PrivateRoute';
import { GET_PROYECTOS_LIDERADOS_USER } from 'graphql/proyectos/queries';
import { useUser } from 'context/userContext';

const LiderProyectos = () => {

    //data del usuario
    const {userData} = useUser();

    //query proyectos liderados por el usuario
    const {data,loading,error} = useQuery(GET_PROYECTOS_LIDERADOS_USER,{
        variables:{
            id: userData._id
        }
    });
    
    const [editarEstadoProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDIT_PROYECTO); 

    
    useEffect(() => {
        if (error) {
            toast.error('Error consultando los Proyectos');
        }
    }, [error]);
    
    //haciendo la data del query mas manejable
    let queryData = null;
      if(data)
      {
          queryData = data.Usuario.proyectosLiderados;
          console.log(queryData)
      }

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['LIDER']}>
      <div className='flex flex-col'>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Objetivos Generales</th>
              <th>Objetivos Especificos</th>
              <th>Presupuesto</th>
              <th>Estado</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
                {queryData.map((p) => {
                  return (
                    <TableProyecto key={p._id} proyecto={p} backendAction={editarEstadoProyecto} />
                  );
                })}
          </tbody>
        </table>
        <button className=' text-white cursor-pointer max-w-xs bg-blue-600 self-end p-3 mt-1 mr-3 font-bold hover:bg-blue-700 hover:border-blue-600 rounded-lg'>Crear Nuevo Proyecto</button>
      </div>
    </PrivateRoute>
  );
};

export default LiderProyectos;
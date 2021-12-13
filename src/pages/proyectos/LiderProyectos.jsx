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
      <div>
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
      </div>
    </PrivateRoute>
  );
};

export default LiderProyectos;
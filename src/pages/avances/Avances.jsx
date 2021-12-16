import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_AVANCES_PROYECTO } from 'graphql/Avances/queries';
import { useState } from 'react';
import TableRowAvance from 'components/TableRowAvance';
import { useUser } from 'context/userContext';
import { useNavigate, useParams } from 'react-router-dom'
import { EDITAR_AVANCE } from 'graphql/Avances/mutations';

const Avances = () => {

  const navigate = useNavigate();

  let queryData = null;
  // utiliza los parametros de la url para obtner el id del proyecto
  const {_id} = useParams()

  //data del usuario
  const {userData} = useUser();

  //trae los avances del backend
  const {data,loading,error} = useQuery(GET_AVANCES_PROYECTO,{
    variables:{
      idProyecto: _id 
    },pollInterval: 3000
  });

  //mutacion para ediatar avance
  const [editAvance,{data: avanceData, loading : loadingData, error: errorData}] = useMutation(EDITAR_AVANCE);

  // pone los datos en una variable mas manejable
  if(data)
  {
    queryData = data.filtrarAvance;
  }

  //estados del modal
    const [open,setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const [cancelTrigger,setCancelTrigger] = useState(false);
    const [acceptTrigger,setAcceptTrigger] = useState(false);

  if (loading) return <div>Cargando....</div>;

      if(data)
      {
      return (
          <div className='flex flex-col'>
            <table className='tabla'>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Creado Por</th>
                  <th>Observaciones</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { queryData.map((avance) => {
                  return(
                  <TableRowAvance avance={avance} editAvance={editAvance} proyectoId={_id}/>
                  )
                  })} 
              </tbody>
            </table>
            <button className=' text-white cursor-pointer max-w-xs bg-blue-600 self-end p-3 mt-1 mr-3 font-bold hover:bg-blue-700 hover:border-blue-600 rounded-lg' onClick={() => {
              navigate(`/app/proyectos/avances/crear/${_id}`)
            }}>Crear Avance</button>
          </div>
      );
    };
  }  


export default Avances;

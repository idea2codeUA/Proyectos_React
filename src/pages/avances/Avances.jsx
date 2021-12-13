import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CREAR_AVANCE } from 'graphql/Avances/mutations';
import { EDITAR_AVANCE } from 'graphql/Avances/mutations';
import { GET_AVANCES_PROYECTO } from 'graphql/Avances/queries';
import { toast } from 'react-toastify';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { useState } from 'react';
import TableRowAvance from 'components/TableRowAvance';
import { useUser } from 'context/userContext';
import { useParams } from 'react-router-dom'

const Avances = () => {

  let queryData = null;
  // utiliza los parametros de la url para obtner el id del proyecto
  const {_id} = useParams()

  //data del usuario
  const {userData} = useUser();

  //trae los avances del backend
  const {data,loading,error} = useQuery(GET_AVANCES_PROYECTO,{
    variables:{
      idProyecto: _id 
    }
  });

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
                  <TableRowAvance avance={avance}/>
                  )
                  })} 
              </tbody>
            </table>
            <button className=' text-white cursor-pointer max-w-xs bg-blue-600 self-end p-3 mt-1 mr-3 font-bold hover:bg-blue-700 hover:border-blue-600 rounded-lg'>Crear Avance</button>
          </div>
      );
    };
  }  


export default Avances;

import React, { useEffect,useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AVANCES_PROYECTO } from 'graphql/Avances/queries';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import "styles/JohinyStyles.css";
import { CREAR_AVANCE } from 'graphql/Avances/mutations';
import { useUser } from 'context/userContext';

const CrearAvance = () => {

  // hooks utiles
    const { _id } = useParams();
    const {userData} = useUser();
    const navigate = useNavigate();
  
    const [crearAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_AVANCE);


      useEffect(() => {
        if (mutationData) {
          toast.success('Avance enviado correctamente');
          navigate(`/app/proyectos/avances/${_id}`)
        }
      }, [mutationData]);
    
      useEffect(() => {
        if (mutationError) {
          toast.error('Error creando el avance');
        }
      }, [mutationError]);

      // estados de fecha y descripcion
      const [fechaState,setFechaState] = useState(null);
      const [descripcionState,setDescripcionState] = useState("")

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to={`/app/proyectos/avances/${_id}`}>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Crear Avance</h1>
    
      <div className="flex flex-col items-center justify-center">
        <label className='font-bold'>Fecha:</label>
        <input type="date" className=' p-5 ring-2 ring-blue-500 rounded-xl m-2' onChange={e => {
          setFechaState(e.target.value);
        }}/>
        <label className='font-bold'>Descripción</label>
        <textarea rows={4} className=' outline-none ring-2 ring-blue-500 rounded-md w-full m-2' onChange={e => {
          setDescripcionState(e.target.value);
        }}></textarea>
        <button className='p-5 text-black bg-blue-500 hover:bg-blue-600 hover:text-white rounded-md font-bold' onClick={() => {
          crearAvance({
            variables:{
              fecha: fechaState,
              descripcion: descripcionState,
              proyecto: _id,
              creadoPor: userData._id
            }
          })
        }}>Enviar Avance</button>
       </div> 
    </div>
  );
};

export default CrearAvance;
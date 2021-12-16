import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AVANCES_PROYECTO } from 'graphql/Avances/queries';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import "styles/JohinyStyles.css";
import { EDITAR_AVANCE } from 'graphql/Avances/mutations';

const EditarAvance = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
  
    const {
      data: queryData,
      error: queryError,
      loading: queryLoading,
    } = useQuery(GET_AVANCES_PROYECTO, {
      variables: { _id },
    })

    const [editarAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_AVANCE);

    /* Pendiente de modificar
    const submitForm = (e) => {
        e.preventDefault();
        delete formData.rol;
        editarAvance({
          variables: { _id,rol: queryData.Usuario.rol,estado:queryData.Usuario.estado, ...formData },
        });
      };
    */

      useEffect(() => {
        if (mutationData) {
          toast.success('Avance modificado correctamente');
        }
      }, [mutationData]);
    
      useEffect(() => {
        if (mutationError) {
          toast.error('Error modificando el avance');
        }
    
        if (queryError) {
          toast.error('Error consultando el avance');
        }
      }, [queryError, mutationError]);
    
      if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/app/proyectos/avances'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Avance</h1>
    
      <div className="flex flex-row items-center">
        <Input
          label='Fecha:'
          type='date'
          name='fecha'
        //  defaultValue={queryData.Usuario.nombre}
          required={true}
          labelstyle = "flex flex-col my-3 mx-16"
          inputstyle = "inputj"
        />
           <Input
          label='Creado Por:'
          type='text'
          name='creadopor'
        //  defaultValue={queryData.Usuario.correo}
          required={true}
          labelstyle = "flex flex-col my-3 mx-16"
          inputstyle = "inputj"
        />
       
        </div>
        <div className="flex flex-row items-center">
     
         <Input
          label='Descripción:'
          type='text'
          name='descripcion'
       //   defaultValue={queryData.Usuario.apellido}
          required={true}
          labelstyle = "flex flex-col my-3 mx-16"
          inputstyle = "inputj"
        />
         <Input
          label='Observaciones:'
          type='text'
          name='observaciones'
       //   defaultValue={queryData.Usuario.apellido}
          required={true}
          labelstyle = "flex flex-col my-3 mx-16"
          inputstyle = "inputj"
        />
        </div>
    </div>
  );
};

export default EditarAvance;
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTO } from 'graphql/proyectos/queries';

import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDIT_PROYECTO } from 'graphql/proyectos/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoProyecto } from 'utils/enums';


const EditarProyecto = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id} = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });


  const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDIT_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: { _id,estado: queryData.Proyecto.estado,...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el Proyecto');
    }

    if (queryError) {
      toast.error('Error consultando el Proyecto');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/app/proyecto'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Proyecto</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre:'
          type='text'
          name='nombre'
          defaultValue={queryData.Proyecto.nombre}
          required={true}
          labelstyle = "flex flex-col my-3"
          inputstyle = "inputDaniel"
        />
        <Input
          label='Objetivos Generales:'
          type='text'
          name='objetivos'
          defaultValue={queryData.Proyecto.objetivos.tipo}
          required={true}
          labelstyle = "flex flex-col my-3"
          inputstyle = "inputDaniel"
        />
        <Input
          label='Objetivos Especificos:'
          type='text'
          name='objetivos'
          defaultValue={queryData.Proyecto.objetivos.id}
          required={true}
          labelstyle = "flex flex-col my-3"
          inputstyle = "inputDaniel"
        />
        <Input
          label='Presupuesto:'
          type='text'
          name='presupuesto'
          defaultValue={queryData.Proyecto.presupuesto}
          required={true}
          labelstyle = "flex flex-col my-3"
          inputstyle = "inputDaniel"
        />
        <DropDown
          label='Estado:'
          name='estado'
          defaultValue={queryData.Proyecto.estado}
          required={true}
          options={Enum_EstadoProyecto}
        />
        <span>Estado: {queryData.Proyecto.estado}</span>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};

export default EditarProyecto;

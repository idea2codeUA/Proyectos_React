import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { REGISTRO_PROYECTO } from 'graphql/proyectos/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import "styles/JohinyStyles.css";
import { useUser } from 'context/userContext';


const RegistrarProyecto = () => {

const {userData} = useUser();  
const navigate = useNavigate();

const { form, formData, updateFormData } = useFormData(null);

const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
  useMutation(REGISTRO_PROYECTO);

const submitForm = (e) => {
  e.preventDefault();
  registro({ variables: {...formData,
    presupuesto: parseFloat(formData.presupuestoString),
    estado: "INACTIVO",
   fase: "PENDIENTE",
   lider: userData._id} });
};

useEffect(() => {
  if (dataMutation) {
    if (dataMutation) {
      navigate(`objetivos/${dataMutation.crearProyecto._id}`)
    }
  }
}, [dataMutation]);


  return (

    <div className='flex'>
   
<div className='flex flex-col h-full w-full items-center justify-center mt-64'>
      <h1 className='text-3xl font-bold my-4 mr-20'>Regístrar Nuevo Proyecto</h1>
      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form} id="registroProyectoForm">
        <div className='grid grid-cols-2 gap-5'>
          <Input label='Nombre Del Proyecto:' name='nombre' type='text' required labelstyle = "flex flex-col my-3 mx-16 ml-2" inputstyle={"p-2 ring-2 ring-blue-500 rounded-lg ml-1 outline-none"} className="p-4 ring-2 ring-blue-500" />
          <Input label='Presupuesto:' name='presupuestoString' type="number" required labelstyle = "flex flex-col my-3 mx-16 ml-2"    inputstyle={"p-2 ring-2 ring-blue-500 rounded-lg ml-1 outline-none"}/>
          <Input label='Fecha de Inicio:' name='fechaInicio' type='date' required labelstyle = "flex flex-col my-3 mx-16 ml-2" inputstyle={"p-2 ring-2 ring-blue-500 rounded-lg ml-1 outline-none"} />
          <Input label='Fecha de Fin:' name='fechaFin' type='date' required labelstyle = "flex flex-col my-3 mx-16 ml-2" inputstyle={"p-2 ring-2 ring-blue-500 rounded-lg ml-1 outline-none"} />
          </div>
      </form>
      <div className='flex mr-14'>
        <ButtonLoading
          form= "registroProyectoForm"
          disabled={Object.keys.length === 0}
          loading={loadingMutation}
          text='Registrar Proyecto'
        />
        </div>
      </div>
    </div>

);
};

export default RegistrarProyecto;

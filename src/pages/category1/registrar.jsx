import React, { useEffect } from 'react';
import Input from 'components/Input';
import { Enum_Usuarios} from 'utils/enums';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import { REGISTROPROYECTO } from 'graphql/RegistroProyecto/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useProyectos } from 'context/proyectoregistro';
import "styles/JohinyStyles.css";


const Registrar = () => {
const { setToken } = useProyectos();
const navigate = useNavigate();
const { form, formData, updateFormData } = useFormData();

const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
  useMutation(REGISTROPROYECTO);

const submitForm = (e) => {
  e.preventDefault();
  registro({ variables: formData });
};

useEffect(() => {
  if (dataMutation) {
    if (dataMutation.definirToken.token) {
      setToken(dataMutation.definirToken.token);
      navigate('/');
    }
  }
}, [dataMutation, setToken, navigate]);


  return (

    <div className='Registro'>
   
<div className='flex flex-col h-full w-full items-center justify-center'>
      <h1 className='text-3xl font-bold my-4'>Regístrar Nuevo Proyecto</h1>
      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}/>
        <div className='grid grid-cols-2 gap-5'>
          <Input label='Nombre Del Proyecto:' name='nombre del proyecto' type='text' required />
          <Input label='ID proyecto:' name='ID' type='text' required />
          <DropDown label='Usuario quien Registra:' name='Usuario' type='text' required={true} options={Enum_Usuarios} />
          
          <Input label='Fecha de Inicio:' name='Fecha' type='date' required />
          <Input label='Presupuesto:' name='Presupuesto'  required />
          <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-1000">
                      Descripcion 
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Descripcion"
                        defaultValue={''}
                      />
                    </div>
        </div>
        <ButtonLoading
        class="transition ease-in-out duration-700"
          disabled={Object.keys.length === 0}
          loading={false}
          text='Registrar Proyecto'
        />
     
  
      </div>
    </div>
    </div>

);
};

export default Registrar;

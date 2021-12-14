import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import { toast } from 'react-toastify';
import { EDIT_PROYECTO } from 'graphql/proyectos/mutations';
import DropDown from 'components/Dropdown';
import { useUser } from 'context/userContext';
import { EDITAR_OBJETIVO } from 'graphql/Objetivos/mutations';
import { EDITAR_AVANCE } from 'graphql/Avances/mutations';

// componentes reactivos

const ObjetiveRow = (props) => {

  // valores originales
  const tipoOriginal = props.objetivo.tipo;
  const descripcionOriginal = props.objetivo.descripcion;

  const [editMode,setEditMode] = useState(false);
  const [tipostate,setTipoState] = useState(tipoOriginal);
  const [descripcionstate,setdescripcionState] = useState(descripcionOriginal);
  if(editMode == false)
  {
  return(
  <tr>
  <td>{tipostate}</td>
  <td>{descripcionstate}</td>
  <td><i className="fas fa-pencil-alt ml-2 p-2 bg-blue-600 rounded-full hover:text-white cursor-pointer self-end" onClick={() => setEditMode(true)}></i></td>
  </tr>
  )
  }
  else{
    return(
      <tr>
        <td><select className='w-full outline-none ring-2 ring-blue-500 rounded-sm' defaultValue={tipostate}  onChange={(e) => {setTipoState(e.target.value)}}>
        <option value={"GENERAL"}>GENERAL</option>
        <option value={"ESPECIFICO"}>ESPECIFICO</option>
        </select></td>
        <td><input className='w-full outline-none ring-2  ring-blue-500 rounded-sm' defaultValue={descripcionstate} onChange={(e) => {setdescripcionState(e.target.value)}}></input></td>
      <td className='flex flex-row'><i className="fas fa-save m-2 p-2 bg-blue-600 rounded-full hover:text-white cursor-pointer self-end" onClick={() => {props.editarObjetivo({
        variables : {
          idProyecto : props.Proyectoid,
          indexObjetivo: props.indexObjetivo,
          campos: {
            descripcion: descripcionstate,
            tipo: tipostate
          }
        }
      });
      console.log(props.indexObjetivo)
      setEditMode(false)}}></i>
      <i className="fas fa-times m-2 p-2 bg-red-600 rounded-full hover:text-white cursor-pointer self-end" onClick={() => {
        setEditMode(false)
        setTipoState(tipoOriginal)
        setdescripcionState(descripcionOriginal)}}></i></td>
      </tr>
    )
  }
}

const TituloReactivo = (props) =>{

  let originalNombreProyecto = props.Proyecto.nombre;
  const [editMode,setEditMode] = useState(false);
  const [nombreProyecto,setNombreProyecto] = useState(originalNombreProyecto);
  if(editMode == false)
  {
  return(
  <><h1 className='m-4 text-3xl text-gray-800 font-bold'>{nombreProyecto}</h1>
  <i className="fas fa-pencil-alt p-4 bg-blue-600 rounded-full hover:text-white cursor-pointer" onClick={() => setEditMode(true)}></i></>
  )
}
else{
  return(
    <><input defaultValue={nombreProyecto} onChange={(e) => {setNombreProyecto(e.target.value)}} className='m-4 text-3xl text-gray-800 font-bold ring-2 ring-blue-500'></input>
  <i className="fas fa-save p-2 bg-blue-600 rounded-full hover:text-white cursor-pointer" onClick={() => {props.editarProyecto({
    variables: {
      id: props.Proyecto._id,
      nombre: nombreProyecto,
      presupuesto: props.Proyecto.presupuesto,
      fechaInicio: props.Proyecto.fechaInicio,
      fechaFin: props.Proyecto.fechaFin,
      estado : props.Proyecto.estado,
      fase: props.Proyecto.fase,
      lider: props.user._id,
    }
  });
  setEditMode(false)}}></i>
  <i className="fas fa-times m-2 p-2 bg-red-600 rounded-full hover:text-white cursor-pointer self-end" onClick={() => {
    setEditMode(false)
  setNombreProyecto(originalNombreProyecto)}}></i></>
  )
}
}

const PresupuestoReactivo = (props) =>{

  let originalPresupuesto = props.Proyecto.presupuesto;
  const [editMode,setEditMode] = useState(false);
  const [presupuestoProyecto,setPresupuestoProyecto] = useState(originalPresupuesto);
  if(editMode == false)
  {
  return(
  <><h1 className='ml-10 self-end text-2xl text-gray-800 font-bold'>Presupuesto de : {presupuestoProyecto}</h1>
  <i className="fas fa-pencil-alt ml-2 p-2 bg-blue-600 rounded-full hover:text-white cursor-pointer self-end" onClick={() => setEditMode(true)}></i></>
  )
}
else{
  return(
    <><input defaultValue={presupuestoProyecto} onChange={(e) => {setPresupuestoProyecto(e.target.value)}} className=' text-2xl text-gray-800 font-bold w-36 ring-2 ring-blue-500'></input>
  <i className="fas fa-save p-2 bg-blue-600 rounded-full hover:text-white cursor-pointer" onClick={() => {props.editarProyecto({
    variables: {
      id: props.Proyecto._id,
      nombre: props.Proyecto.nombre,
      presupuesto: parseFloat(presupuestoProyecto),
      fechaInicio: props.Proyecto.fechaInicio,
      fechaFin: props.Proyecto.fechaFin,
      estado : props.Proyecto.estado,
      fase: props.Proyecto.fase,
      lider: props.user._id,
    }
  });
  setEditMode(false)}}></i>
  <i className="fas fa-times m-2 p-2 bg-red-600 rounded-full hover:text-white cursor-pointer self-end" onClick={() => setEditMode(false)}></i></>
  )
}
}

const AvanceRow = (props) => {

  // valores originales
  const observacionOriginal = props.avance.observaciones;
  

  const [editMode,setEditMode] = useState(false);
  const [observacionState,setObservacionState] = useState(observacionOriginal);

  if(editMode == false)
  {
  return(
  <tr>
  <td>{props.avance.fecha.slice(0,10)}</td>
  <td>{props.avance.descripcion}</td>
  <td>{`${props.avance.creadoPor.nombre} ${props.avance.creadoPor.apellido}`}</td>
  <td>{observacionState}</td>
  <td><button className=" ml-2 p-2 text-black bg-blue-500 rounded-full hover:text-white hover:bg-blue-600 font-semibold cursor-pointer self-end" onClick={() => setEditMode(true)}>Edita o Añade observaciones aqui</button></td>
  </tr>
  )
  }
  else{
    return(
      <tr>
        <td>{props.avance.fecha.slice(0,10)}</td>
        <td>{props.avance.descripcion}</td>
        <td>{`${props.avance.creadoPor.nombre} ${props.avance.creadoPor.apellido}`}</td>
        <td><input defaultValue={observacionState} onChange={e => setObservacionState(e.target.value)} className='w-full h-16 outline-none ring-2  ring-blue-500 rounded-sm'></input></td>
        <td className='flex flex-row'><i className="fas fa-save m-2 p-2 bg-blue-600 rounded-full hover:text-white cursor-pointer self-end" onClick={() => {props.editarObservaciones({
          variables: {
            id: props.avance._id,
            fecha: props.avance.fecha,
            descripcion: props.avance.descripcion,
            observaciones: observacionState,
            proyecto: props.Proyectoid,
            creadoPor: props.avance.creadoPor._id
          }
        });
        setEditMode(false)}}></i>
      <i className="fas fa-times m-2 p-2 bg-red-600 rounded-full hover:text-white cursor-pointer self-end" onClick={() => {
        setEditMode(false)
        setObservacionState(observacionOriginal)}}></i></td>
      </tr>
    )
  }
}
    


// componente principal

const EditarProyecto = () => {

  const {userData} = useUser();
  console.log(userData)
  const  {_id }= useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { id:_id },
  });

  // mutacion para editar el nombre y presupuesto
  const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDIT_PROYECTO);

  // mutacion para editar objetivos
  const [editarObjetivo, { data: objetiveData, loading: objetiveLoading, error: objetiveError }] =
    useMutation(EDITAR_OBJETIVO);

  // mutacion para añadir observaciones al avance
  const [editarObservaciones, { data: observationData, loading: observationLoading, error: observationError }] =
  useMutation(EDITAR_AVANCE);

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto modificado correctamente');
    }
    if(objetiveData) {
      toast.success('Objetivo modificado correctamente');
    }
    if(observationData) {
      toast.success('Observaciones modificadas correctamente');
    }
  }, [mutationData,objetiveData,observationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el Proyecto');
    }

    if (queryError) {
      toast.error('Error consultando el Proyecto');
    }

    if(objetiveError)
    {
      toast.error('Error editando el Objetivo');
    }
    if(observationError)
    {
      toast.error('Error modificando las observaciones');
    }
  }, [queryError, mutationError,objetiveError,observationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-row items-center justify-center ml-32 mb-5'>
      <Link to='/app/proyectos_lider'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900 justify-start p-5' />
      </Link>
      <TituloReactivo Proyecto={queryData.Proyecto} editarProyecto={editarProyecto} user={userData}/>
      <PresupuestoReactivo Proyecto={queryData.Proyecto} editarProyecto={editarProyecto} user={userData}/>
      </div>
      <div className='flex flex-row'>
        <div className='w-full'>
        <h1 className='font-bold'>Objetivos</h1>
        <table className='tabla'>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {queryData.Proyecto.objetivos.map(objetivo => {
                    return(
                      <ObjetiveRow key={objetivo._id} Proyectoid={queryData.Proyecto._id} objetivo={objetivo} indexObjetivo={queryData.Proyecto.objetivos.findIndex(item => item._id === objetivo._id )} editarObjetivo={editarObjetivo}/>
                    )
                })}
              </tbody>
              </table>
              </div>
              <div className='w-full'>
        <h1 className='font-bold'>Avances</h1>
        <table className='tabla'>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Creado Por</th>
                  <th>Observaciones</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {queryData.Proyecto.avances.map(avance => {
                  return(
                    <AvanceRow key={avance._id} avance={avance} Proyectoid={queryData.Proyecto._id} editarObservaciones={editarObservaciones}/>
                  )
                })}
              </tbody>
              </table>
              </div>
      </div>
    </div>
  );
};

export default EditarProyecto;

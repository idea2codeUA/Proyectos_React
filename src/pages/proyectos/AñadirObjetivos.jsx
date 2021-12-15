import React from 'react'
import { useState,useEffect } from 'react';
import { useQuery, useMutation,useLazyQuery } from '@apollo/client';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import { useParams } from 'react-router-dom';
import { EDITAR_OBJETIVO } from 'graphql/Objetivos/mutations';
import { CREAR_OBJETIVO } from 'graphql/Objetivos/mutations';
import { EDIT_PROYECTO } from 'graphql/proyectos/mutations';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
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
              tipo: tipostate,
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

const AñadirObjetivos = () => {
    
    const {_id} = useParams();
    const navigate = useNavigate();

    //query proyecto
    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_PROYECTO, {
        variables: { id:_id },
        },);

    //mutacion para editar objetivos
    const [editarObjetivo, { data: editObjetiveData, loading: editObjetiveLoading, error: editObjetiveError }] =
    useMutation(EDITAR_OBJETIVO);

    //mutacion para agregar objetivos al proyecto
    const [editProyecto,{data: projectData,loading: projectLoading, error: projectError}] = useMutation(EDIT_PROYECTO);

    //array de objetivos
    const [objetivos,setObjetivos] = useState([])
    

    // estados de entry objetivo
    const [tipoState,setTipoState] = useState("GENERAL")
    const [descripcionState,setDescripcionState] = useState("")

    //efectos de las queries/mutaciones
    

    useEffect(() => {
        if(projectData)
        {
            navigate(`/app/proyectos_lider`)
        }
    },[projectData])

    if(queryLoading) return(<div>Cargando...</div>)

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='m-4 text-3xl text-gray-800 font-bold'>Añade al menos 1 objetivo GENERAL y 2 ESPECIFICOS para terminar el proceso de cración</h1>
            <div className='flex flex-col w-72'>
            <select className='w-full outline-none ring-2 ring-blue-500 rounded-sm' defaultValue={tipoState}  onChange={(e) => {setTipoState(e.target.value)}}>
        <option value={"GENERAL"}>GENERAL</option>
        <option value={"ESPECIFICO"}>ESPECIFICO</option>
        </select>
        <textarea className='w-full outline-none ring-2  ring-blue-500 rounded-sm mb-5' defaultValue={descripcionState} onChange={(e) => {setDescripcionState(e.target.value)}}></textarea>
        <button className="p-4 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg text-center mb-5" onClick={() => {setObjetivos([...objetivos,{
            tipo: tipoState,
            descripcion: descripcionState
        }])}}>Añadir Objetivo</button>
            </div>
            <table className='tabla'>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {objetivos.map(objetivo => {
                    return(
                      <ObjetiveRow key={nanoid()} Proyectoid={queryData.Proyecto._id} objetivo={objetivo} indexObjetivo={queryData.Proyecto.objetivos.findIndex(item => item._id === objetivo._id )} editarObjetivo={editarObjetivo}/>
                    )
                })}
              </tbody>
              </table>
              <button className="p-4 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg text-center mt-5" onClick={() => {
                  editProyecto({
                    variables:{
                        id: queryData.Proyecto._id,
                        nombre: queryData.Proyecto.nombre,
                        presupuesto: queryData.Proyecto.presupuesto,
                        fechaInicio: queryData.Proyecto.fechaInicio,
                        fechaFin: queryData.Proyecto.fechaFin,
                        estado: queryData.Proyecto.estado,
                        fase: queryData.Proyecto.fase,
                        lider: _id,
                        objetivos: objetivos
              }})}}>Agragar Objetivos al Proyecto</button>
        </div>
    )
}

export default AñadirObjetivos

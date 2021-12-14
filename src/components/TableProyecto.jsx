import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DropdownJ from './DropdownJ'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'

// componente de objetivos especificos
const ObjetivosEspecificosMostrados = (props) => {
  return(
  <>
  <button className=' text-white cursor-pointer bg-blue-500 hover:bg-blue-700 hover:text-white py-1 px-6 w-full font-bold' onClick={() => props.setVerObjetivosEspecificos(false)}>Ocultar Objetivos Especificos</button>
  {props.objetivosespecificos.map(objetivo => {
    return(
      <h1 key={objetivo._id}>{`⚫ ${objetivo.descripcion}`}</h1>
    )
  })}
  </>
  )
}

const TableProyecto = (props) => {
  
  // funcion de redireccion
  const navigate = useNavigate();
  //filtrado de objetivos especificos
  const objetivosfiltrados = props.proyecto.objetivos.filter(objetivo => objetivo.tipo == "ESPECIFICO");
  
  // ver o ocultar objetivos especificos
  const [verObjetivosEspecificos,setVerObjetivosEspecificos] = useState(false);
  const objetivosNoVisibles = <button className=' text-white cursor-pointer bg-blue-500 hover:bg-blue-700 hover:text-white p-3 px-6 w-full font-bold' onClick={() => setVerObjetivosEspecificos(true)}>Ver Objetivos Especificos</button>
  const objetivosVisibles = <ObjetivosEspecificosMostrados objetivosespecificos ={objetivosfiltrados} setVerObjetivosEspecificos={setVerObjetivosEspecificos}/>

  const [objetivosEspecificos,setObjetivosEspecificos] = useState(objetivosNoVisibles)

  useEffect(() => {
    if(verObjetivosEspecificos == true)
    {
      setObjetivosEspecificos(objetivosVisibles)
    }
    else{
      setObjetivosEspecificos(objetivosNoVisibles)
    }
  },[verObjetivosEspecificos])

    return (
        <tr key={props.proyecto._id}>
        <td>{props.proyecto.nombre}</td>
        <td>{props.proyecto.objetivos[0].descripcion}</td>
        <td>{objetivosEspecificos}</td>
        <td>{props.proyecto.presupuesto}</td>
        <td>{props.proyecto.estado}</td>
        <td>{props.proyecto.fechaInicio.slice(0,10)}</td>
        <td>{props.proyecto.fechaFin.slice(0,10)}</td>
        <td><button className=' text-gray-900 cursor-pointer bg-yellow-500 hover:bg-yellow-700 hover:text-white p-6 w-full h-full font-bold' onClick={() => navigate(`editar/${props.proyecto._id}`)}>Ver o Editar Detalles</button></td>
      </tr>
    )
}

export default TableProyecto

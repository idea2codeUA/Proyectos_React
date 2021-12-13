import React from 'react'
import { Link } from 'react-router-dom'
import DropdownJ from './DropdownJ'
import { nanoid } from 'nanoid'
const TableProyecto = (props) => {
    return (
        <tr key={props.proyecto._id}>
        <td>{props.proyecto.nombre}</td>
        <td>{props.proyecto.objetivos.tipo}</td>
        <td>{props.proyecto.objetivos.descripcion}</td>
        <td>{props.proyecto.presupuesto}</td>
       
        <td><DropdownJ proyecto={props.proyecto} options={props.options} defaultValue={props.proyecto.estado} 
        name={"estado"} openModal={props.openModal} open = {props.open} closeModal = {props.closeModal}
        cancelTrigger={props.cancelTrigger} setCancelTrigger={props.setCancelTrigger}
        acceptTrigger={props.acceptTrigger} setAcceptTrigger={props.setAcceptTrigger} modalTitulo={props.modalTitulo}
        backendAction={props.backendAction}
        className="border-2 border-blue-500 p-1 px-7"/></td>
        <td>
          <Link to={`editarproyecto/${props.proyecto._id}`}>
            <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
          </Link>
        </td>
      </tr>
    )
}

export default TableProyecto

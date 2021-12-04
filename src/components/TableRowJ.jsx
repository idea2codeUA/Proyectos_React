import React from 'react'
import { Link } from 'react-router-dom'
import DropdownJ from './DropdownJ'
import { nanoid } from 'nanoid'
const TableRowJ = (props) => {
    return (
        <tr key={props.user._id}>
        <td>{props.user.nombre}</td>
        <td>{props.user.apellido}</td>
        <td>{props.user.correo}</td>
        <td>{props.user.identificacion}</td>
        <td>{props.Enum_Rol[props.user.rol]}</td>
        <td><DropdownJ user={props.user} options={props.options} defaultValue={props.user.estado} 
        name={"estado"} openModal={props.openModal} open = {props.open} closeModal = {props.closeModal}
        cancelTrigger={props.cancelTrigger} setCancelTrigger={props.setCancelTrigger}
        acceptTrigger={props.acceptTrigger} setAcceptTrigger={props.setAcceptTrigger} modalTitulo={props.modalTitulo}
        backendAction={props.backendAction}
        className="border-2 border-blue-500 p-1 px-7"/></td>
        <td>
          <Link to={`editarusuario/${props.user._id}`}>
            <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
          </Link>
        </td>
      </tr>
    )
}

export default TableRowJ

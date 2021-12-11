import React from 'react'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
const TableRowAvance = (props) => {
    return (
      <tr>
        <td>Nombre Proyecto</td>
        <td>Texto</td>
        <td>
          <Link to={`editarusuario/${props.user._id}`}>
            <i className='fas fa-file-upload text-yellow-600 hover:text-yellow-400 cursor-pointer' />
          </Link>
        </td>
      </tr>
    )
}

export default TableRowAvance;

/*
<td><DropdownJ user={props.user} options={props.options} defaultValue={props.user.estado} 
name={"estado"} openModal={props.openModal} open = {props.open} closeModal = {props.closeModal}
cancelTrigger={props.cancelTrigger} setCancelTrigger={props.setCancelTrigger}
acceptTrigger={props.acceptTrigger} setAcceptTrigger={props.setAcceptTrigger} modalTitulo={props.modalTitulo}
backendAction={props.backendAction}
className="border-2 border-blue-500 p-1 px-7"/></td>
*/
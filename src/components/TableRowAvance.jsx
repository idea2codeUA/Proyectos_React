import React from 'react'
import { Link } from 'react-router-dom'
const TableRowAvance = (props) => {
    return (
        <tr>
            <td>{props.avance.descripcion}</td>
            <td>{props.avance.fecha}</td>
            <td>{`${props.avance.creadoPor.nombre} ${props.avance.creadoPor.apellido}`}</td>
            <td>{props.avance.observaciones}</td>
            <td><button className='fas fa-pencil-alt text-gray-900 cursor-pointer bg-yellow-500 hover:bg-yellow-700 hover:text-white p-3 px-6 w-full font-bold'></button></td>
        </tr>      
    )
}

export default TableRowAvance;
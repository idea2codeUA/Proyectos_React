import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const TableRowAvance = (props) => {
    
    const originalDescripcion = props.avance.descripcion
    const [descripcionState,setDescripcionState] = useState(originalDescripcion)
    const [editMode,setEditMode] = useState(false)
    if(editMode == false)
    {
        return (
            <tr>
                <td>{descripcionState}</td>
                <td>{props.avance.fecha.slice(0,10)}</td>
                <td>{`${props.avance.creadoPor.nombre} ${props.avance.creadoPor.apellido}`}</td>
                <td>{props.avance.observaciones}</td>
                <td><button className='fas fa-pencil-alt text-gray-900 cursor-pointer bg-yellow-500 hover:bg-yellow-700 hover:text-white p-3 px-6 w-full font-bold' onClick={() => {
                    setEditMode(true)
                }}></button></td>
            </tr>      
        )
    }
    else{
        return(
        <tr>
            <td><textarea rows={3} className='w-full border-b-2 border-t-2 border-blue-500 rounded-lg outline-none' defaultValue={descripcionState} onChange={e => {
                setDescripcionState(e.target.value)
            }}></textarea></td>
            <td>{props.avance.fecha.slice(0,10)}</td>
            <td>{`${props.avance.creadoPor.nombre} ${props.avance.creadoPor.apellido}`}</td>
            <td>{props.avance.observaciones}</td>
            <td><i className="fas fa-save m-2 p-2 bg-blue-600 rounded-full hover:text-white cursor-pointer self-end" onClick={() => {
                props.editAvance({
                    variables: {
                        id: props.avance._id,
                        fecha: props.avance.fecha,
                        descripcion: descripcionState,
                        proyecto: props.proyectoId,
                        creadoPor: props.avance.creadoPor._id
                    }
                });
                setEditMode(false);
            }}></i>
            <i className="fas fa-times m-2 p-2 bg-red-600 rounded-full hover:text-white cursor-pointer self-end" onClick={() => {
                setEditMode(false)
                setDescripcionState(originalDescripcion)
            }}></i></td>
        </tr>
        )  
    }
}

export default TableRowAvance;
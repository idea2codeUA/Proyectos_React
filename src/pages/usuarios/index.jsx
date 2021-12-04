import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import ModalJ from 'components/ModalJ';

const Dropdown = (props) => {

  const defaultValue = props.defaultValue
  const optionsSelect = [...Object.entries(props.options)];
  const [selectedValue, setSelectedValue] = useState(defaultValue);  
  useEffect(() => {
      setSelectedValue(defaultValue);
    }, [defaultValue]);

  return (
      <select
        name={props.name}
        className={props.className}
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value)
          props.openModal()}}
      >
        {optionsSelect.map((o) => {
          return (
            <option key={nanoid()} value={o[0]}>
              {o[1]}
            </option>
          );
        })};
      </select>
  );
};

const IndexUsuarios = () => {
  //trae los usuarios de la base de datos
  const { data, error, loading } = useQuery(GET_USUARIOS);

  //estados del modal
    const [open,setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR']}>
      <div>
        Datos Usuarios:
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
                {data.Usuarios.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.apellido}</td>
                      <td>{u.correo}</td>
                      <td>{u.identificacion}</td>
                      <td>{Enum_Rol[u.rol]}</td>
                      <td><Dropdown options={Enum_EstadoUsuario} defaultValue={u.estado} name={"estado"} openModal={openModal} className="border-2 border-blue-500 p-1"/></td>
                      <td>
                        <Link to={`editarusuario/${u._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <ModalJ open={open} closeModal={closeModal} titulo="¿Autorizas al usuario?"/>
      </div>
    </PrivateRoute>
  );
};

export default IndexUsuarios;

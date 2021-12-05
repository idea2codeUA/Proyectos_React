import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import {EDITAR_USUARIO} from "graphql/usuarios/mutations"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import ModalJ from 'components/ModalJ';
import TableRowJ from 'components/TableRowJ';
import { useMutation } from '@apollo/client';

const IndexUsuarios = () => {
  //trae los usuarios de la base de datos
  const { data, error, loading } = useQuery(GET_USUARIOS);

  // crea la funcion que se quiera ejecutar en el backend en algun moemnto dado
  const [editarEstadoUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO); 

  //estados del modal
    const [open,setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const [cancelTrigger,setCancelTrigger] = useState(false);
    const [acceptTrigger,setAcceptTrigger] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR']}>
      <div>
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
                    <TableRowJ key={u._id} user={u} options={Enum_EstadoUsuario} Enum_Rol={Enum_Rol}
                    cancelTrigger={cancelTrigger} setCancelTrigger={setCancelTrigger} acceptTrigger={acceptTrigger} setAcceptTrigger={setAcceptTrigger}
                     open={open} openModal={openModal} closeModal={closeModal} backendAction={editarEstadoUsuario} />
                  );
                })}
          </tbody>
        </table>
        <ModalJ open={open} closeModal={closeModal} titulo={"¿Autorizas al usuario?"} setCancelTrigger={setCancelTrigger} setAcceptTrigger ={setAcceptTrigger}/>
      </div>
    </PrivateRoute>
  );
};

export default IndexUsuarios;

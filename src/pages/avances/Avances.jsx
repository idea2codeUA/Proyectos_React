import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import {EDITAR_USUARIO} from "graphql/usuarios/mutations";
import { GET_ESTUDIANTES } from 'graphql/usuarios/queries';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import ModalJ from 'components/ModalJ';
import TableRowJ from 'components/TableRowJ';
import { useMutation } from '@apollo/client';
import { useUser } from 'context/userContext';

const Avances = () => {

  //data del usuario
  const {userData} = useUser();

  //decide que query hacer segun el rol del usuario
  let QUERY = null;
  let queryData = [];
  let queryData1 = [];
  const Enum_NO_Autorizado = {NO_AUTORIZADO: 'No autorizado'}
  const Enum_Autorizado = {AUTORIZADO: 'autorizado'}
  QUERY = userData.rol == "ADMINISTRADOR" ? GET_USUARIOS : GET_ESTUDIANTES ;

  // trae todos los usuarios o solo los estudiantes
  const { data, error, loading } = useQuery(QUERY);

  // crea la funcion que se quiera ejecutar en el backend en algun moemnto dado
  const [editarEstadoUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  // Proyectos
  const {data1,error1,loading1} = useQuery(GET_PROYECTOS);

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
  else
  { 
    //mete la data del query en una variable mas manejable
    queryData = data[Object.keys(data)[0]];
      // borra la opcion no autorizado del dropdown y filtra de la data los usuarios no autorizados
      if(userData.rol == "LIDER")  
      {
        delete Enum_EstadoUsuario.NO_AUTORIZADO;
      }

      return (
        <PrivateRoute roleList={['ADMINISTRADOR',"LIDER"]}>
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
                    {
                    queryData.map((u) => {
                      if(userData.rol == "LIDER" && u.estado == "NO_AUTORIZADO")
                      {
                        return (
                          <TableRowJ key={u._id} user={u} options={Enum_NO_Autorizado} Enum_Rol={Enum_Rol}
                          cancelTrigger={cancelTrigger} setCancelTrigger={setCancelTrigger} acceptTrigger={acceptTrigger} setAcceptTrigger={setAcceptTrigger}
                           open={open} openModal={openModal} closeModal={closeModal} backendAction={editarEstadoUsuario} />
                        );
                      }
                      else if (userData.rol == "LIDER" && u.estado == "AUTORIZADO"){
                        return (
                          <TableRowJ key={u._id} user={u} options={Enum_Autorizado} Enum_Rol={Enum_Rol}
                          cancelTrigger={cancelTrigger} setCancelTrigger={setCancelTrigger} acceptTrigger={acceptTrigger} setAcceptTrigger={setAcceptTrigger}
                           open={open} openModal={openModal} closeModal={closeModal} backendAction={editarEstadoUsuario} />
                        );
                      }
                      else{
                        return(
                        <TableRowJ key={u._id} user={u} options={Enum_EstadoUsuario} Enum_Rol={Enum_Rol}
                          cancelTrigger={cancelTrigger} setCancelTrigger={setCancelTrigger} acceptTrigger={acceptTrigger} setAcceptTrigger={setAcceptTrigger}
                           open={open} openModal={openModal} closeModal={closeModal} backendAction={editarEstadoUsuario} />
                          )
                      }
                    })}
              </tbody>
            </table>
            <ModalJ open={open} closeModal={closeModal} titulo={"¿Autorizas al usuario?"} textbutton1={"Aceptar"} textbutton2={"Cancelar"}
            setCancelTrigger={setCancelTrigger} setAcceptTrigger ={setAcceptTrigger}/>
          </div>



          <div>
            <table className='tabla'>
              <thead>
                <tr>
                  <th>Nombre Proyecto</th>
                  <th>Avances</th>
                </tr>
              </thead>
              <tbody>
                    

              {data1.royectos.map((proyecto) => {
                  return(
                  <tr key={proyecto._id}/>
                  );
              })}

              </tbody>
            </table>
            <ModalJ open={open} closeModal={closeModal} titulo={"¿Autorizas al usuario?"} textbutton1={"Aceptar"} textbutton2={"Cancelar"}
            setCancelTrigger={setCancelTrigger} setAcceptTrigger ={setAcceptTrigger}/>
          </div>
        </PrivateRoute>
      );
    };
  }


export default Avances;




/*import React from 'react';

const Category1 = () => {
  return <div>Avances</div>;
};

export default Category1;*/

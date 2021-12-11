import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import {EDITAR_USUARIO} from "graphql/usuarios/mutations";
import { GET_ESTUDIANTES } from 'graphql/usuarios/queries';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { CREAR_AVANCE } from 'graphql/Avances/mutations';
import { EDITAR_AVANCE } from 'graphql/Avances/mutations';
import { GET_AVANCES_PROYECTO } from 'graphql/Avances/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import ModalJ from 'components/ModalJ';
import TableRowJ from 'components/TableRowJ';
import TableRowAvance from 'components/TableRowAvance';
import { useMutation } from '@apollo/client';
import { useUser } from 'context/userContext';
import { useParams } from 'react-router-dom'

const Avances = () => {


  // utiliza los parametros de la url para obtner el id del proyecto
  const {_id} = useParams()

  //data del usuario
  const {userData} = useUser();

  //decide que query hacer segun el rol del usuario
  let QUERY = null;
  let QUERY1 = null;
  let queryData = [];
  let queryData1 = [];
  const Enum_NO_Autorizado = {NO_AUTORIZADO: 'No autorizado'}
  const Enum_Autorizado = {AUTORIZADO: 'autorizado'}
  QUERY = userData.rol == "LIDER" ? GET_USUARIOS : GET_ESTUDIANTES ;
  QUERY1 = userData.rol == "ESTUDIANTE" ? GET_PROYECTOS : GET_PROYECTOS ;

  // trae todos los usuarios o solo los estudiantes
  const { data, error, loading } = useQuery(QUERY);

  // crea la funcion que se quiera ejecutar en el backend en algun moemnto dado
  const [editarEstadoUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  // Proyectos por estudiante
  const {data1,error1,loading1} = useQuery(QUERY1);

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
    queryData1 = data[Object.keys(data)[0]];
      // borra la opcion no autorizado del dropdown y filtra de la data los usuarios no autorizados
      if(userData.rol == "LIDER")  
      {
        delete Enum_EstadoUsuario.NO_AUTORIZADO;
      }

      //Pendiente eliminar estudiante, solo es para pruebas de visualización
      return (
        <PrivateRoute roleList={['ADMINISTRADOR',"LIDER", "ESTUDIANTE"]}> 
          
          <div>
            <table className='tabla'>
              <thead>
                <tr>
                  <th>Nombre Proyecto</th>
                  <th>Avances</th>
                  <th>Agregar Avance</th>
                </tr>
              </thead>
              <tbody>
                {
                    queryData.map((u) => {
                      if(userData.rol == "LIDER" && u.estado == "NO_AUTORIZADO")
                      {
                        return (
                          <TableRowAvance key={u._id} user={u} options={Enum_NO_Autorizado} Enum_Rol={Enum_Rol}
                          cancelTrigger={cancelTrigger} setCancelTrigger={setCancelTrigger} acceptTrigger={acceptTrigger} setAcceptTrigger={setAcceptTrigger}
                           open={open} openModal={openModal} closeModal={closeModal} backendAction={editarEstadoUsuario} />
                        );
                      }
                      else if (userData.rol == "LIDER" && u.estado == "AUTORIZADO"){
                        return (
                          <TableRowAvance key={u._id} user={u} options={Enum_Autorizado} Enum_Rol={Enum_Rol}
                          cancelTrigger={cancelTrigger} setCancelTrigger={setCancelTrigger} acceptTrigger={acceptTrigger} setAcceptTrigger={setAcceptTrigger}
                           open={open} openModal={openModal} closeModal={closeModal} backendAction={editarEstadoUsuario} />
                        );
                      }
                      else{
                        return(
                        <TableRowAvance key={u._id} user={u} options={Enum_EstadoUsuario} Enum_Rol={Enum_Rol}
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

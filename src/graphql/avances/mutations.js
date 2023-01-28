import {gql} from "@apollo/client";

const CREAR_AVANCE =gql`
mutation CrearAvance(
$fecha: Date!, 
$descripcion: String!, 
$proyecto: String!, 
$creadoPor: String!) {
  crearAvance(
      fecha: $fecha, 
      descripcion: $descripcion, 
      proyecto: $proyecto, 
      creadoPor: $creadoPor) {
    _id
  }
}
`

const EDITAR_AVANCE = gql`
mutation EditarAvance(
    $id: ID!, 
    $fecha: Date!, 
    $descripcion: String!, 
    $proyecto: String!,
    $observaciones: String, 
    $creadoPor: String!) {
  editarAvance(
      _id: $id, 
      fecha: $fecha, 
      descripcion: $descripcion, 
      proyecto: $proyecto,
      observaciones: $observaciones 
      creadoPor: $creadoPor) {
  _id  
  }
}
`

export {CREAR_AVANCE, EDITAR_AVANCE};

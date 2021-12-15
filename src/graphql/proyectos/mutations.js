import {gql} from "@apollo/client";

const REGISTRO_PROYECTO = gql`
mutation CrearProyecto
($nombre: String!, 
$presupuesto: Float!, 
$fechaInicio: Date!, 
$fechaFin: Date!, 
$estado: Enum_EstadoProyecto!, 
$fase: Enum_FaseProyecto!, 
$lider: String!) {
  crearProyecto
  (nombre: $nombre, 
  presupuesto: $presupuesto, 
  fechaInicio: $fechaInicio, 
  fechaFin: $fechaFin, 
  estado: $estado, 
  fase: $fase, 
  lider: $lider) {
    _id
  }
}`;
       
   
const EDIT_PROYECTO = gql`
mutation EditarProyecto(
    $id: String!, 
    $nombre: String!, 
    $presupuesto: Float!, 
    $fechaInicio: Date!, 
    $fechaFin: Date!,
    $aprobado: Enum_EstadoAprobado, 
    $estado: Enum_EstadoProyecto!, 
    $fase: Enum_FaseProyecto!, 
    $lider: String!,
    $objetivos: [crearObjetivo]) {
    editarProyecto(
        _id: $id 
        nombre: $nombre 
        presupuesto: $presupuesto 
        fechaInicio: $fechaInicio
        fechaFin: $fechaFin
        aprobado: $aprobado 
        estado: $estado 
        fase: $fase 
        lider: $lider
        objetivos: $objetivos) {
          _id
    aprobado
  }
}`

export {REGISTRO_PROYECTO,EDIT_PROYECTO};
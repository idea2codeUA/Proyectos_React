import {gql} from "@apollo/client";

const REGISTRO_PROYECTO = gql`
mutation Mutation($nombre: String!,
    $presupuesto: Float!,
     $fase: Enum_FaseProyecto!,
      $lider: String!,
       $estado: Enum_EstadoProyecto!, 
       $fechaInicio: Date!
       , $fechaFin: Date!, $objetivos: [crearObjetivo]) {
   
     crearProyecto(nombre: $nombre,
      presupuesto: $presupuesto,
       fase: $fase,
        lider: $lider,
         estado: $estado,
          fechaInicio: $fechaInicio,
           fechaFin: $fechaFin,
           objetivos: $objetivos) }`;
       
   
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
    $lider: String!) {
    editarProyecto(
        _id: $id 
        nombre: $nombre 
        presupuesto: $presupuesto 
        fechaInicio: $fechaInicio
        fechaFin: $fechaFin
        aprobado: $aprobado 
        estado: $estado 
        fase: $fase 
        lider: $lider) {
    aprobado
  }
}`

export {REGISTRO_PROYECTO,EDIT_PROYECTO};
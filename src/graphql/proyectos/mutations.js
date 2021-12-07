import {gql} from "@apollo/client";

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

export {EDIT_PROYECTO};
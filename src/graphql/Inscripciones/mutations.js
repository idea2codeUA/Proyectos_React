import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`

mutation CrearInscripcion
(
$proyecto: String!, 
$estudiante: String!) {
  crearInscripcion
  (estado: PENDIENTE, 
  proyecto: $proyecto, 
  estudiante: $estudiante) {
    _id
  }
}
`;

const MODIFICAR_ESTADO_INSCRIPCION = gql`
mutation AprobarInscripcion
($aprobarInscripcionId: String!, 
$estado: Enum_EstadoInscripcion!) {
  aprobarInscripcion
  (id: $aprobarInscripcionId, 
  estado: $estado) {
    _id
    estado
  }
}
`;

export{CREAR_INSCRIPCION,MODIFICAR_ESTADO_INSCRIPCION}

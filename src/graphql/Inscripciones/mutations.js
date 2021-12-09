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

const APROBAR_INSCRIPCION = gql`
mutation Mutation(
    $aprobarInscripcionId: String!
    ) 
    {
    aprobarInscripcion(
        id: $aprobarInscripcionId
    ) 
    {
      _id
      estado
      fechaIngreso
      fechaEgreso
      proyecto {
        _id
      }
      estudiante {
        _id
      }
    }
  }
`;

export{CREAR_INSCRIPCION,APROBAR_INSCRIPCION}
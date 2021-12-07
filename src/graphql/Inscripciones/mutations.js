import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
mutation Mutation(
    $estado: Enum_EstadoInscripcion!, 
    $proyecto: String!, 
    $estudiante: String!
    ) 
    {
    crearInscripcion(
        estado: $estado, 
        proyecto: $proyecto, 
        estudiante: $estudiante
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
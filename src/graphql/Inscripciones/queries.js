import { gql } from '@apollo/client';


const GET_INSCRIPCIONES_BY_LEADER = gql`

query Usuario($id: String!) {
  Usuario(_id: $id) {
    proyectosLiderados {
      _id
      nombre
      inscripciones {
        _id
        estado
        estudiante {
          nombre
          apellido 
        }
      }
    }
  }
}`

export {GET_INSCRIPCIONES_BY_LEADER};


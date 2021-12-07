import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
query Query {
    Inscripciones {
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

const GET_INSCRIPCIONES_PROYECTOS = gql`
query InscripcionProyecto($idProyecto: String!) {
    InscripcionProyecto(idProyecto: $idProyecto) {
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

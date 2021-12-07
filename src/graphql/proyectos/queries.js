import { gql } from '@apollo/client';

const GET_PROYECTOS = gql`
query Proyectos {
  Proyectos {
    nombre
  _id
  aprobado
  estado
  fase
  fechaFin
  fechaInicio
  presupuesto  
  }
}
`;

export {GET_PROYECTOS};
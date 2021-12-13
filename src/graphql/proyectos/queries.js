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
  objetivos {
    tipo
    descripcion
    _id
  }
  lider{
    _id
  }  
  }
}
`;
const GET_PROYECTO = gql`
  query Proyecto($_id: String!) {
    Proyecto (_id: $_id) {
      nombre
      _id
      aprobado
      estado
      fase
      fechaFin
      fechaInicio
      presupuesto
      objetivos {
        tipo
        descripcion
        _id
      }
    }
  }
`;



export {GET_PROYECTOS, GET_PROYECTO};
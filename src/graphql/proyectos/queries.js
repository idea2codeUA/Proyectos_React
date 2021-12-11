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
  lider{
    _id
  }  
  }
}
`;

const GET_PROYECTOS_INSCRIPCIONES =gql`
query Proyectos {
  Proyectos {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    aprobado
    estado
    fase
    inscripciones {
      estado
      estudiante {
        _id
      }
    }
  }
}
` 
const GET_PROYECTOS_INSCRITOS_USER =gql`
query UsuarioII($id: String!) {
  UsuarioII(_id: $id) {
    inscripciones {
    proyecto {
      _id
      nombre
      objetivos {
        tipo
        descripcion
      }
      estado
      fase
      fechaInicio
      fechaFin
      presupuesto
    }
    estado  
    }
  }
}
`

export {GET_PROYECTOS,GET_PROYECTOS_INSCRIPCIONES,GET_PROYECTOS_INSCRITOS_USER};
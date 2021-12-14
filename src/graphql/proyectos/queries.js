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

const GET_PROYECTO = gql`
query Proyecto($id: String!) {
  Proyecto(_id: $id) {
    _id
    nombre
    fechaInicio
    fechaFin
    estado
    fase
    objetivos {
      _id
      descripcion
      tipo
    }
    presupuesto
    avances {
      _id
      descripcion
      fecha
      creadoPor {
        _id
        nombre
        apellido
      }
      observaciones
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

const GET_PROYECTOS_LIDERADOS_USER =gql`
query Usuario($id: String!) {
  Usuario(_id: $id) {
    proyectosLiderados {
      _id
      nombre
      estado
      fase
      fechaInicio
      fechaFin
      objetivos {
        _id
        descripcion
        tipo
      }
      presupuesto
    }
}
}
`

export {GET_PROYECTOS,GET_PROYECTO,GET_PROYECTOS_INSCRIPCIONES,GET_PROYECTOS_INSCRITOS_USER,GET_PROYECTOS_LIDERADOS_USER};
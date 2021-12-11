import {gql} from "@apollo/client";

const GET_AVANCES_PROYECTO =gql`
query FiltrarAvance($idProyecto: String!) {
  filtrarAvance(idProyecto: $idProyecto) {
  _id
  descripcion
  fecha
  creadoPor {
    nombre
    apellido
  }
  observaciones  
  }
}
`


export {GET_AVANCES_PROYECTO};
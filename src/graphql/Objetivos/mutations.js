import { gql } from "@apollo/client";

const EDITAR_OBJETIVO = gql`
mutation EditarObjetivo(
    $idProyecto: String!, 
    $indexObjetivo: Int!, 
    $campos: camposObjetivo!) {
        editarObjetivo(
            idProyecto: $idProyecto, 
            indexObjetivo: $indexObjetivo, 
            campos: $campos) {
            _id
  }
}
`

export {EDITAR_OBJETIVO};
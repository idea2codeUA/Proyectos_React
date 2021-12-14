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
const CREAR_OBJETIVO = gql`
mutation CrearObjetivo
($idProyecto: String!, 
$campos: camposObjetivo!) {
  crearObjetivo
  (idProyecto: $idProyecto, 
  campos: $campos) {
    _id
  }
}
`

export {EDITAR_OBJETIVO,CREAR_OBJETIVO};
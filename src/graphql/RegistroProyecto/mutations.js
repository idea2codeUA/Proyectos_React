import { gql } from '@apollo/client';

const REGISTROPROYECTO = gql`
mutation Mutation($nombre: String!,
    $presupuesto: Float!,
     $fase: Enum_FaseProyecto!,
      $lider: String!,
       $estado: Enum_EstadoProyecto!, 
       $fechaInicio: Date!
       , $fechaFin: Date!, $objetivos: [crearObjetivo]) {
   
     crearProyecto(nombre: $nombre,
      presupuesto: $presupuesto,
       fase: $fase,
        lider: $lider,
         estado: $estado,
          fechaInicio: $fechaInicio,
           fechaFin: $fechaFin,
           objetivos: $objetivos) }`;
       


export { REGISTROPROYECTO}
   
   
   
import React from 'react';
import SuperProjectCard from 'components/SuperProjectCard';
import { useQuery } from '@apollo/client';
import {GET_PROYECTOS_INSCRITOS_USER} from "graphql/proyectos/queries.js"

const LiderProyectos = () => {
    const [data,loading,error] = useQuery(GET_PROYECTOS_INSCRITOS_USER)
    return (
        <div className="flex flex-wrap justify-center">    
        <h1 className="text-center text-3xl font-medium m-4 mt-7 landing_page_title">
        Aquí podras administrar los proyectos que has creado
        </h1>

        </div>
    )
}

export default LiderProyectos;
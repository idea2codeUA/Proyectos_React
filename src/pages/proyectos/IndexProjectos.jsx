import React from 'react';
import ProjectCard from 'components/ProjectCard';
import { useQuery } from '@apollo/client';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { useEffect } from 'react';
const IndexProjectos = () => {
    const {data,error,loading} = useQuery(GET_PROYECTOS);

    if (loading) return <div>Cargando....</div>;

    return (
        <div className="flex">
        {data.Proyectos.map((proyecto) => {
            return(
            <ProjectCard key={proyecto._id} proyecto={proyecto}/>
            );
        })}    
        </div>
    )
}

export default IndexProjectos

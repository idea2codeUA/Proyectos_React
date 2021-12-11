import React from 'react'
import { useParams } from 'react-router-dom'
const Avances = () => {

// utiliza los parametros de la url para obtner el id del proyecto
const {_id} = useParams()

    return (
        <div>
            Estos son los avances del proyecto {_id}
        </div>
    )
}

export default Avances

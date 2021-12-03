import React from 'react'
import { useNavigate } from 'react-router-dom'
import "styles/JohinyStyles.css"

const ButtonJ = (props) => {

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(props.route)} className={props.className}><span className="buttonJ_style">{props.texto}</span></button>
        </div>
    )
}

export default ButtonJ

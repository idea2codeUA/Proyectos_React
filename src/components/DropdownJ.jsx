import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const DropdownJ = (props) => {

    const defaultValue = props.defaultValue
    const optionsSelect = [...Object.entries(props.options)];
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    
    const returnOriginal = () => {
        setSelectedValue(defaultValue)};

    useEffect(() => {
        setSelectedValue(defaultValue);
      }, [defaultValue]);

      //trigger de cancelar
      useEffect(() => {
        if(props.cancelTrigger == true)
        {
            returnOriginal()
            props.setCancelTrigger(false)
        }
      }, [props.cancelTrigger]);

      //trigger de aceptar
      useEffect(() => {
        if(props.acceptTrigger == true)
        {
            props.backendAction({
                variables:{
                    _id: props.user._id,
                    nombre: props.user.nombre,
                    nombre: props.proyecto.nombre,
                    apellido: props.user.apellido,
                    identificacion: props.user.identificacion,
                    correo: props.user.correo,
                    rol: props.user.rol,
                    estado: selectedValue,
                }
            })
            props.setAcceptTrigger(false)
        }
      }, [props.acceptTrigger]);
      
  
    return (
        <>
        <select
          name={props.name}
          className={props.className}
          value={selectedValue}
          onChange={(e) => {
            setSelectedValue(e.target.value)
            props.openModal()}}
        >
          {optionsSelect.map((o) => {
            return (
              <option key={nanoid()} value={o[0]}>
                {o[1]}
              </option>
            );
          })};
        </select>
        </>
    );
  };

  export default DropdownJ;
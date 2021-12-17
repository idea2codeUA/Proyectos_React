import React from "react";
import { render, cleanup, screen, fireEvent, getByText} from '@testing-library/react';
import ModalJ from "components/ModalJ";
import {useState} from "react"
import DropdownJ from "components/DropdownJ";

afterEach(cleanup);

const DropdownJ_ModalJ = () => {
    const [open,setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const [cancelTrigger,setCancelTrigger] = useState(false);
    const [acceptTrigger,setAcceptTrigger] = useState(false);
    return(
        <div>
        <DropdownJ defaultValue ={"LECHUGA"} options={{"LECHUGA":"Lechuga","TOMATE":"Tomate"}} openModal={openModal} 
        cancelTrigger={cancelTrigger} setCancelTrigger={setCancelTrigger} acceptTrigger={acceptTrigger} setAcceptTrigger={setAcceptTrigger}/>
        <ModalJ open={open} closeModal={closeModal} titulo={"¿Autorizas al usuario?"} textbutton1={"Aceptar"} textbutton2={"Cancelar"}
            setCancelTrigger={setCancelTrigger} />
        </div>
    )
}

it("open modal when dropdown value changes",() => {
 render(<DropdownJ_ModalJ/>)
 fireEvent.change(screen.getByTestId("Select-Dropdown"),{target:{value:"TOMATE"}})
 expect(screen.getByTestId("modalj")).toBeInTheDocument();
})

it("when clicked Cancelar on modal dropdown recovers its original value",() => {
    render(<DropdownJ_ModalJ/>)
    fireEvent.change(screen.getByTestId("Select-Dropdown"),{target:{value:"TOMATE"}})
    fireEvent.click(screen.getByText("Cancelar"));
    expect(screen.queryByTestId("modalj")).not.toBeInTheDocument();
    expect(screen.getByTestId("Select-Dropdown").value).toEqual("LECHUGA")
   })
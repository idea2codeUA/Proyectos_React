import React from "react";
import { render, cleanup, screen, fireEvent} from '@testing-library/react';
import ModalJ from "components/ModalJ";
import {useState} from "react"

afterEach(cleanup);

const ModalJwithStates = (props) => {
    const [open,setOpen] = useState(props.open);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const [cancelTrigger,setCancelTrigger] = useState(false);
    const [acceptTrigger,setAcceptTrigger] = useState(false);
    return(
        <ModalJ open={open} closeModal={closeModal} titulo={"¿Autorizas al usuario?"} textbutton1={"Aceptar"} textbutton2={"Cancelar"}
            setCancelTrigger={setCancelTrigger} setAcceptTrigger ={setAcceptTrigger}/>
    )
}

it("show modal when its state is true",() => {
    render(<ModalJwithStates open={true}/>);
    expect(screen.getByTestId("modalj")).toBeInTheDocument();
})

it("Don't show modal when its state is false",() => {
    render(<ModalJwithStates open={false}/>);
    expect(screen.queryByTestId("modalj")).not.toBeInTheDocument();
})

it("Close modal when click on Cancelar",() => {
    render(<ModalJwithStates open={true}/>);
    fireEvent.click(screen.getByText("Cancelar"))
    expect(screen.queryByTestId("modalj")).not.toBeInTheDocument();
})

it("Close modal when click on Aceptar",() => {
    render(<ModalJwithStates open={true}/>);
    fireEvent.click(screen.getByText("Aceptar"))
    expect(screen.queryByTestId("modalj")).not.toBeInTheDocument();
})
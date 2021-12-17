import React from "react";
import { render, cleanup, screen, fireEvent} from '@testing-library/react';
import DropdownJ from "components/DropdownJ";
afterEach(cleanup);

it("dropdown load with the corrects options", () => {
    render(<DropdownJ defaultValue ={"Correcto"} options={{"CORRECTO":"Correcto","INCORRECTO":"Incorrecto"}}/>);
    expect(screen.getByText("Correcto")).toBeInTheDocument();
    expect(screen.getByText("Incorrecto")).toBeInTheDocument();
})

it("dropdown load with the correct default option", () => {
    render(<DropdownJ defaultValue ={"Lechuga"} options={{"LECHUGA":"Lechuga","TOMATE":"Tomate"}}/>);
    expect(screen.getByTestId("Select-Dropdown").value).toEqual("LECHUGA");
})

it("dropdown change options correctly", () => {
    render(<DropdownJ defaultValue ={"Lechuga"} options={{"LECHUGA":"Lechuga","TOMATE":"Tomate"}} openModal={() => true}/>);
    fireEvent.change(screen.getByTestId("Select-Dropdown"), {target:{value:"TOMATE"}})
    expect(screen.getByTestId("Select-Dropdown").value).toEqual("TOMATE");
})

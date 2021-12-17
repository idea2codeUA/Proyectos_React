import React from "react";
import { render, cleanup, screen, fireEvent} from '@testing-library/react';
import IndexUsuarios from "pages/usuarios/IndexUsuarios";

afterEach(cleanup);

it("opens modal when dropdown value changes", async () =>{
    render(<IndexUsuarios/>)
    const dropDowns = await screen.findAllByTestId("Select-Dropdown");
    fireEvent.change(dropDowns[0], {target:{value:"NO_AUTORIZADO"}})
    expect(screen.getByTestId("modalj")).toBeInTheDocument();
})
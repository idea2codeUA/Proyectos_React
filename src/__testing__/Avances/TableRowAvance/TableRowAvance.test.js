import React from "react";
import TableRowAvance from "components/TableRowAvance";
import { render, cleanup, screen, fireEvent} from '@testing-library/react';

afterEach(cleanup);

it("EditMode false", () => {
    render(<TableRowAvance editMode={false}/>); 
    expect( screen.getByTestId('TableRow')).toBeInTheDocument();
})
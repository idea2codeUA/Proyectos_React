import React from 'react'
import { Modal } from '@material-ui/core'
import { Box } from '@material-ui/core';
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height:200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ModalJ = (props) => {

    return (
            <Modal
                open={props.open}
                onClose={props.closeModal}>
                    <Box sx={style}>
                    <h1 className="justify-self-center text-center font-bold text-3xl">{props.titulo}</h1>
                    <div className="flex justify-between my-8">
                        <button className="p-6  bg-green-500 rounded-md hover:bg-green-800 text-gray-200 font-extrabold">Aceptar</button>
                        <button onClick={props.closeModal} className="p-6  bg-red-500 rounded-md hover:bg-red-800 text-gray-200 font-extrabold">cancelar</button>
                    </div>
                    </Box>
            </Modal>
    )
}

export default ModalJ

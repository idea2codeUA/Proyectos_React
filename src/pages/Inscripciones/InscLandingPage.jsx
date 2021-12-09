import React from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';


const InscLandingPage = () => {
    return (
        <>
        <div className="container mx-auto items-center flex flex-col">
        <div className="text-center text-7xl font-medium m-4 mt-14">    
        <h1 className="landing_page_title">
        Aqui podras inscribirte a proyectos<br></br>
        afines a tus interes<br></br>
        </h1>
        </div>
        <div className="text-center text-5xl font-medium">   
            </div>   
            <br/>   
            <form
            className='container mx-auto flex flex-col items-center justify-center'
          >
            <Input
              label='Ingresa el nombre del proyecto al que te inscribiras'
              type='text'
              name='nombre'
            />
            <Input
              label='Apellido de la persona:'
              type='text'
              name='apellido'
            />
            <Input
              label='Correo de la persona:'
              type='email'
              name='correo'
            />
            <Input
              label='Identificación de la persona:'
              type='text'
              name='identificacion'
            />
            <ButtonLoading className="place-self-center"
              text='Confirmar'
            />
          </form>
        </div>
        </>
    )
}

export default InscLandingPage
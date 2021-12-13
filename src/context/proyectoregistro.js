import { createContext, useContext } from 'react';

export const Proyectosregistro = createContext(null);

export const useProyectos = () => {
  return useContext(Proyectosregistro);
};
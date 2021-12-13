import { createContext, useContext } from 'react';

export const ProyectoContext = createContext(null);

export const useProyecto = () => {
  return useContext(ProyectoContext);
};

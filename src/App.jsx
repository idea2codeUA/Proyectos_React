import React, { useState, useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Index from 'pages/Index';
import Avances from 'pages/avances/Avances';
import CrearAvance from 'pages/avances/CrearAvance';
import EditarAvance from 'pages/avances/EditarAvance';
import IndexUsuarios from 'pages/usuarios/IndexUsuarios';
import EditProfile from 'pages/usuarios/EditProfile';
import 'styles/globals.css';
import 'styles/tabla.css';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import { AuthContext } from 'context/authContext';
import jwt_decode from 'jwt-decode';
import LandingPage from 'pages/LandingPage';
import 'styles/globals.css';
import "styles/JohinyStyles.css";
import EditarUsuario from 'pages/usuarios/EditarUsuario';
import IndexProjectos from 'pages/proyectos/IndexProjectos';
import InscLandingPage from 'pages/Inscripciones/InscLandingPage';
import EstudianteProyectos from "pages/proyectos/EstudianteProyectos";
import LiderProyectos from 'pages/proyectos/LiderProyectos';
import AdministrarProyecto from 'pages/proyectos/AdministrarProyecto';
import InscripcionesPendientes from 'pages/Inscripciones/InscripcionesPendientes';
import RegistrarProyecto from 'pages/proyectos/RegistrarProyecto';
import AñadirObjetivos from 'pages/proyectos/AñadirObjetivos';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_BACKEND}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
            <Route path='/' element={<LandingPage />} />
              <Route path='/app' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='editprofile/:_id' element={<EditProfile />} />
                <Route path='usuarios' element={<IndexUsuarios />} />
                <Route path='usuarios/editarusuario/:_id' element={<EditarUsuario />} />
                <Route path='proyectos' element={<IndexProjectos />} />
                <Route path='proyectos/avances/:_id' element={<Avances />} />
                <Route path='proyectos/avances/crear/:_id' element={<CrearAvance />} />
                <Route path='proyectos/avances/editaravance/:_id' element={<EditarAvance />} />
                <Route path='proyectos_estudiante' element={<EstudianteProyectos />} />
                <Route path='proyectos_lider' element={<LiderProyectos />} />
                <Route path='proyectos_lider/crear' element={<RegistrarProyecto />} />
                <Route path='proyectos_lider/crear/objetivos/:_id' element={<AñadirObjetivos />} />
                <Route path='proyectos_lider/editar/:_id' element={<AdministrarProyecto />} />
                <Route path='Inscripciones' element={<InscLandingPage/>} />
                <Route path='Inscripciones_Pendientes' element={<InscripcionesPendientes/>} />
              </Route>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;

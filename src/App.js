import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  // state principal
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState('');

  useEffect(()=>{

    // prevenir ejecucion

    if(ciudad === '') return;

    const consultarAPI = async () =>{
    
      const appID = 'b8e52754c18e62897c6808cbc4a0f824';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    
      // consultar la URL 
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      guardarResultado(resultado);
    }

    consultarAPI();

  }, [ ciudad, pais ]);

  const datosConsulta = datos => {
    

    // validar que ambos campos esten
    if(datos.ciudad === '' || datos.pais === ''){
      // Error
      guardarError(true);
    }else{
      // agregarlos al state
      guardarCiudad(datos.ciudad);
      guardarPais(datos.pais);
      guardarError(false);
    }
  }

  // cargar un componente condicionalmente
  let componente;

  if(error){
    // Hay un error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios' />
  }else if(resultado.cod === "404"){
    componente = <Error mensaje="La ciudad no existe en nuestro registro" />
  } else{
    // mostrar el clima
    componente = <Clima 
                  resultado = {resultado} 
                  />;
  }


  return (
    <div className="App">
      <Header 
        titulo="React Clima"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta = {datosConsulta}
                />
            </div>

            <div className="col s12 m6">
              {componente}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

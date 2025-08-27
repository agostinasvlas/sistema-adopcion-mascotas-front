import React, { useContext, useEffect, useState } from 'react'
import { useForm } from '../hook/useForm.js'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/usuarios.js'
import Alert from '../components/Alert/Alert.jsx'

export const RegisterPage = () => {
  const [alerta,setAlerta] = useState(null);
  const navigate = useNavigate()
  
  const {nombre, email, clave, onInputChange, onResetForm} = useForm({
    nombre: '',
    email: '',
    clave: '',
  })

  const onRegister = async (e) => {
    e.preventDefault()
    try {
      await register({
        nombre,
        email,
        clave
      })
      setAlerta({estado: "success", mensaje: "Registro exitoso! Inicia sesión."});
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch(e) {
      setTimeout(() => setAlerta({estado: "error", mensaje: "Error al registrarse."}), 3000);
      console.error("Error al registrarse", e);
    }
    
    onResetForm() 
  }

  return (
    <div>
      { alerta && <Alert estado={alerta.estado} mensaje={alerta.mensaje}></Alert> }
      <form onSubmit={onRegister}>
        <div className='flex flex-col items-center justify-center h-[calc(100vh-90px)] gap-2'>
        <label className='input'>
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input type="text" name='nombre' id='nombre' value={nombre} placeholder="Nombre" onChange={onInputChange} required autoComplete='off'/>
        </label>
        
        <label className='input'>
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input type="email" name='email' id='email' value={email} onChange={onInputChange } placeholder="mail@site.com" required autoComplete='off'/>
        </label>
       
        <label className='input'>
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
              ></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input type="password" name='clave' id='clave' value={clave} onChange={ onInputChange } placeholder="Contraseña" required autoComplete='off'/>
        </label>
        

        <button className='btn btn-soft btn-primary'>Registrarse</button>
        </div>
      </form>
    </div>
  )
}
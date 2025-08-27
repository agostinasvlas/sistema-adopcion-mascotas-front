import React, { useContext, useEffect, useState } from 'react'
import { useForm } from '../hook/useForm.js'
import { login } from '../services/usuarios.js'
import { UserContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'


export const LoginPage = () => {

  //const [user, setUser] = useState(null);
  const {email, clave, onInputChange, onResetForm} = useForm({
    email: '', //initialForm
    clave: '', //initialForm
  })
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault() //significa prevenir que haga la accion por default que tienen los formularios
    try {
      const user = await login({
        email,
        clave
      })
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      navigate("/profile");

    } catch(e) {
      console.log(e)
    }
    onResetForm();
  }

  return (
    <div className="wrapper">
      <form onSubmit={onLogin}>
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
        

        <button className='btn btn-soft btn-primary'>Iniciar sesión</button>
        </div>
      </form>
    </div>
  )
}
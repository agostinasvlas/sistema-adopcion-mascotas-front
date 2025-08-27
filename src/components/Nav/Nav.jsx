import React, { useContext } from 'react'
import { Link, Outlet, replace, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const Nav = () => {
  const {state} = useLocation()
  const navigate = useNavigate()
  const {user, logout } = useContext(UserContext);

  const onLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <>
        <header>
          <Link to='/'>
            <img src='/logo.png' className='w-9 h-9'/>
          </Link>
          {
            user?.token ? (
              <div className='flex items-center gap-2'>
                <span className="userName">{user.existeUsuario.nombre}</span>
                <Link to='/profile'>
                  <img src='/profile.png' alt='Perfil' className="w-7 h-7"/>
                </Link>
                <button className='btn-logout btn btn-outline' onClick={onLogout}>Cerrar sesión</button>
              </div> ) : (
              <nav className='flex gap-2'>
                <Link to='/login'>
                  <button className='btn btn-outline btn-primary'>
                    Iniciar sesión
                  </button>
                </Link>

                <Link to='/register'>
                  <button className='btn btn-primary'>
                    Registrarse
                  </button>
                </Link>
              </nav> )
          }
          
        </header>
       
        <Outlet></Outlet>
    </> 
  )
}

export default Nav
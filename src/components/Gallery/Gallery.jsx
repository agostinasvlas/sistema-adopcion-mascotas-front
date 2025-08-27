import React, { useContext, useEffect, useState } from 'react'
import Mascota from '../Mascota/Mascota.jsx';
import { adoptar, listar } from '../../services/mascotas.js';
import { UserContext } from '../../context/UserContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Update from '../Update/Update.jsx';
import Alert from '../Alert/Alert.jsx';

const Gallery = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const [listaMascotas, setListaMascotas] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [reload,setReload] = useState(false);
  const [isEditing,setIsEditing] = useState(false);

  const handlerAdoptar = async () => {
    try {
      if(user?.token) {
        await adoptar(user.token,user.existeUsuario._id,selectedPet._id);
        setAlerta({estado: "success", mensaje: "Mascota adoptada!"});
        setTimeout(() => {
          setAlerta(null);
          setSelectedPet(null);
          setReload(prev => !prev);
        }, 3000);
      } else {
        navigate("/login");
      }

    } catch(e) {
      console.log(e);
      setAlerta({estado: "error", mensaje: "Error al adoptar"});
      setTimeout(() => {
          setAlerta(null);
      }, 3000);
    }
  }

  useEffect(() => {
      const cargarDatosAPI = async () => {
        const datos = await listar();
        setListaMascotas(datos);
      }
      cargarDatosAPI();
  }, [reload])

  if(listaMascotas.length===0)
    return (
        <>
          <h2>No hay mascotas</h2>
        </>
  )

  return (
    <>
    <h2 className="text-2xl font-medium text-800 mb-6">Elegí que mascota queres adoptar</h2>
    {
      (user?.existeUsuario.nombre === "Agostina") && (
        <Link to={'/create'}>
          <button className='btn btn-soft btn-accent' onClick={ ()=>  {setIsEditing(true);}
          }>Añadir mascota</button>
        </Link> 
      )
    }
    <div className="w-full pb-16 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {
              listaMascotas.map((mascota) => { //pide que cada elemento tenga una key unica
              return <Mascota key={mascota._id} mascota={mascota} onViewDetails={setSelectedPet}></Mascota>
              })
            } 
        </div>
    </div>

    { selectedPet && (
      isEditing? ( 
      <Update pet={selectedPet} onCancel={() => {setIsEditing(false); setReload(prev => !prev)}} />
    ) : (
      <dialog id="petModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{selectedPet.nombre}</h3>
            <figure className="my-4">
              <img 
                src={selectedPet.imagen} 
                alt={selectedPet.nombre} 
                className="rounded-lg w-full object-cover" 
              />
            </figure>
            <p><strong>Raza:</strong> {selectedPet.raza}</p>
            <p><strong>Edad:</strong> {selectedPet.edad} años</p>
            <p><strong>Descripción:</strong> {selectedPet.descripcion}</p>

            
            <div className="modal-action">
              {
              (user?.existeUsuario.nombre === "Agostina") && (
                
                <button className='btn btn-soft btn-accent' onClick={ ()=>  {setIsEditing(true);}
                }>Editar</button>
              
              )
              }
              <button 
                className="btn btn-primary"
                onClick={handlerAdoptar}
              >
                Adoptar
              </button>
              <button 
                className="btn"
                onClick={() => setSelectedPet(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
    )
  )}

    { alerta && <Alert estado={alerta.estado} mensaje={alerta.mensaje}/> }

   </> 
  )
}

export default Gallery;
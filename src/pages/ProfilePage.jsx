import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { listarMisMascotas, profile } from '../services/usuarios';

export const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [misMascotas, setMisMascotas] = useState([]);

  useEffect(() => {
    if (!user?.token) return; // si no hay token, no pedimos nada

    const fetchProfile = async () => {
      try {
        const data = await profile(user.token);
        setProfileData(data);
      } catch(e) {
        console.error("Error al cargar perfil",e);
      } 
    }
    const fetchMisMascotas = async () => {
      try {
        const pets = await listarMisMascotas(user.existeUsuario._id,user.token);
        setMisMascotas(pets);
      } catch(e) {
        console.error("Error al cargar mis mascotas", e);
      }
    }
    fetchProfile(); 
    fetchMisMascotas();
  }, [user]);

  if (!profileData) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h1>Perfil de {profileData.nombre}</h1>
      <p>Email: {profileData.email}</p>
      <p>ID: {profileData._id}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {
          misMascotas.map((mascota) => {
             return (<div key={mascota._id} className="bg-white shadow rounded overflow-hidden group">
              <div className="pt-4 pb-3 px-4">
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                            {mascota.nombre}</h4>
                   
                    <div className="flex items-baseline mb-1 space-x-2">
                        <p className="text-xl text-primary font-semibold">{mascota.tipo}</p>
                    </div>
                    <div className="flex items-center">
                        <div className="text-xs text-gray-500 ml-3">Edad: {mascota.edad}</div>
                    </div>
                </div>
                <div className="relative">
                    <img src={`https://sistema-adopcion-mascotas-a7rh.onrender.com${mascota.imagen}`} alt="product 1" className="w-full"/>
                </div>                
            </div>)
          })
        }
        </div>
      
      

    </div>
  );
}
import React from 'react'
import { adoptar } from '../../services/mascotas';
import { Link } from 'react-router-dom';

const Mascota = ({mascota,onViewDetails}) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
                <div className="relative">
                    <img src={mascota.imagen} alt={mascota.nombre} className="w-full"/>
                </div>
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
                
                <button onClick={()=>onViewDetails(mascota)} className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"> Adoptar </button>
                
    </div>
  )
}

export default Mascota;
import React, { useContext, useState } from 'react'
import { useForm } from '../../hook/useForm';
import { UserContext } from '../../context/UserContext';
import { deletePet, update } from '../../services/mascotas';

const Update = ({pet, onCancel}) => {
    const [imag, setImagen] = useState(null);
    const {user} = useContext(UserContext);
    const {nombre, tipo, raza, edad, descripcion, imagen, onInputChange} = useForm({
        nombre: pet.nombre,
        tipo: pet.tipo,
        raza: pet.raza,
        edad: pet.edad,
        descripcion: pet.descripcion,
        imagen: pet.imagen
    })

    if(!pet) return <p>Cargando...</p>;
    const onUpdate = async () => {
        try {
          const formData = new FormData();
          formData.append("nombre", nombre);
          formData.append("tipo", tipo);
          formData.append("raza", raza);
          formData.append("edad", edad);
          formData.append("descripcion", descripcion);
          if (imag)
            formData.append("imagen", imag);

          await update(user.token,pet._id,formData);
          onCancel();

        } catch(e) {
            console.error("Error al actualizar", e);
        }

    }
    const onDelete = async () => {
      try {
        await deletePet(user.token,pet._id);
      } catch(e) {
        console.error("Error al eliminar", e);
      }
    }
  return (
    <dialog id="petModal" className="modal modal-open">
              <div className="modal-box">
                <input className="font-bold text-lg" value={nombre} type="text" id='nombre' name='nombre' onChange={onInputChange}></input>
                
                <p><strong>Tipo:</strong></p>
                    <input type="text" id='tipo' name='tipo' value={tipo} onChange={onInputChange}/>
                <p><strong>Raza:</strong></p>
                    <input type="text" id='raza' name='raza' value={raza} onChange={onInputChange}/>
                <p><strong>Edad:</strong></p>
                    <input type="text" id='edad' name='edad' value={edad} onChange={onInputChange}/>
                <p><strong>Descripción:</strong></p>
                    <input type="text" id='descripcion' name='descripcion' value={descripcion} onChange={onInputChange}/>
                <p><strong>Imagen:</strong></p>
                    <input type="file" name="imagen" accept="image/*" onChange={(e) => setImagen(e.target.files[0])}/>
              
                <div className="modal-action">
                  <button
                    className='btn btn-error'
                    onClick={onDelete}>
                    Eliminar
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={onUpdate}
                  >
                    Actualizar
                  </button>
                  <button 
                    className="btn"
                    onClick={onCancel}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
    </dialog>
  )
}

export default Update
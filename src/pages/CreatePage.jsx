import React, { useState } from 'react'
import { useForm } from '../hook/useForm'
import { create } from '../services/mascotas'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert/Alert'

const CreatePage = () => {
    const navigate = useNavigate();
    const [alerta,setAlerta] = useState(null);
    const [imagen, setImagen] = useState(null);

    const {sku, nombre, tipo, raza, edad, descripcion, onInputChange, onResetForm} = useForm({
        sku: '',
        nombre: '',
        tipo: '',
        raza: '',
        edad: '',
        descripcion: '',
    });

    const onCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("sku", sku);
            formData.append("nombre", nombre);
            formData.append("tipo", tipo);
            formData.append("raza", raza);
            formData.append("edad", edad);
            formData.append("descripcion", descripcion);
            if (imagen) formData.append("imagen", imagen);

            await create(formData);
            
            setAlerta({estado: "success", mensaje: "Mascota creada!"});
            setTimeout(()=> {
                navigate("/mascotas");
            },3000)

        } catch(e) {
            console.error("Error al crear mascota", e);
            setTimeout(()=> {
                setAlerta({estado: "error", mensaje: "Error al crear mascota"});
            },3000)
            
        }
    }
  return (

    <div>
        { alerta && <Alert estado={alerta.estado} mensaje={alerta.mensaje}/> }
      <form onSubmit={onCreate}>
        <div className='flex flex-col items-center justify-center h-[calc(100vh-90px)] gap-2'>

        <label className='input'>
          <input type="text" name='nombre' id='nombre' value={nombre} onChange={onInputChange } placeholder="Nombre de la mascota" required autoComplete='off'/>
        </label>
       
        <label className='input'>
          <input type="text" name='sku' id='sku' value={sku} onChange={ onInputChange } placeholder="SKU" required autoComplete='off'/>
        </label>

        <label className='input'>
          <input type="text" name='tipo' id='tipo' value={tipo} onChange={ onInputChange } placeholder="Tipo: perro, gato..." required autoComplete='off'/>
        </label>

        <label className='input'>
          <input type="text" name='raza' id='raza' value={raza} onChange={ onInputChange } placeholder="Raza" required autoComplete='off'/>
        </label>

        <label className='input'>
          <input type="number" name='edad' id='edad' value={edad} onChange={ onInputChange } placeholder="Edad" required autoComplete='off'/>
        </label>

        <label className='input'>
          <input type="text" name='descripcion' id='descripcion' value={descripcion} onChange={ onInputChange } placeholder="Descripcion" required autoComplete='off'/>
        </label>

        <label className="input">
            <input
              type="file"
              name="imagen"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}/>
        </label>

        <button className='btn btn-soft btn-primary'>Crear mascota</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePage
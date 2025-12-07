import { useState } from "react"
import { useFormStatus } from "react-dom"

export default function AddClienteForm({onClick, datos}) {
  const { pending, data } = useFormStatus()

  const [nombre, setNombre] = useState(datos?.nombre)
  const [telefono, setTelefono] = useState(datos?.telefono)

  return (
    <div style={{marginBottom: "1em"}}>
      <h3>Formulario de { datos? "edición" : "creación" }</h3>
      <label htmlFor="nombre">Nombre: </label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={nombre}
        onChange={ (e)=>{setNombre(e.target.value)} }
        disabled={pending}
        required
      />
      <br />
      <label htmlFor="telefono">Teléfono: </label>
      <input
        type="text"
        id="telefono"
        name="telefono"
        value={telefono}
        onChange={ (e)=>{setTelefono(e.target.value)} }
        pattern="[0-9]{9}"
        maxLength={9}
        disabled={pending}
        required
      />
      <br />
      <button type="submit" disabled={pending}>
        { datos? "Editar" : "Añadir" } cliente
      </button>
      <button type="button" onClick={onClick}>Cerrar formulario</button>
    </div>
  )
}

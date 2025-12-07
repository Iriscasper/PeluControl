import { useFormStatus } from "react-dom"

export default function AddClienteForm({onClick, datos, setDatos, formType}) {
  const { pending } = useFormStatus()

  return (
    <div style={{marginBottom: "1em"}}>
      <h3>Formulario de { formType=="editar"? "edición" : "creación" }</h3>
      <label htmlFor="nombre">Nombre: </label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={datos?.nombre}
        onChange={ (e)=>{setDatos({...datos, nombre: e.target.value})} }
        disabled={pending}
        required
      />
      <br />
      <label htmlFor="telefono">Teléfono: </label>
      <input
        type="text"
        id="telefono"
        name="telefono"
        value={datos?.telefono}
        onChange={ (e)=>{setDatos({...datos, telefono: e.target.value})} }
        pattern="[0-9]{9}"
        maxLength={9}
        disabled={pending}
        required
      />
      <br />
      <button type="submit" disabled={pending}>
        { formType=="editar"? "Editar" : "Añadir" } cliente
      </button>
      <button type="button" onClick={onClick}>Cerrar formulario</button>
    </div>
  )
}

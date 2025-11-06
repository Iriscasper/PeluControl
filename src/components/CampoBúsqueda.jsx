function CampoBúsqueda({ value, onChange }) {
  return (
    <div>
      <label htmlFor="buscar">Filtrar por nombre o teléfono: </label>
      <input
        type="text"
        id="buscar"
        name="buscar"
        placeholder={"Escribe aquí..."}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default CampoBúsqueda

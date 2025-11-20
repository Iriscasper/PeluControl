function CampoBúsqueda({ onChange }) {
  return (
    <div style={{ marginBottom: "1em" }}>
      <label htmlFor="buscar">Filtrar por nombre o teléfono: </label>
      <input
        type="search"
        id="buscar"
        name="buscar"
        placeholder={"Escribe aquí..."}
        onChange={onChange}
      />
    </div>
  )
}

export default CampoBúsqueda

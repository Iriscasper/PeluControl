function MostrarLista({cliente}) {
  return (
      <li key={cliente.id}>{cliente.nombre} - {cliente.telefono}</li>
  )
}

export default MostrarLista

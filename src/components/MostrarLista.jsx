function MostrarLista({ lista }) {
  return (
    <ul>
      {
      lista.map(cliente => 
      <li key={cliente.id}>{cliente.nombre} - {cliente.telefono}</li>
      )
    }
    </ul>
  )
}

export default MostrarLista

import { useState } from 'react'
import clientesIniciales from './clientes.js'
import CampoBúsqueda from "./CampoBúsqueda.jsx"
import MostrarLista from "./MostrarLista.jsx"
import SinResultados from './SinResultados.jsx'

function ListaClientes() {
  const [busqueda, setBusqueda] = useState("")

  const clientesFiltrados = clientesIniciales.filter(cliente =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.telefono.includes(busqueda)
)
  return (
    <div>
      <h3>Lista de clientes</h3>
      <CampoBúsqueda value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
      {clientesFiltrados.length > 0 ?
        clientesFiltrados.map(cliente => <MostrarLista key={cliente.id} cliente={cliente} />) : 
        <SinResultados />}
    </div>
  )
}

export default ListaClientes

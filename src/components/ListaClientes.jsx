import { useState } from 'react'
import clientesIniciales from './clientes.js'
import CampoBúsqueda from "./CampoBúsqueda.jsx"
import MostrarLista from "./MostrarLista.jsx"
import SinResultados from './SinResultados.jsx'

function ListaClientes() {
  const [lista, setLista] = useState(clientesIniciales)
  
  const filtrar = (filtro) => {
    let listaFiltrada = clientesIniciales.filter(cliente =>
    cliente.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    cliente.telefono.includes(filtro))
    setLista(listaFiltrada)
  }

  return (
    <div>
      <h3>Lista de clientes</h3>
      <CampoBúsqueda onChange={(e) => filtrar(e.target.value)}/>
      {lista.length > 0 ?
        <MostrarLista lista={lista} /> : 
        <SinResultados />}
    </div>
  )
}

export default ListaClientes

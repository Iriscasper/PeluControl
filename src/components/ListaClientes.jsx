import { useEffect, useEffectEvent, useState } from "react"
import clientesIniciales from "./clientes.js"
import CampoBúsqueda from "./CampoBúsqueda.jsx"
import MostrarLista from "./MostrarLista.jsx"
import SinResultados from "./SinResultados.jsx"
import Paginacion from "./Paginacion.jsx"
import SelectorPaginacion from "./SelectorPaginacion.jsx"
import Ordenar from "./Ordenar.jsx"
import Loader from "./Loader.jsx"

function ListaClientes() {
  const [lista, setLista] = useState([]) // Lista de clientes inicial
  const [listaPaginada, setListaPaginada] = useState(clientesIniciales)
  const [offset, setOffset] = useState(0) // Aquí cargaremos los offsets definidos en Paginacion, para poder mostrarlos acordemente
  const [clientesPerPage, setClientesPerPage] = useState(5)
  const [toggleNombre, setToggleNombre] = useState(false)
  const [toggleTelefono, setToggleTelefono] = useState(false)
  const [cargando, setCargando] = useState(false) // Simulación del estado del fetch
  const [error, setError] = useState(false)

  // FILTRO
  // Lógica del filtro, lo que introduces en la caja de texto es el parámetro para filtrar la lista de objetos
  const filtrar = (filtro) => {
    let listaFiltrada = clientesIniciales.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        cliente.telefono.includes(filtro)
    )
    setLista(listaFiltrada)
    setOffset(0) // Al filtrar siempre volvemos a la primera página
  }

  const onPaginate = useEffectEvent(() => {
    const currentClientes = lista.slice(offset, offset + clientesPerPage)
    setListaPaginada(currentClientes)
  })

  const ordenarPorNombre = () => {
    if (toggleNombre) {
      setLista(lista.sort((a, b) => b.nombre.localeCompare(a.nombre, "es")))
    } else
      setLista(lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es")))
    setToggleNombre(!toggleNombre)
  }

  const ordenarPorTelefono = () => {
    if (toggleTelefono) {
      setLista(lista.sort((a, b) => b.telefono - a.telefono))
    } else setLista(lista.sort((a, b) => a.telefono - b.telefono))
    setToggleTelefono(!toggleTelefono)
  }

  const cargarClientes = () => {
    setLista(clientesIniciales)
    setCargando(false)
  }

  useEffect(
    () => {
      onPaginate()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset, clientesPerPage, lista, toggleNombre, toggleTelefono]
  )

  // Simulamos la carga de clientes
  useEffect(() => {
    setCargando(true)
    setTimeout(cargarClientes, 2000)
  }, [])

  return (
    <div>
      <h2>Lista de clientes</h2>
      {cargando ?
        <Loader /> : error ?
        <p className="error">Error al cargar los datos</p> :
          <>
          <CampoBúsqueda onChange={(texto) => filtrar(texto.target.value)} />
          <Ordenar
            onClickNombre={ordenarPorNombre}
            onClickTelefono={ordenarPorTelefono}
          />
          {lista.length > 0 ? (
            <MostrarLista lista={listaPaginada} />
          ) : (
            <SinResultados />
          )}
          {clientesPerPage < lista.length && (
            <Paginacion
              lista={lista}
              offset={offset}
              setOffset={setOffset}
              clientesPerPage={clientesPerPage}
            />
          )}
          <SelectorPaginacion
            onChange={(num) => setClientesPerPage(parseInt(num.target.value))}
          />
          </>
      }
      <button style={{ marginTop: "2.5em" }} onClick={() => setError(!error)}>Simular error</button>
    </div>
  )
}

export default ListaClientes

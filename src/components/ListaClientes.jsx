import { useEffect, useEffectEvent, useRef, useState } from "react"
import { agregarCliente, editarClienteAction } from "../utils/actions.js"
import clientesIniciales from "../data/clientes.js"
import CampoBúsqueda from "./CampoBúsqueda.jsx"
import MostrarLista from "./MostrarLista.jsx"
import SinResultados from "./SinResultados.jsx"
import Paginacion from "./Paginacion.jsx"
import SelectorPaginacion from "./SelectorPaginacion.jsx"
import Ordenar from "./Ordenar.jsx"
import Loader from "./Loader.jsx"
import AddClienteButton from "./AddClienteButton.jsx"
import AddClienteForm from "./AddClienteForm.jsx"

function ListaClientes() {
  const [lista, setLista] = useState([]) // Lista de clientes inicial
  const [listaPaginada, setListaPaginada] = useState(lista)
  const [offset, setOffset] = useState(0) // Aquí cargaremos los offsets definidos en Paginacion, para poder mostrarlos acordemente
  const [clientesPerPage, setClientesPerPage] = useState(5)
  const [toggleNombre, setToggleNombre] = useState(false)
  const [toggleTelefono, setToggleTelefono] = useState(false)
  const [cargando, setCargando] = useState(false) // Simulación del estado del fetch
  const [error, setError] = useState(false) // Simulación de error al cargar
  const [formVisibility, setFormVisibility] = useState(false) // Controla si aparece o no el formulario
  const [clienteAEditar, setClienteAEditar] = useState(null)
  const [formType, setFormType] = useState(null)

  const refForm = useRef(null) // Crea una referencia

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

  function editarCliente(cliente) {
    setFormVisibility(true)
    setClienteAEditar(cliente)
    setFormType("editar")
  }

  // La paginación y el filtrado son dinámicos gracias a este useEffect
  useEffect(
    () => {
      onPaginate()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset, clientesPerPage, lista, toggleNombre, toggleTelefono, formVisibility]
  )

  // Simulamos la carga de clientes
  useEffect(() => {
    setCargando(true)
    setTimeout(cargarClientes, 2000)
  }, [])

  return (
    <div>
      {/* Título */}
      <h2>Lista de clientes</h2>
      {/* Cargando / error / Mostrar el resto de la aplicación  */}
      {cargando ? (
        <Loader />
      ) : error ? (
        <p className="error">Error al cargar los datos</p>
      ) : (
        <>
          {/* Botón de aádir cliente */}
          {!formVisibility && (
            <AddClienteButton
              onClick={() => {
                setFormVisibility(true)
                setClienteAEditar(null)
                setFormType("crear")
              }}
            />
          )}
          {/* Formulario de adición */}
          {formVisibility && (
            <form
              ref={refForm}
              action={async (formData) => {
                if (formType=="editar") await editarClienteAction(clienteAEditar.id, formData)
                else if (formType=="crear") await agregarCliente(formData)
                refForm.current.reset()
                setFormVisibility(false)
                setClienteAEditar(null)
                setFormType(null)
              }}
            >
              <AddClienteForm
                onClick={() => {
                  setFormVisibility(false)
                  setFormType(null)
                }}
                datos={clienteAEditar}
                setDatos={setClienteAEditar}
                formType={formType}
              />
            </form>
          )}
          {/* Campo de búsqueda */}
          <CampoBúsqueda onChange={(texto) => filtrar(texto.target.value)} />
          {/* Sorting */}
          <Ordenar
            onClickNombre={ordenarPorNombre}
            onClickTelefono={ordenarPorTelefono}
          />
          {/* Lista */}
          {lista.length > 0 ? (
            <MostrarLista lista={listaPaginada} editarCliente={editarCliente} />
          ) : (
            <SinResultados />
          )}
          {/* Paginación */}
          {clientesPerPage < lista.length && (
            <Paginacion
              lista={lista}
              offset={offset}
              setOffset={setOffset}
              clientesPerPage={clientesPerPage}
            />
          )}
          {/* Número de resultados paginados */}
          <SelectorPaginacion
            onChange={(num) => setClientesPerPage(parseInt(num.target.value))}
          />
        </>
      )}
      {/* Botón para simular error de carga */}
      <button style={{ marginTop: "2.5em" }} onClick={() => setError(!error)}>
        Simular error
      </button>
    </div>
  )
}

export default ListaClientes

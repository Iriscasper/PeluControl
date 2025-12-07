import clientesIniciales from "../data/clientes.js"

export function agregarCliente(nuevoCliente) {
  // Autoincrementamos el id del usuario
  var id = clientesIniciales.findLast(({ id }) => id > 0).id + 1
  // Añadimos al nuevo cliente con valores id y lo que traiga el objeto del formulario
  clientesIniciales.push({
    id: id,
    nombre: nuevoCliente.get("nombre"),
    telefono: nuevoCliente.get("telefono"),
  })
}

export function editarClienteAction(id, cliente) {
  var index = clientesIniciales.findIndex((e) => e.id == id)
  clientesIniciales[index] = {
    id: id,
    nombre: cliente.get("nombre"),
    telefono: cliente.get("telefono"),
  }
}

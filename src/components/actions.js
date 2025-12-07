import clientesIniciales from "./clientes.js"

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

export function editarClienteAction(cliente) {
  console.log(cliente)
  var index = clientesIniciales.findIndex((e) => {
    e.id == cliente.id
  })
  clientesIniciales[index] = cliente
  console.log("valor del cliente: ")
  console.log(cliente)
  console.log("Valor en la lista ")
  console.log(clientesIniciales[index])
}

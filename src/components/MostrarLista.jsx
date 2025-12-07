import { EditFilled } from '@ant-design/icons';

function MostrarLista({ lista, editarCliente }) {
  return (
    <ul>
      {lista.map((cliente) => (
        <li key={cliente.id}>
          {cliente.nombre} - {cliente.telefono}
          <a className='edit-btn' onClick={() => editarCliente(cliente)}>
            <EditFilled />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default MostrarLista

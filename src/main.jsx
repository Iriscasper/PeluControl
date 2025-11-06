import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import ListaClientes from "./components/ListaClientes"
import "./css/index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ListaClientes />
  </StrictMode>
)

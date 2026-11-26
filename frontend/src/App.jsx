import { useState } from "react";
import Biblioteca from "./pages/Biblioteca";
import CadastrarUsuario from "./pages/CadastrarUsuario";
import "./App.css";

function App() {
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  return mostrarCadastro ? (
    <CadastrarUsuario onBack={() => setMostrarCadastro(false)} />
  ) : (
    <Biblioteca onRegister={() => setMostrarCadastro(true)} />
  );
}

export default App;

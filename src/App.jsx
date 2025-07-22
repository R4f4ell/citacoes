import React, { useState } from "react";
import Citacao from "./components/citacao/Citacao";
import citacoes from "./data";

function App() {
  const [indice, setIndice] = useState(0);

  function proximaCitacao() {
    setIndice((indiceAtual) => (indiceAtual + 1) % citacoes.length);
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Citacao 
            texto={citacoes[indice].texto} 
            autor={citacoes[indice].autor} 
            proximaCitacao={proximaCitacao}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
import './citacao.scss';
import React, { useState, useEffect } from "react";

function Citacao({ texto, autor, proximaCitacao }) {
  const [traducao, setTraducao] = useState("");
  const [idiomAtual, setIdiomaAtual] = useState("pt");
  const [carregando, setCarregando] = useState(false);

  // Resetar a tradução quando o texto da citação mudar
  useEffect(() => {
    setTraducao("");
    setIdiomaAtual("pt");
  }, [texto]);

  // Traduções para todas as citações do seu data.js
  const traducoes = {
    en: {
      "A vida não é mais que um sonho; mas nesse sonho não há nem riso nem prazer.": "Life is nothing but a dream; but in this dream there is neither laughter nor pleasure.",
      "Liberdade é pouco. O que eu desejo ainda não tem nome.": "Freedom is little. What I desire still has no name.",
      "Ser feliz sem motivo é a mais autêntica forma de felicidade.": "Being happy without reason is the most authentic form of happiness.",
      "Eles passarão... eu passarinho!": "They will pass... I, little bird!",
      "Se a educação sozinha não transforma a sociedade, sem ela tampouco a sociedade muda.": "If education alone does not transform society, without it society does not change either.",
      "O valor das coisas não está no tempo que elas duram, mas na intensidade com que acontecem. Por isso, existem momentos inesquecíveis, coisas inexplicáveis e pessoas incomparáveis.": "The value of things is not in the time they last, but in the intensity with which they happen. Therefore, there are unforgettable moments, inexplicable things and incomparable people.",
      "Que não seja imortal, posto que é chama, mas que seja infinito enquanto dure.": "May it not be immortal, since it is flame, but may it be infinite while it lasts.",
      "Um país se faz com homens e livros.": "A country is made with men and books.",
      "O real não está na saída nem na chegada: ele se dispõe para a gente é no meio da travessia.": "Reality is not at the departure nor at the arrival: it arranges itself for us in the middle of the crossing.",
      "Perder-se significa ir achando e nem saber o que fazer do que for achando.": "Getting lost means finding and not knowing what to do with what you find.",
      "Quero cotidiano. Mudei de quereres tantas vezes, estou só esperando virar amor.": "I want the everyday. I've changed my desires so many times, I'm just waiting to become love.",
      "Recria tua vida, sempre, sempre. Remove pedras e planta roseiras e faz doces. Recomeça.": "Recreate your life, always, always. Remove stones and plant rose bushes and make sweets. Start over."
    },
    es: {
      "A vida não é mais que um sonho; mas nesse sonho não há nem riso nem prazer.": "La vida no es más que un sueño; pero en ese sueño no hay ni risa ni placer.",
      "Liberdade é pouco. O que eu desejo ainda não tem nome.": "La libertad es poco. Lo que deseo aún no tiene nombre.",
      "Ser feliz sem motivo é a mais autêntica forma de felicidade.": "Ser feliz sin motivo es la forma más auténtica de felicidad.",
      "Eles passarão... eu passarinho!": "¡Ellos pasarán... yo pajarito!",
      "Se a educação sozinha não transforma a sociedade, sem ela tampouco a sociedade muda.": "Si la educación sola no transforma la sociedad, sin ella tampoco la sociedad cambia.",
      "O valor das coisas não está no tempo que elas duram, mas na intensidade com que acontecem. Por isso, existem momentos inesquecíveis, coisas inexplicáveis e pessoas incomparáveis.": "El valor de las cosas no está en el tiempo que duran, sino en la intensidad con que suceden. Por eso, existen momentos inolvidables, cosas inexplicables y personas incomparables.",
      "Que não seja imortal, posto que é chama, mas que seja infinito enquanto dure.": "Que no sea inmortal, puesto que es llama, pero que sea infinito mientras dure.",
      "Um país se faz com homens e livros.": "Un país se hace con hombres y libros.",
      "O real não está na saída nem na chegada: ele se dispõe para a gente é no meio da travessia.": "Lo real no está en la salida ni en la llegada: se dispone para nosotros en medio del cruce.",
      "Perder-se significa ir achando e nem saber o que fazer do que for achando.": "Perderse significa ir encontrando y no saber qué hacer con lo que se va encontrando.",
      "Quero cotidiano. Mudei de quereres tantas vezes, estou só esperando virar amor.": "Quiero lo cotidiano. Cambié de deseos tantas vezes, solo estoy esperando convertirme en amor.",
      "Recria tua vida, sempre, sempre. Remove pedras e planta roseiras e faz doces. Recomeça.": "Recrea tu vida, siempre, siempre. Remueve piedras y planta rosales y haz dulces. Recomienza."
    }
  };

  async function traduzirCitacao(idioma) {
    if (idioma === "pt") {
      setTraducao("");
      setIdiomaAtual("pt");
      return;
    }

    setCarregando(true);
    
    try {
      // Usar apenas traduções pré-definidas para evitar problemas de CORS
      if (traducoes[idioma] && traducoes[idioma][texto]) {
        // Simular delay da API para melhor UX
        await new Promise(resolve => setTimeout(resolve, 800));
        setTraducao(traducoes[idioma][texto]);
        setIdiomaAtual(idioma);
      } else {
        // Fallback para citações não traduzidas
        const mensagemFallback = idioma === "en" 
          ? "Translation not available for this quote. Please try another quote."
          : "Traducción no disponible para esta cita. Por favor, prueba con otra cita.";
        
        await new Promise(resolve => setTimeout(resolve, 500));
        setTraducao(mensagemFallback);
        setIdiomaAtual(idioma);
      }
    } catch (erro) {
      console.error("Erro ao traduzir citação:", erro);
      
      const traducaoFallback = idioma === "en" 
        ? "Translation service temporarily unavailable."
        : "Servicio de traducción temporalmente no disponible.";
      
      setTraducao(traducaoFallback);
      setIdiomaAtual(idioma);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={`citacao-container ${carregando ? 'loading-state' : ''}`}>
      <blockquote className="blockquote">
        <p className={carregando ? 'loading' : ''}>
          {carregando ? "Traduzindo..." : (traducao || texto)}
        </p>
        <footer className="blockquote-footer">
          <cite>{autor}</cite>
        </footer>
      </blockquote>
      
      
      
      <div className="controls-container">
        <div className="btn-group" role="group">
          <button
            className={`btn ${idiomAtual === "pt" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => traduzirCitacao("pt")}
            disabled={carregando}
          >
            Português
          </button>
          <button
            className={`btn ${idiomAtual === "en" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => traduzirCitacao("en")}
            disabled={carregando}
          >
            English
          </button>
          <button
            className={`btn ${idiomAtual === "es" ? "btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => traduzirCitacao("es")}
            disabled={carregando}
          >
            Español
          </button>
        </div>
        
        <div className="next-quote-container">
          <button 
            className="btn btn-success btn-lg" 
            onClick={proximaCitacao}
            disabled={carregando}
          >
            Próxima Citação
          </button>
        </div>
      </div>
    </div>
  );
}

export default Citacao;
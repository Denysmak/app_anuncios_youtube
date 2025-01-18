import { useState } from 'react';
import Pergunta from './Pergunta';

function Ajuda() {
  const [activeIndex, setActiveIndex] = useState(null); // Pergunta ativa

  const perguntas = [
    {
      id: 0,
      pergunta: '¿Otras personas realmente están recibiendo?',
      texto: '¡Sí! Ya hemos realizado más de 15,000 pagos confirmados...',
    },
    {
      id: 1,
      pergunta: '¿Por qué necesito hacer la validación ahora?',
      texto: 'La validación es necesaria para garantizar tu lugar...',
    },
    {
      id: 2,
      pergunta: '¿Y si no me gusta el programa?',
      texto: '¡Ofrecemos garantía total de satisfacción!',
    },
    {
      id: 3,
      pergunta: '¿Desea cancelar su suscripción? Haga clic en el botón de abajo',
      texto: '¡Ofrecemos garantía total de satisfacción! Si por cualquier motivo no quedas satisfecho...',
      links: [
        { texto: 'Acceder a la aplicatión', url: '/telaPrincipal' },
        { texto: 'Cancelar subscripción', url: 'https://acceso-oficial.digital/devolucion/'},
      ],
    },
  ];

  const handleClick = (id) => {
    // Alterna entre ativar e desativar
    setActiveIndex((prevIndex) => (prevIndex === id ? null : id));
  };

  const estilo = {
    color: '#ff0800', // Cor do texto
    textAlign: 'center',
    marginTop: '120px',
  };

  return (
    <div>
      <h2 style={estilo}>Preguntas Frecuentes</h2>
      {perguntas.map((item) => (
        <Pergunta
          key={item.id}
          pergunta={item.pergunta}
          texto={item.texto}
          isActive={activeIndex === item.id}
          onClick={() => handleClick(item.id)}
          links={item.links}  
          
        />
      ))}
    </div>
  );
}

export default Ajuda;

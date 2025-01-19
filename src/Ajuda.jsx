import { useState } from 'react';
import Pergunta from './Pergunta';
function Ajuda() {
  const [activeIndex, setActiveIndex] = useState(null);

  const perguntas = [
    {
      id: 0,
      pergunta: '¿Otras personas realmente están recibiendo?',
      texto: '¡Sí! Ya hemos realizado más de 15,000 pagos confirmados. Nuestro sistema de evaluación es una asociación oficial con grandes plataformas de streaming que necesitan esta información para mejorar sus algoritmos. Por eso, podemos ofrecer recompensas reales por opiniones sinceras.',
    },
    {
      id: 1,
      pergunta: '¿Por qué necesito hacer la validación ahora?',
      texto: 'La validación es necesaria para garantizar tu lugar en el programa. Debido al alto volumen de usuarios, necesitamos asegurarnos de que solo participen personas reales. Además, las plazas son limitadas y la demanda es muy alta, por lo que recomendamos hacer la validación lo antes posible para no perder tu oportunidad.',
    },
    {
      id: 2,
      pergunta: '¿Y si no me gusta el programa?',
      texto: '¡Ofrecemos garantía total de satisfacción! Si por cualquier motivo no quedas satisfecho, devolvemos el 100% del valor de la tarifa de validación. Nuestro objetivo es mantener una comunidad de evaluadores satisfechos y comprometidos.',
    },
    {
      id: 3,
      pergunta: '¿Desea cancelar su suscripción? Haga clic en el botón de abajo',
      texto: '¡Ofrecemos garantía total de satisfacción! Si por cualquier motivo no quedas satisfecho...',
      links: [
        { texto: 'Acceder a la aplicación', url: '/cancelar' },
        {
          texto: 'Cancelar subscripción',
          url: 'https://acceso-oficial.digital/devolucion/',
          style: { backgroundColor: 'black', color: 'white', padding: '10px', textDecoration: 'none' },
        },
      ],
    },
  ];

  const handleClick = (id) => {
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
          isActive={activeIndex === item.id || item.links} // Sempre ativo se houver links
          onClick={() => handleClick(item.id)}
          links={item.links}
        />
      ))}
    </div>
  );
}




export default Ajuda;

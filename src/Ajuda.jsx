import { useState, useEffect } from 'react';
import Pergunta from './Pergunta';
import styles from './Ajuda.module.css'


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
        { texto: 'Acceder a la aplicación', url: '/' },
        {
          texto: 'Cancelar subscripción',
          url: 'https://acceso-oficial.digital/devolucion/',
         
        },
      ],
    },
  ];

  const handleClick = (id) => {
    setActiveIndex((prevIndex) => (prevIndex === id ? null : id));
  };
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setLarguraTela(window.innerWidth);
    };

    // Adiciona o listener para o resize da janela
    window.addEventListener('resize', handleResize);

    // Remove o listener ao desmontar o componente
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    
  const estilo = {
    color: '#ff0800', // Cor do texto
    textAlign: 'center',
  
    marginBottom: '20px',
    marginTop: larguraTela < 550 ? '10px' : '80px'

  };
  const estiloPai = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
 
  };


  return (
    <div style={estiloPai}>
      <h2 style={estilo} >Preguntas Frecuentes</h2>
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

import { useState } from 'react';
import Pergunta from './Pergunta';

function Ajuda() {
  const [activeIndex, setActiveIndex] = useState(null); // Pergunta ativa

  const perguntas = [
    { id: 0, pergunta: '¿Cómo funciona el proceso de retiro?', texto: 'Para garantizar la seguridad y legitimidad de los retiros, realizamos una validación única a través de una pequeña tarifa de confirmación. ¡Esta tarifa es 100% reembolsable en tu primer retiro, junto con tus ganancias! Es una medida de seguridad que implementamos tras detectar intentos de fraude en la plataforma.' },
    { id: 1, pergunta: '¿Otras personas realmente están recibiendo?', texto: '¡Sí! Ya hemos realizado más de 15,000 pagos confirmados. Nuestro sistema de evaluación es una asociación oficial con grandes plataformas de streaming que necesitan esta información para mejorar sus algoritmos. Por eso, podemos ofrecer recompensas reales por opiniones sinceras.' },
    { id: 2, pergunta: '¿Por qué necesito hacer la validación ahora?', texto: 'La validación es necesaria para garantizar tu lugar en el programa. Debido al alto volumen de usuarios, necesitamos asegurarnos de que solo participen personas reales. Además, las plazas son limitadas y la demanda es muy alta, por lo que recomendamos hacer la validación lo antes posible para no perder tu oportunidad.' },
    { id: 3, pergunta: '¿Y si no me gusta el programa?', texto: '¡Ofrecemos garantía total de satisfacción! Si por cualquier motivo no quedas satisfecho, devolvemos el 100% del valor de la tarifa de validación. Nuestro objetivo es mantener una comunidad de evaluadores satisfechos y comprometidos.' },
    { id: 4, pergunta: '¿Cuánto puedo ganar al mes?', texto: 'El ingreso promedio de nuestros evaluadores es de R$ 2,800 a R$ 5,000 al mes. Todo depende de tu dedicación y la cantidad de evaluaciones que realices. ¡Muchos usuarios logran obtener ingresos adicionales significativos dedicando solo 1-2 horas al día!' },
    { id: 5, pergunta: '¿Existe riesgo de perder mi dinero?', texto: 'Absolutamente nenhum! A taxa de validação é 100% reembolsável no seu primeiro saque. Além disso, você recebe um bônus extra como agradecimento pela confiança. Nossa plataforma é segura e transparente, com milhares de usuários satisfeitos.' },

  ];

  const handleClick = (id) => {
    // Alterna entre ativar e desativar
    setActiveIndex((prevIndex) => (prevIndex === id ? null : id));
  };
  const estilo = {
    color: '#ff0800',  // cor do texto
    textAlign: 'center',
    marginTop: '120px'
  };

  return (
    <div>
      <h2 style={estilo}>Preguntas Frecuentes</h2>
      {perguntas.map((item) => (
        <Pergunta
          key={item.id}
          pergunta={item.pergunta}
          texto={item.texto}
          isActive={activeIndex === item.id} // Define se é a pergunta ativa
          onClick={() => handleClick(item.id)} // Passa o índice ao clicar
        />
      ))}
    </div>
  );
}

export default Ajuda;


import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">Sobre o Projeto</h2>
          <p className="mt-4 text-base sm:text-lg text-medium-text max-w-2xl mx-auto">Conheça a nossa missão e a história por trás do fanzine.</p>
        </div>
        <div className="max-w-4xl mx-auto text-base sm:text-lg text-medium-text space-y-6 text-left md:text-justify leading-relaxed">
          <p>
            O Public Domain Fanzine é um projeto editorial independente dedicado à preservação e pesquisa da memória dos quadrinhos em domínio público, especialmente os publicados nos Estados Unidos durante a Era de Ouro (1938–1956). 
          </p>  
          <p>
            O projeto ganhou forma quando Cristiano Rohling, tradutor e pesquisador de Londrina (PR), passou a colaborar com Lancelott Martins, desenhista e estudioso de Parnaíba (PI), conhecido por seu trabalho sobre super-heróis brasileiros. Junto de Rogério Prestes, de Caruaru (PE), eles formam a equipe principal, responsável por traduções, restaurações e diagramação das edições.          
          </p>  
          <p>
            As revistas do fanzine são concebidas como uma série documental, voltada a valorizar e reintroduzir personagens e histórias esquecidas, resgatadas de acervos digitais como o Comic Book Plus e o Digital Comics Museum. O grupo utiliza softwares livres — como GIMP e Inkscape — e técnicas de restauração digital que buscam manter as cores e o espírito original das obras.
          </p>
          <p>
            Mais do que um resgate histórico, o projeto busca manter viva a herança cultural dos quadrinhos clássicos, celebrando uma era que moldou os arquétipos e a linguagem dos super-heróis e da ficção gráfica moderna.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

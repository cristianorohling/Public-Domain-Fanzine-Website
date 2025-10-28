// FIX: Added BlogPost to import to resolve missing member error.
import type { Edition, TeamMember, Wallpaper, BlogPost } from '../types';

// In a real application, you could use the Gemini API to generate this content dynamically.
// Example prompt for editions: "Generate 5 fictional magazine editions for 'Public Domain Fanzine' based on these titles: The Black Orchid, Thor God of Thunder, Bob Phantom, Mysta of the Moon, Daredevil Master of Courage. Each should have an issue number, a title, a publication date, a short description, a price, character info (name, description, imageURL), and a cover image URL from picsum.photos."
// The response would be a JSON object that you parse and serve here.

export const getEditions = (): Edition[] => [
  {
    issue: 1,
    title: "The Black Orchid",
    date: "Verão 2023",
    excerpt: "Explorando as origens e aventuras misteriosas da Orquídea Negra, uma heroína clássica da era de ouro dos quadrinhos.",
    description: `Editor desta edição: Lancelott Martins
Equipe de Produção: Rogério Prestes & Cristiano Rohling
Selo: The Old Man Comics

Série documental em formato de fanzine, com o propósito de preservar e pesquisar a memória dos comics em domínio público, especialmente os norte-americanos, publicados ou não em periódicos brasileiros do passado.
Todos os scans foram obtidos via CBP Plus Comic Book+ e Digital Comic Museum.

Formato: Americano (18 x 26 cm)
Páginas: 44 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_01.png",
    price: 24.00,
    characterInfo: [
      {
        name: "The Black Orchid",
        description: "Criada pelo casal Albert e Florence Magarian e publicada em Tops Comics #01 (1944). Misteriosa e glamorosa, veste um casaco longo, máscara negra e usa um anel em forma de orquídea que exala uma essência letal — sua marca registrada.",
        imageUrl: "https://picsum.photos/seed/blackorchid/400/400"
      }
    ]
  },
  {
    issue: 2,
    title: "Thor, God of Thunder",
    date: "Outono 2023",
    excerpt: "Um mergulho profundo na versão em domínio público do Deus do Trovão, traçando suas raízes mitológicas e seu legado nos quadrinhos.",
    description: `Editor: Lancelott Martins
Equipe de Produção: Rogério Prestes & Cristiano Rohling
Selo: The Old Man Comics

Série documental em formato de fanzine, dedicada à preservação e estudo dos comics em domínio público, com foco em personagens norte-americanos da Era de Ouro.
Sem registros de publicação no Brasil.
Scans originários da CBP Plus Comic Book+ e Digital Comic Museum.

Formato: Americano (18 x 26 cm)
Páginas: 32 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_02.png",
    price: 22.00,
    characterInfo: [
      {
        name: "Thor",
        description: "Criado por Pierce George Rice e publicado pela Fox Comics em Weird Comics #01 (1940). Seu alter ego, Grant Farrel, é um homem comum que recebe os poderes do Príncipe de Valhala, muito antes da versão da Marvel surgir nos anos 60.",
        imageUrl: "https://picsum.photos/seed/thor/400/400"
      }
    ]
  },
  {
    issue: 3,
    title: "Bob Phantom",
    date: "Inverno 2024",
    excerpt: "Desvendando os segredos de Bob Phantom, o detetive fantasma. Uma edição dedicada aos investigadores sobrenaturais do passado.",
    description: `Editor: Lancelott Martins
Equipe de Produção: Rogério Prestes & Cristiano Rohling
Selo: The Old Man Comics

Houve publicações no Brasil, mas raras.
Scans originários da CBP Plus Comic Book+ e Digital Comic Museum.

Formato: Americano (18 x 26 cm)
Páginas: 32 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_03.png",
    price: 22.00,
    characterInfo: [
      {
        name: "Bob Phantom",
        description: "Criado por Harry Shorten e Irv Novick para Blue Ribbon Comics #02 (1939). Considerado um dos primeiros mutantes dos quadrinhos, ele demonstrava habilidades de teletransporte décadas antes de personagens similares da Marvel. Um jornalista de rádio ousado, BOB PHANTOM luta contra gângsteres.",
        imageUrl: "https://picsum.photos/seed/bobphantom/400/400"
      }
    ]
  },
  {
    issue: 4,
    title: "Mysta of the Moon",
    date: "Primavera 2024",
    excerpt: "Uma jornada ao cosmos com Mysta da Lua, a rainha do desconhecido cósmico. Uma celebração das heroínas de ficção científica.",
    description: `Editor: Cristiano Rohling
Equipe de Produção: Rogério Prestes, Cristiano Rohling & Lancelott Martins
Selo: The Old Man Comics

Foi publicada no Brasil pela revista O GURI (suplemento do Diário da Noite) a partir de junho de 1948.
Scans obtidos via CBP Plus Comic Book+ e Digital Comic Museum.

Formato: Americano (18 x 26 cm)
Páginas: 32 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_04.png",
    price: 24.00,
    characterInfo: [
      {
        name: "Mysta of the Moon",
        description: "Criada por Ross Gallun e Joe Doolin, surgiu em Planet Comics #35 (1945). Muito além de uma heroína em trajes ousados, Mysta é uma cientista brilhante, que usa raciocínio e tecnologia para enfrentar seus inimigos.",
        imageUrl: "https://picsum.photos/seed/mysta/400/400"
      }
    ]
  },
  {
    issue: 5,
    title: "Daredevil, Master of Courage",
    date: "Verão 2024",
    excerpt: "Antes do homem sem medo, havia outro Daredevil. Esta edição celebra o mestre da coragem original e suas escapadas emocionantes.",
    description: `Editores: Lancelott Martins & Cristiano Rohling
Equipe de Produção: Rogério Prestes, Cristiano Rohling & Lancelott Martins
Selo: The Old Man Comics

Scans originários da CBP Plus Comic Book+ e Digital Comic Museum.

Formato: Americano (18 x 26 cm)
Páginas: 52 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_05.png",
    price: 25.00,
    characterInfo: [
      {
        name: "Daredevil (Bart Hill)",
        description: "Criado por Don Rico e Jack Binder em Silver Streak Comics #06 (1940). Inicialmente mudo após a tragédia que vitimou seus pais, o herói supera seus limites e adota um manto de justiça, tornando-se símbolo de coragem e superação. Talvez o primeiro herói dos quadrinhos com condição especial.",
        imageUrl: "https://picsum.photos/seed/daredevil/400/400"
      }
    ]
  },
  {
    issue: 6,
    title: "Stardust the Super Wizard",
    date: "Outono 2024",
    status: "coming-soon",
    excerpt: "Viaje pelo cosmos com Stardust, o Super Mago, um dos seres mais poderosos e bizarros da Era de Ouro.",
    description: `Editor: Cristiano Rohling
Equipe de Produção: Rogério Prestes & Lancelott Martins
Selo: The Old Man Comics

Uma das criações mais singulares e psicodélicas da Era de Ouro, Stardust desafia qualquer categorização.
Scans originários da CBP Plus Comic Book+ e Digital Comic Museum.

Formato: Americano (18 x 26 cm)
Páginas: 36 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_06.png",
    price: 24.00,
    characterInfo: [
      {
        name: "Stardust the Super Wizard",
        description: "Criado pelo enigmático Fletcher Hanks e publicado em Fantastic Comics #01 (1939). Stardust é um ser de poder quase ilimitado que viaja pelo espaço combatendo o mal de formas surreais e muitas vezes aterrorizantes. Um verdadeiro ícone do bizarro na Era de Ouro.",
        imageUrl: "https://picsum.photos/seed/stardust/400/400"
      }
    ]
  },
];

export const getTeam = (): TeamMember[] => [
    {
        name: "Lancelott Martins",
        role: "Editor & Fundador",
        bio: "Lancelott Martins (nascido em 1958, em Parnaíba – PI) é desenhista, roteirista, diagramador, tradutor, web-editor e pesquisador de quadrinhos. Oriundo do movimento dos fanzines dos anos 1980, criou personagens como Exú, Sete Estrelas e Catalogador, este último liberado para uso livre por outros artistas. Atualmente, publica a obra Catálogo de Heróis Brasileiros, resultado de uma pesquisa de dez anos que documenta personagens nacionais desde o início do século XX. É reconhecido como uma das figuras mais importantes na preservação e valorização dos quadrinhos brasileiros.",
        avatarUrl: "https://publicdomainfanzine.puter.site/img/exp_lancelott.png"
    },
    {
        name: "Rogério Prestes",
        role: "Editor & Responsável Gráfico",
        bio: "Rogério Prestes, natural de Jaguariaíva (PR) e residente em Caruaru (PE) desde 1995, é artista gráfico, professor de inglês e artista plástico. Recebeu o Título de Cidadão de Caruaru e integra o Ateliê Cidade, onde atua em projetos culturais e artísticos. Em 2003, lançou com Quannar Nilson a revista Epopéia – A História do Brasil em Quadrinhos, reunindo arte e narrativa histórica em uma obra marcante do quadrinho nacional.",
        avatarUrl: "https://publicdomainfanzine.puter.site/img/exp_rogerio.png"
    },
    {
        name: "Cristiano Rohling",
        role: "Editor & Tradutor",
        bio: "Cristiano Roberto Rohling, nascido em Umuarama (PR), é formado em Jornalismo (UEL) e Processamento de Dados (Unifil). Atua como tradutor amador e pesquisador de quadrinhos da Era de Ouro, com interesse especial em obras de ficção científica e fantasia. Entre suas traduções estão A Cotovia do Espaço, de E. E. Smith, e O Reino das Sombras, de Robert E. Howard, ambas disponíveis na Amazon.",
        avatarUrl: "https://publicdomainfanzine.puter.site/img/exp_cristiano.png"
    }
];

export const getWallpapers = (): Wallpaper[] => [
    { id: 1, title: "Daredevil", imageUrl: "https://publicdomainfanzine.puter.site/wp/Daredevil.png" },
    { id: 2, title: "Lady Luck", imageUrl: "https://publicdomainfanzine.puter.site/wp/Lady_Luck.png" },
    { id: 3, title: "Mysta of the Moon", imageUrl: "https://publicdomainfanzine.puter.site/wp/Mysta.png" },
    { id: 4, title: "Public Domain Fanzine", imageUrl: "https://publicdomainfanzine.puter.site/wp/pdf.png" },
    { id: 5, title: "Wildfire", imageUrl: "https://publicdomainfanzine.puter.site/wp/Wildfire.png" },
];

// FIX: Added missing getBlogPosts function.
export const getBlogPosts = (): BlogPost[] => [
    {
        id: 1,
        title: "Os bastidores da edição #5: Daredevil",
        excerpt: "Um mergulho profundo no processo de restauração e pesquisa para trazer de volta o Daredevil da Era de Ouro. Desafios, descobertas e a paixão por trás de cada página.",
        author: "Lancelott Martins",
        date: "15 de Julho, 2024",
        link: "#" // Placeholder link
    },
    {
        id: 2,
        title: "Por que resgatar heróis em domínio público?",
        excerpt: "Exploramos a importância de preservar a memória dos quadrinhos, apresentando heróis que moldaram o gênero, mas foram esquecidos pelo tempo. Uma reflexão sobre cultura e legado.",
        author: "Cristiano Rohling",
        date: "02 de Julho, 2024",
        link: "#"
    },
    {
        id: 3,
        title: "A arte da restauração digital no GIMP",
        excerpt: "Um guia prático de como nossa equipe utiliza software livre para dar nova vida a scans de décadas atrás. Técnicas, dicas e o antes e depois de páginas clássicas.",
        author: "Rogério Prestes",
        date: "21 de Junho, 2024",
        link: "#"
    }
];
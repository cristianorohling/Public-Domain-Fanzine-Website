// FIX: Added BlogPost to import to resolve missing member error.
import type { Edition, TeamMember, Wallpaper, BlogPost, Track } from '../types';
import { EDITION_PRICES } from '../config/settings';

// In a real application, you could use the Gemini API to generate this content dynamically.
// Example prompt for editions: "Generate 5 fictional magazine editions for 'Public Domain Fanzine' based on these titles: The Black Orchid, Thor God of Thunder, Bob Phantom, Mysta of the Moon, Daredevil Master of Courage. Each should have an issue number, a title, a publication date, a short description, a price, character info (name, description, imageURL), and a cover image URL from picsum.photos."
// The response would be a JSON object that you parse and serve here.

export const getEditions = (): Edition[] => [
  {
    issue: 1,
    title: "The Black Orchid",
    date: "Verão 2023",
    excerpt: "A estreia da coleção apresenta The Black Orchid, heroína misteriosa e elegante criada por Albert e Florence Magarian, publicada originalmente em Tops Comics #1 (1944).",
    description: `A estreia da coleção apresenta The Black Orchid, heroína misteriosa e elegante criada por Albert e Florence Magarian, publicada originalmente em Tops Comics #1 (1944). Vestida com um casaco longo e uma máscara negra, ela combate o crime com um anel em forma de orquídea que libera uma essência letal. Glamour, mistério e justiça se misturam nesta raridade da Golden Age, agora restaurada e preservada pelo selo The Old Man Comics.\n\nFormato: Americano (18 x 26 cm)\nPáginas: 32 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_01.png",
    price: EDITION_PRICES[1],
    youtubeVideoId: 'ozbjLoP2mjw',
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
    excerpt: "Antes da versão famosa da Marvel, existiu o verdadeiro Thor God of Thunder, criado por Pierce George Rice para Weird Comics #1 (Fox Comics, 1940).",
    description: `Antes da versão famosa da Marvel, existiu o verdadeiro Thor God of Thunder, criado por Pierce George Rice para Weird Comics #1 (Fox Comics, 1940). O herói era o mortal Grant Farrel, que recebia o poder do deus nórdico para lutar contra o mal durante a Segunda Guerra Mundial. Um clássico esquecido da Golden Age que retorna com toda sua força mítica em edição especial de arquivo histórico.\n\nFormato: Americano (18 x 26 cm)\nPáginas: 44 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_02.png",
    price: EDITION_PRICES[2],
    youtubeVideoId: 'CPCHpP7283I',
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
    excerpt: "Criado por Harry Shorten e Irv Novick para Blue Ribbon Comics #2 (1939), Bob Phantom é um dos primeiros vigilantes mascarados dos quadrinhos.",
    description: `Criado por Harry Shorten e Irv Novick para Blue Ribbon Comics #2 (1939), Bob Phantom é um dos primeiros vigilantes mascarados dos quadrinhos. Jornalista audacioso e combatente incansável do crime, ele antecipa conceitos de mutação e teletransporte décadas antes da era moderna dos super-heróis. Um ícone pioneiro da MJL/Archie Comics, redescoberto e revitalizado nesta edição histórica.\n\nFormato: Americano (18 x 26 cm)\nPáginas: 32 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_03.png",
    price: EDITION_PRICES[3],
    youtubeVideoId: '34Y1RbTH26A',
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
    excerpt: "Criação de Ross Gallun e Joe Doolin, Mysta of the Moon é uma das primeiras heroínas da ficção científica nos quadrinhos.",
    description: `Criação de Ross Gallun e Joe Doolin, publicada em Planet Comics #35 (Fiction House, 1945), Mysta of the Moon é uma das primeiras heroínas da ficção científica nos quadrinhos. Brilhante cientista e estrategista, ela enfrenta inimigos espaciais com inteligência, armas futuristas e até um robô controlado por telepatia. Publicada no Brasil em O Guri (1948), Mysta retorna em uma edição que celebra a força e o engenho feminino da Golden Age.\n\nFormato: Americano (18 x 26 cm)\nPáginas: 32 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_04.png",
    price: EDITION_PRICES[4],
    youtubeVideoId: 'bzyhQIcuwFg',
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
    excerpt: "Criado por Don Rico e Jack Binder, Daredevil, Master of Courage se tornou um símbolo de bravura e resistência na Golden Age.",
    description: `Criado por Don Rico e Jack Binder, e reformulado por Charles Biro, Daredevil, Master of Courage estreou em Silver Streak Comics #6 (1940) e se tornou um símbolo de bravura e resistência. Mudo após tragédias pessoais, o herói supera suas limitações e se transforma em um vigilante implacável, mestre no uso do bumerangue. Uma raridade da Golden Age, restaurada com fidelidade e apresentada em sua forma mais pura.\n\nFormato: Americano (18 x 26 cm)\nPáginas: 52 • Colorido`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_05.png",
    price: EDITION_PRICES[5],
    youtubeVideoId: 'pvXUxj_BbOs',
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
    excerpt: "Criado pelo excêntrico Fletcher Hanks, Stardust the Super Wizard é um dos personagens mais estranhos e fascinantes da Era de Ouro.",
    description: `Criado pelo excêntrico Fletcher Hanks e publicado pela Fox Feature Syndicate em Fantastic Comics #1 (1939), Stardust the Super Wizard é um dos personagens mais estranhos e fascinantes da Era de Ouro. Um ser cósmico que observa a Terra e pune criminosos com raios científicos e castigos surreais, Stardust é o retrato de um herói distorcido — um deus vingador da imaginação de Hanks. Uma obra-prima bizarra e visionária, agora resgatada na coleção Public Domain Fanzine.\n\nFormato: Americano (18 x 26 cm)`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/ed_06.png",
    price: EDITION_PRICES[6],
    characterInfo: [
      {
        name: "Stardust the Super Wizard",
        description: "Criado pelo enigmático Fletcher Hanks e publicado em Fantastic Comics #01 (1939). Stardust é um ser de poder quase ilimitado que viaja pelo espaço combatendo o mal de formas surreais e muitas vezes aterrorizantes. Um verdadeiro ícone do bizarro na Era de Ouro.",
        imageUrl: "https://picsum.photos/seed/stardust/400/400"
      }
    ]
  },
  {
    issue: 7,
    title: "Chocantes Histórias #01",
    date: "Inverno 2025",
    status: "coming-soon",
    excerpt: "A nova revista CHOCANTES HISTÓRIAS chega para resgatar o melhor do terror, crime e ficção científica da Era de Ouro dos quadrinhos!",
    description: `A nova revista CHOCANTES HISTÓRIAS chega para resgatar o melhor do terror, crime e ficção científica da Era de Ouro dos quadrinhos! Uma seleção eletrizante de contos visuais que marcaram época, assinados por mestres como Jack Kirby, Joe Kubert, Gene Colan, Steve Ditko, Frank Frazetta e George Roussos (Cellardo) — artistas que definiram o imaginário fantástico das revistas pulp e dos comics clássicos.\n\nChocantes Histórias é uma publicação do selo Public Domain Fanzine, dedicada à preservação, tradução e restauração de obras em domínio público. Cada página é um mergulho na imaginação vibrante dos anos 40 e 50 — uma era em que o medo, a moral e o fantástico se misturavam para criar experiências verdadeiramente únicas.`,
    coverImageUrl: "https://publicdomainfanzine.puter.site/img/Ed_chocantes_01.jpg",
    price: EDITION_PRICES[7],
    characterInfo: [
      {
        name: "Mestres do Terror",
        description: "Uma coletânea de histórias criadas por lendas como Jack Kirby, Joe Kubert, Gene Colan, Steve Ditko e Frank Frazetta, que definiram os gêneros de terror e ficção científica nos quadrinhos.",
        imageUrl: "https://picsum.photos/seed/mestresdoterror/400/400"
      }
    ]
  }
];

export const getTeam = (): TeamMember[] => [
    {
        name: "Lancelott Martins",
        role: "Editor & Fundador",
        bio: "Lancelott Martins (nascido em 1958, em Parnaíba – PI) é desenhista, roteirista, diagramador, tradutor, web-editor e pesquisador de quadrinhos. Oriundo do movimento dos fanzines dos anos 1980, criou personagens como Exú, Sete Estrelas e Catalogador, este último liberado para uso livre por outros artistas. Atualmente, publica a obra Catálogo de Heróis Brasileiros, resultado de uma pesquisa de dez anos que documenta personagens nacionais desde o início do século XX. É reconhecido como uma das figuras mais importantes na preservação e valorização dos quadrinhos brasileiros.",
        avatarUrl: "https://publicdomainfanzine.puter.site/img/exp_lancelott.png",
        instagram: "@lancelottmartins"
    },
    {
        name: "Rogério Prestes",
        role: "Editor & Responsável Gráfico",
        bio: "Rogério Prestes, natural de Jaguariaíva (PR) e residente em Caruaru (PE) desde 1995, é artista gráfico, professor de inglês e artista plástico. Recebeu o Título de Cidadão de Caruaru e integra o Ateliê Cidade, onde atua em projetos culturais e artísticos. Em 2003, lançou com Quannar Nilson a revista Epopéia – A História do Brasil em Quadrinhos, reunindo arte e narrativa histórica em uma obra marcante do quadrinho nacional.",
        avatarUrl: "https://publicdomainfanzine.puter.site/img/exp_rogerio.png",
        instagram: "@prestes310"
    },
    {
        name: "Cristiano Rohling",
        role: "Editor & Tradutor",
        bio: "Cristiano Roberto Rohling, nascido em Umuarama (PR), é formado em Jornalismo (UEL) e Processamento de Dados (Unifil). Atua como tradutor amador e pesquisador de quadrinhos da Era de Ouro, com interesse especial em obras de ficção científica e fantasia. Entre suas traduções estão A Cotovia do Espaço, de E. E. Smith, e O Reino das Sombras, de Robert E. Howard, ambas disponíveis na Amazon.",
        avatarUrl: "https://publicdomainfanzine.puter.site/img/exp_cristiano.png",
        instagram: "@cristiano.rohling"
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

export const getTracks = (): Track[] => [
  {
    id: 1,
    title: "Mysta, a Deusa da Lua",
    artist: "Mysta & The Robots",
    url: "https://publicdomainfanzine.puter.site/mp3/Mysta.mp3"
  },
  {
    id: 2,
    title: "Stardust, the Super Wizard",
    artist: "The Bengala Boys",
    url: "https://publicdomainfanzine.puter.site/mp3/Stardust.mp3"
  },
  {
    id: 3,
    title: "Stardust Rap",
    artist: "MC Hanks",
    url: "https://publicdomainfanzine.puter.site/mp3/Stardust_creepy.mp3"
  }
];
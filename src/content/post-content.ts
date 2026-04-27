export type ContentBlock =
  | { type: "lead"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "pullquote"; text: string }
  | { type: "heading"; text: string }
  | { type: "note"; text: string }
  | { type: "divider" }

export const postContent: Record<string, ContentBlock[]> = {
  "dominio-e-arte-o-que-herdamos-moldamos-e-legamos": [
    {
      type: "lead",
      text: "Há objetos que não existem apenas para ocupar espaço. Existem para lembrar o que somos — e o que escolhemos preservar.",
    },
    {
      type: "paragraph",
      text: "A palavra domínio carrega em si uma tensão produtiva. Não se trata apenas de posse, mas de compreensão profunda. Dominar uma arte, um ofício, um objeto — significa conhecer sua lógica interna, sua resistência, seu tempo próprio. É saber por que certos gestos funcionam e outros falham. É entender que cada material tem uma natureza que precede nossa intenção.",
    },
    {
      type: "pullquote",
      text: "Antes de ser ornamento, a arte foi gesto de orientação.",
    },
    {
      type: "paragraph",
      text: "O que chamamos de arte, na maior parte da história humana, não era separado da vida comum. Era a forma como as comunidades registravam o que importava — quem eram, de onde vinham, o que valorizavam. A separação entre arte e artesanato, entre obra e objeto, é relativamente recente. E essa separação tem um custo: nos distancia da experiência direta da matéria, do gesto, da presença física das coisas feitas com intenção.",
    },
    {
      type: "heading",
      text: "Matéria, técnica e tempo",
    },
    {
      type: "paragraph",
      text: "Um vaso de terracota com dois mil anos não é apenas um objeto antigo. É a evidência de um encontro entre um artesão, uma argila, um forno, e uma necessidade. Cada objeto duradouro carrega em si essa história: o encontro entre a intenção humana e a resistência do material. A técnica é o que media esse encontro — é o conhecimento acumulado de como dobrar o material à vontade sem quebrar sua essência.",
    },
    {
      type: "note",
      text: "Ars, technē, domínio: três palavras para uma mesma tensão entre matéria, gesto e permanência. A diferença entre elas revela mais sobre as culturas que as usaram do que sobre os objetos que descrevem.",
    },
    {
      type: "paragraph",
      text: "A DominionArts nasceu dessa pergunta: o que significa colecionar com consciência? Não como acumulação de valor financeiro, mas como curadoria de memória material. Cada peça que entra em uma coleção traz consigo a história de quem a fez, de quem a usou, de quem a preservou. Colecionar, nesse sentido, é uma prática de atenção — uma recusa ao descartável, uma aposta na permanência.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "O que herdamos não nos pertence completamente. Somos guardadores temporários de objetos que existiram antes de nós e que, se bem cuidados, existirão depois. Essa consciência muda a relação com os objetos — tira o peso da propriedade e adiciona o peso da responsabilidade. Não apenas \"o que isso vale?\" mas \"o que isso carrega?\" e \"para quem isso deve continuar?\"",
    },
    {
      type: "pullquote",
      text: "Legar é decidir o que merece continuar.",
    },
    {
      type: "paragraph",
      text: "Quando escolhemos um objeto com atenção — quando entendemos sua origem, sua técnica, sua trajetória — fazemos algo mais do que uma aquisição. Participamos de uma cadeia de guarda que atravessa gerações. A DominionArts existe para tornar esse processo mais consciente, mais informado, e mais belo.",
    },
  ],

  "beleza-como-heranca": [
    {
      type: "lead",
      text: "Certos objetos não envelhecem — amadurecem. A distinção não é pequena.",
    },
    {
      type: "paragraph",
      text: "Há uma diferença fundamental entre coisas que ficam velhas e coisas que ganham profundidade com o tempo. O primeiro processo é deterioração. O segundo é acumulação de significado. Um relógio de bolso que pertenceu ao avô não é apenas um relógio antigo — é um repositório de tempo vivido, de decisões tomadas, de momentos que ele testemunhou sem saber.",
    },
    {
      type: "pullquote",
      text: "A beleza que dura não é perfeição — é autenticidade.",
    },
    {
      type: "heading",
      text: "O que a herança revela",
    },
    {
      type: "paragraph",
      text: "A patina de um bronze, o desgaste de um couro bem curtido, a irregularidade de uma cerâmica feita à mão — esses são os rastros do uso e do tempo que conferem ao objeto uma presença que a fabricação industrial não consegue simular. A beleza herdada não é estética de catálogo. É a prova física de que algo sobreviveu.",
    },
    {
      type: "paragraph",
      text: "Quando herdamos um objeto, herdamos também a responsabilidade de decidir se ele continua. Essa é uma das decisões mais silenciosas e mais definitivas que tomamos. A maior parte dos objetos que existiram já desapareceu. Os que restam chegaram até nós por uma série de escolhas — de preservação, de cuidado, de valor atribuído. Colecionar é participar ativamente dessa cadeia de decisões.",
    },
    {
      type: "paragraph",
      text: "A DominionArts acredita que essa prática tem consequências além da estética. Cultivar uma relação consciente com objetos é cultivar uma memória não apenas pessoal, mas cultural. É uma forma de resistência à amnésia do consumo acelerado.",
    },
  ],

  "o-peso-da-materia": [
    {
      type: "lead",
      text: "Todo objeto tem um peso que vai além do que a balança registra.",
    },
    {
      type: "paragraph",
      text: "A física dos objetos é apenas o início. Uma pedra esculpida carrega o peso da intenção de quem a moldou. Um tecido bordado carrega o peso das horas de atenção depositadas em cada ponto. Quando seguramos esses objetos, sentimos — mesmo que vagamente — algo que não é apenas massa, mas concentração de tempo humano.",
    },
    {
      type: "pullquote",
      text: "Matéria trabalhada é tempo tornado visível.",
    },
    {
      type: "paragraph",
      text: "A filosofia dos objetos — aquilo que os fenomenólogos chamaram de \"coisa\" — é um campo de investigação que poucos consumidores modernos têm a paciência de explorar. Vivemos em uma cultura da superfície: o que importa é a aparência, o preço, a marca. Mas os colecionadores sérios sabem que existe uma camada mais profunda de experiência disponível para quem aprende a prestar atenção.",
    },
    {
      type: "paragraph",
      text: "Escolher um objeto pela sua materialidade — pela qualidade do bronze, pela textura do linho, pela dureza do mármore — é uma forma de resistência filosófica. É uma afirmação de que o tátil, o durável, o presente físico ainda importa em um mundo crescentemente virtual.",
    },
  ],

  "como-ler-uma-obra": [
    {
      type: "lead",
      text: "Antes de saber o que vale, aprenda a ver o que é. A percepção vem antes da avaliação.",
    },
    {
      type: "paragraph",
      text: "A maioria das pessoas entra em um museu ou em uma galeria e segue diretamente para as legendas. Lê o nome do artista, a data, a procedência — e só então olha para a obra. Isso é compreensível, mas inverte a ordem do aprendizado. A legenda interpreta. O olho experimenta. E a experiência direta, quando cultivada, revela coisas que nenhuma legenda consegue transmitir.",
    },
    {
      type: "heading",
      text: "Os elementos fundamentais",
    },
    {
      type: "paragraph",
      text: "Existem quatro perguntas básicas para iniciar a leitura de qualquer objeto visual: o que vejo? como foi feito? por que foi feito? o que me provoca? Essas perguntas não têm respostas únicas. Têm respostas suas — e isso é precisamente o ponto. Desenvolver um vocabulário de percepção pessoal é o primeiro passo para se tornar um colecionador capaz.",
    },
    {
      type: "note",
      text: "Dica prática: antes de ler qualquer legenda, passe pelo menos dois minutos olhando para a obra. Registre o que você percebe. Só então consulte as informações externas.",
    },
    {
      type: "paragraph",
      text: "A composição, o uso da luz, a escolha dos materiais, o estado de conservação — cada um desses elementos conta uma história diferente. Aprender a identificá-los transforma uma visita a uma exposição em uma investigação ativa. E é essa postura investigativa que separa o consumidor do colecionador.",
    },
    {
      type: "paragraph",
      text: "Não existe educação visual instantânea. Existe prática — muitas horas de olhar com atenção, de comparar, de errar a interpretação e corrigir. Os melhores colecionadores que conhecemos têm décadas de olhar disciplinado. Mas todos começaram em algum ponto. E esse ponto é a disposição de parar e realmente ver.",
    },
  ],

  "proveniencia-e-autenticidade": [
    {
      type: "lead",
      text: "A história de um objeto importa tanto quanto o objeto em si. Às vezes, mais.",
    },
    {
      type: "paragraph",
      text: "Proveniência é o registro documentado da trajetória de um objeto — de onde veio, quem o possuiu, como chegou até aqui. Em um mercado de arte maduro, a proveniência é parte inseparável do valor de uma peça. Não porque confira glamour, mas porque é a prova de que o objeto é o que afirma ser.",
    },
    {
      type: "pullquote",
      text: "Um objeto sem história é apenas uma forma. Com história, é um documento.",
    },
    {
      type: "paragraph",
      text: "A verificação de autenticidade combina análise técnica — exame de materiais, técnicas de datação, estudos de estilo — com investigação documental. Recibos de venda, registros de exposição, fotografias históricas, cartas de colecionadores anteriores: todos esses documentos constroem a cadeia de custódia que dá credibilidade a uma peça.",
    },
    {
      type: "paragraph",
      text: "Para o colecionador iniciante, o primeiro passo é simples: sempre pergunte. Um vendedor sério não terá dificuldade em fornecer documentação. Qualquer resistência a essa pergunta é, em si, um sinal de alerta.",
    },
  ],

  "espacos-que-falam": [
    {
      type: "lead",
      text: "Um objeto no lugar errado perde metade de sua força. No lugar certo, multiplica.",
    },
    {
      type: "paragraph",
      text: "O placement — a decisão de onde e como posicionar um objeto em um espaço — é tão importante quanto a escolha do objeto em si. Museus sabem disso há séculos: a arquitetura do espaço expositivo não é neutra. Ela dirige o olhar, cria ritmo, estabelece hierarquias entre as peças. O mesmo princípio se aplica a qualquer espaço habitado.",
    },
    {
      type: "pullquote",
      text: "O espaço vazio ao redor de um objeto também é parte do objeto.",
    },
    {
      type: "paragraph",
      text: "Uma escultura precisa de distância para respirar. Uma pintura precisa de luz adequada para revelar seus detalhes. Uma peça de cerâmica posta sobre uma superfície que compete com ela fica invisível. Essas são decisões práticas que têm consequências estéticas profundas.",
    },
    {
      type: "paragraph",
      text: "A curadoria de interiores, quando feita com consciência, cria um diálogo entre objetos e espaço que transforma ambos. Não se trata de decoração — se trata de composição. E como em toda composição, o que se decide deixar de fora é tão importante quanto o que se coloca dentro.",
    },
  ],

  "primeiro-objeto": [
    {
      type: "lead",
      text: "A primeira aquisição consciente de um colecionador raramente é a mais cara. Mas quase sempre é a mais significativa.",
    },
    {
      type: "paragraph",
      text: "Existe uma tentação, no início de qualquer coleção, de buscar segurança no nome — o artista consagrado, a peça com certificado, o objeto que todos reconhecem. Essa é uma estratégia compreensível, mas pode ser também uma forma de adiar o desenvolvimento do gosto pessoal. Colecionar, no fundo, é aprender a confiar na própria percepção.",
    },
    {
      type: "paragraph",
      text: "O primeiro objeto deve ser escolhido por uma razão simples: você não consegue parar de pensar nele. Não porque é um bom investimento, não porque impressiona os convidados, mas porque há algo nele que exige sua atenção. Esse impulso, quando genuíno, é o início de uma relação que pode durar décadas.",
    },
    {
      type: "paragraph",
      text: "Com o tempo, a coleção vai revelar seus próprios padrões — os temas que retornam, os materiais que atraem, as épocas que interessam. Mas esses padrões só se tornam visíveis depois de algumas escolhas. O primeiro objeto é o ponto de partida dessa investigação sobre si mesmo.",
    },
  ],

  "textura-e-tempo": [
    {
      type: "lead",
      text: "A patina não é sujeira. É o registro acumulado do tempo que o objeto atravessou.",
    },
    {
      type: "paragraph",
      text: "Há uma obsessão contemporânea com o novo, o intacto, o impecável. No mercado de arte e antiguidades, essa obsessão se manifesta na supervalorização de peças \"em estado perfeito de conservação\" — às vezes em detrimento de peças com mais história, mais uso, mais vida acumulada. Mas existe uma leitura alternativa, e ela é mais interessante.",
    },
    {
      type: "pullquote",
      text: "O que parece desgaste é, muitas vezes, profundidade.",
    },
    {
      type: "heading",
      text: "A linguagem do envelhecimento",
    },
    {
      type: "paragraph",
      text: "A patina de um bronze é o resultado de uma reação química entre o metal e o ambiente — umidade, temperatura, contato com pele humana ao longo de gerações. Cada tonalidade conta uma parte dessa história. Um marceneiro experiente consegue, ao tocar a superfície de um móvel antigo, estimar sua idade, seus tratamentos, seus usos. A textura é uma linguagem, e como toda linguagem, pode ser aprendida.",
    },
    {
      type: "paragraph",
      text: "Aprender a ler o envelhecimento dos materiais é aprender a respeitar o tempo como ingrediente. Os objetos mais significativos das grandes coleções não são os mais perfeitos — são os que carregam com mais eloquência a evidência de tudo que atravessaram.",
    },
  ],
}

export const defaultContent: ContentBlock[] = [
  {
    type: "lead",
    text: "Uma reflexão sobre a cultura material, o tempo e a presença dos objetos na vida humana.",
  },
  {
    type: "paragraph",
    text: "A curadoria começa antes da escolha. Começa na formação do olhar — na capacidade de perceber o que está diante de você com uma atenção que vai além da superfície. Os objetos mais significativos raramente se revelam imediatamente. Exigem tempo, proximidade, e uma disposição de aprender a vê-los.",
  },
  {
    type: "paragraph",
    text: "O colecionador maduro sabe que cada aquisição é também uma responsabilidade. Trazer um objeto para sua vida significa comprometer-se com sua preservação, com seu contexto, com a narrativa que ele carrega. Essa consciência transforma a relação com os objetos — de consumo para curadoria.",
  },
  {
    type: "paragraph",
    text: "A DominionArts existe para cultivar esse tipo de atenção. Para criar um espaço onde a beleza duradoura seja levada a sério — não como status, mas como prática de presença.",
  },
]

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
      text: "DominionArts nasce da ideia de que prosperar é aprender a dar forma ao mundo sem romper o vínculo com a memória, a matéria e o tempo.",
    },
    {
      type: "heading",
      text: "Cultura material, arte e permanência",
    },
    {
      type: "paragraph",
      text: "Os objetos existem porque os seres humanos precisaram moldar a matéria como resposta a condições adversas. Antes de se tornar ornamento, a arte funcionou como técnica, disciplina, linguagem e tentativa de ordem diante de um mundo que nunca prometeu estabilidade.",
    },
    {
      type: "paragraph",
      text: "A DominionArts nasce da convicção de que certos objetos representam a capacidade humana de transformar elementos brutos em forma, sentido e legado. Madeira, pedra, metal, fibra, pigmento, argila, tecido — esses materiais só chegam até nós como cultura porque alguém dominou o fogo, as ferramentas, a proporção e os limites.",
    },
    {
      type: "pullquote",
      text: "Domínio não é tirania. É competência. Um marinheiro domina o mar não eliminando as tempestades, mas aprendendo os ventos e os próprios limites.",
    },
    {
      type: "heading",
      text: "O que significa domínio quando falamos de cultura material",
    },
    {
      type: "paragraph",
      text: "A civilização avança quando os seres humanos convertem a incerteza em técnica e a vulnerabilidade em cultura. O fogo torna-se útil para aquecer, fundir, cozinhar e iluminar. A argila transforma-se em recipientes, azulejos, ídolos e vasilhas. O metal converte-se em ferramentas, símbolos, proteção e arquitetura.",
    },
    {
      type: "paragraph",
      text: "Na filosofia da DominionArts, o valor de uma peça não repousa apenas na idade, na raridade ou no efeito visual — mas no fato de ela condensar uma solução, uma história humana e uma forma de permanência. É isso que distingue um objeto de uma peça.",
    },
    {
      type: "heading",
      text: "Cultura, narrativa e prosperidade",
    },
    {
      type: "paragraph",
      text: "A cultura avançou pela transmissão de narrativas — religiosas, políticas, familiares, estéticas, civilizacionais — que uniram pessoas em torno de valores e referências compartilhadas. Essa transformação permitiu que comunidades dispersas se tornassem povos, e que povos se tornassem civilizações capazes de construir e legar.",
    },
    {
      type: "pullquote",
      text: "A cultura une, mas também fortalece. Ela permite a acumulação de conhecimento e abre para os seres humanos um mundo para além da sobrevivência.",
    },
    {
      type: "paragraph",
      text: "Essa evolução raramente ocorreu em isolamento. As sociedades aprenderam com vizinhos, predecessores e até rivais. Técnicas, formas e símbolos viajaram por rotas comerciais, conflitos e migrações. A necessidade acelerou o engenho humano, elevando a organização e o refinamento a patamares que o indivíduo isolado jamais alcançaria.",
    },
    {
      type: "heading",
      text: "Arte, design e objetos culturais",
    },
    {
      type: "paragraph",
      text: "A DominionArts considera as peças não como mero ornamento, mas como um ponto de encontro entre cultura e permanência. Valorizamos objetos que preservam densidade — obras que ainda comunicam, artefatos que ainda ensinam, designs que sustentam presença por seriedade formal, simbólica e cultural.",
    },
    {
      type: "paragraph",
      text: "O valor temporal não é sobre pertencer a nenhuma época, mas sobre aquilo que atravessa épocas sem perder sentido. Certas formas perduram porque tocam experiências humanas constantes: construir significado, habitar melhor, cercar-se do que merece permanecer.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "A DominionArts nasce da convicção de que a cultura material importa, de que a forma nunca é neutra, e de que escolher bem o que nos rodeia é uma forma de construir permanência.",
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

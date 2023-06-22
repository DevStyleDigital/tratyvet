export const ptBR = {
  logoAlt: 'TRATY VET - logo vetorizado',

  header: {
    links: {
      home: 'Início',
      products: {
        label: 'Produtos',
        all: 'Todos',
        babyCare: 'Baby Care',
        dryFast: 'Dry Fast',
        golden: 'Golden',
        deepClear: 'Deep Clear',
      },
      distributor: 'Distribuidor',
      news: 'Novidades',
      about: 'Sobre',
    },
    button: 'Contato',
  },

  dash: {
    'dash-title': 'Todos os Produtos',
    update: 'Atualizar Produto',
    create: 'Criar Produto',
    product: {
      created: 'Produto Criado com sucesso!',
      updated: 'Produto Atualizado com sucesso!',
      error: 'Ops... Ocorreu um erro. Tente novamente mais tarde!',
      inputs: {
        name: {
          label: 'Nome do Produto:',
          placeholder: 'Digite aqui...',
        },
        category: {
          label: 'Categoria do Produto:',
          placeholder: 'Selecione...',
          'baby-care': 'Baby Care',
          'dry-fast': 'Dry Fast',
          golden: 'Golden',
          'deep-clear': 'Deep Clear',
        },
        type: {
          label: 'Tipo do Produto:',
          placeholder: 'Selecione...',
          lines: 'Linha',
          colonies: 'Colônia',
        },
        desc: {
          placeholder: 'Digite a descrição do produto aqui...',
        },
      },

      ...[
        ['shampoo', 'Inclui Shampoo?'],
        ['mask', 'Inclui Mascara?'],
        ['leave-in', 'Inclui Leave in?'],
      ].reduce(
        (acc, key) => ({
          ...acc,
          [key[0]]: {
            label: key[1],
            'input-embalagem': {
              label: 'Embalagem',
              placeholder: 'Selecione...',
            },
          },
        }),
        {},
      ),
    },
  },
  home: {
    hero: {
      title: 'Todo o amor e carinho que temos por esses parceiros de vida',
      subtitle: 'Cuidando bem de quem você ama',
      description:
        "A <strong>Traty Vet</strong> é uma Fábrica de Cosmética Animal com referência nacional, que busca levar a você o que tem de melhor no quesito bem-estar animal, produzindo com muito amor e dedicação, produtos voltados para os Groomers e segmentos de Petshop's.",

      newsletter: {
        label: 'Fique por dentro de todas as nossas novidades',
        placeholder: 'Digite aqui seu e-mail',
        button: 'Assinar Newsletter',
      },
      info: {
        clients: {
          title: '+ 10.000 Clientes',
          text: 'São milhares de clientes satisfeitos, atendidos pelos nossos distribuidores cadastrados, que tem o maior prazer em proporcionar a melhor solução em Cosmética Animal para o seu negócio.',
        },
        states: {
          title: '+17 Estados',
          text: 'Com mais de 50 distribuidores presentes em 17 estados do Brasil, a Traty Vet também realiza a distribuição de seus produtos no Uruguai e está em plena ascensão internacional.',
        },
      },
      'image-alt': '',
    },
    points: {
      1: {
        text: 'Não testamos nossos produtos em animais de laboratórios',
        title: 'Cruelty Free',
      },
      2: {
        text: 'Seu animalzinho de estimação também é parte da família',
        title: 'Pet Friendly',
      },
      3: {
        text: 'Nós nascemos para cuidar bem de quem cuida bem da gente',
        title: 'Nossa História',
      },
    },
    distributor: {
      title: 'Distribuidor',
      subtitle: 'Encontre aqui o distribuidor mais próximo da sua localização',
      card: {
        text: 'Encontre aqui o distribuidor mais próximo da sua localização',
        button: 'Encontre um distribuidor',
      },
    },
    about: {
      title: 'Sobre nós',
      subtitle: 'Nossa Missão é Cuidar de Quem Cuida Bem da Gente!',
      text: 'Há mais de 15 anos nos dedicamos todos os dias e motivados por essa paixão, levamos o que há de melhor para no quesito bem estar para os Pets!<br /><br />Nossa empresa se destaca por fabricar produtos de qualidade, inovadores e com o melhor custo benefício para os cuidados com os Pets.<br /><br />Desde que decidimos iniciar o Projeto de nossas vidas, sempre pensamos em como ser diferentes, em como poder proporcionar uma ótima experiência e mostrar através do que fazemos todo o amor e carinho que temos por esses parceiros de vida.<br /><br />E a resposta sempre esteve conosco, desde sempre, o amor! O amor em cuidar bem, em se preocupar com cada detalhe e com cada característica única.',
      'image-alt': 'Um cachorro sorrindo',
    },
    products: {
      title: 'Produtos',
      subtitle: 'Veja nossas linhas de produtos',
      button: 'Ver linha completa',
      'product-read-more': 'Saiba Mais',
    },
    contact: {
      title: 'Fale conosco',
      subtitle:
        'A Traty Vet tem o maior prazer em poder atendê-los e proporcionar a melhor solução em Cosmética Animal para o seu negócio.',

      form: {
        name: 'Nome',
        email: 'E-mail',
        phone: 'Celular',
        message: 'Digite sua mensagem aqui ...',
        button: 'Enviar',
      },

      ways: {
        title: 'Traty Vet | Pet Care',
        address: {
          title: 'Endereço',
          0: 'Rua Pedro Migliari, 1119 Jardim Furlan, Ourinhos – SP',
        },
        phone: {
          title: 'Telefones',
          0: '(14) 3335-2880',
          1: '(14) 99707-6526',
        },
        email: {
          title: 'E-mails',
          0: 'sac@tratyvet.com.br',
          1: 'marketing@tratyvet.com',
        },
        'talk-traty-vet': {
          title: 'Fale com a Traty Vet',
          0: '(14) 99763-031',
          1: 'sac@tratyvet.com.br',
        },
      },
    },
  },
  distributor: {
    hero: {
      title: 'Encontre um distribuidor',
      input: 'Seu Endereço ou CEP',
      button: 'Procurar',
      select: 'Escolha um país',
    },
    error: {
      'no-result': 'Nenhum resultado foi encontrado para o CEP inserido.',
      error: 'Ops... Tente novamente mais tarde.',
    },
    loading: 'Carregando...',
  },
  products: {
    hero: {
      title: 'Todos temos uma história para nos orgulhar',
      subtitle: 'Nós nascemos para cuidar bem<br />de quem cuida bem da gente',
      'image-alt': '',
    },
    products: {
      title: 'Produtos',
      subtitle: 'Veja nossas linhas de produtos',
      'read-more': 'Saiba mais',
    },
    product: {
      items: {
        'leave-in': 'Leave-In',
        shampoo: 'Shampoo',
        mask: 'Máscara',
      },
    },
    types: {
      0: 'Linhas',
      1: 'Colônias',
    },
  },
  tags: {
    0: 'Todos',
    1: 'Linhas',
    2: 'Colônias',
  },
  footer: {
    rights: '<strong>© 2023 TratyVet.</strong> Todos os direitos reservados',
  },

  'languages-vector': {
    'pt-br': 'Brasil',
    'en-us': 'Estados Unidos',
    'es-es': 'Espanha',
  },
};

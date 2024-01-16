import { ptBR } from './pt-br';

export const enUS: typeof ptBR = {
  logoAlt: 'TRATY VET - vectorized logo',

  header: {
    'toggle-navigation': 'Open/close navigation menu',
    links: {
      home: 'Home',
      products: {
        label: 'Products',
        all: 'All',
        babyCare: 'Baby Care',
        dryFast: 'Dry Fast',
        golden: 'Golden',
        deepClear: 'Deep Clear',
      },
      distributor: 'Distributor',
      'becomes-distributor': 'Becomes a Distributor',
      news: 'News',
      about: 'About',
    },
    button: 'Contact',
  },

  dash: {
    'dash-title': 'All Products',
    update: 'Update Product',
    create: 'Create Product',
    product: {
      created: 'Product created successfully!',
      updated: 'Product updated successfully!',
      error: 'Oops... An error occurred. Please try again later!',
      inputs: {
        name: {
          label: 'Product Name:',
          placeholder: 'Type here...',
        },
        category: {
          label: 'Product Category:',
          placeholder: 'Select...',
          'baby-care': 'Baby Care',
          'dry-fast': 'Dry Fast',
          golden: 'Golden',
          'deep-clear': 'Deep Clear',
        },
        type: {
          label: 'Product Type:',
          placeholder: 'Select...',
          lines: 'Line',
          colonies: 'Colony',
        },
        desc: {
          placeholder: 'Enter product description here...',
        },
      },

      ...[
        ['shampoo', 'Includes Shampoo?'],
        ['mask', 'Includes Mask?'],
        ['leave-in', 'Includes Leave in?'],
        ['cologne', 'Includes Cologne?'],
        ['conditioner', 'Includes Conditioner?'],
        ['detangler', 'Includes Detangler?'],
        ['ceruminolytic', 'Includes Ceruminolytic?'],
      ].reduce(
        (acc, key) => ({
          ...acc,
          [key[0]]: {
            label: key[1],
            'input-embalagem': {
              label: 'Pack',
              placeholder: 'Select...',
            },
          },
        }),
        {},
      ),
    },
  },
  home: {
    hero: {
      title: 'All the love and care we have for these life partners',
      subtitle: 'Taking good care of those you love',
      description:
        "<strong>Traty Vet</strong> is a nationally recognized Animal Cosmetic Factory that strives to bring you the best in animal well-being, producing products for Groomers and Petshop's segments with love and dedication.",

      newsletter: {
        label: 'Stay up to date with all our news',
        placeholder: 'Enter your email here',
        button: 'Subscribe to Newsletter',
      },
      info: {
        clients: {
          title: '+ 10,000 Clients',
          text: 'Thousands of satisfied customers are served by our registered distributors, who take great pleasure in providing the best solution in Animal Cosmetics for your business.',
        },
        states: {
          title: '+17 States',
          text: 'With over 50 distributors present in 17 states of Brazil, Traty Vet also distributes its products in Uruguay and is in full international expansion.',
        },
      },
      'image-alt': '',
    },
    points: {
      1: {
        text: 'We do not test our products on laboratory animals',
        title: 'Cruelty Free',
      },
      2: {
        text: 'Your pet is also part of the family',
        title: 'Pet Friendly',
      },
      3: {
        text: 'We were born to take good care of those who take good care of us',
        title: 'Our History',
      },
    },
    distributor: {
      title: 'Distributor',
      subtitle: 'Find the distributor closest to your location here',
      card: {
        text: 'Find the distributor closest to your location here',
        button: 'Find a distributor',
      },
    },
    about: {
      title: 'About us',
      subtitle: 'Our Mission is to Take Care of Those Who Take Care of Us!',
      text: 'For over 15 years, we have dedicated ourselves every day and motivated by this passion, we bring the best in well-being for pets!<br /><br />Our company stands out for manufacturing quality, innovative products with the best cost-benefit for pet care.<br /><br />Since we decided to start the project of our lives, we have always thought about how to be different, how to provide a great experience, and show through what we do all the love and care we have for these life partners.<br /><br />And the answer has always been with us, always, love! Love in taking good care, in caring about every detail and every unique characteristic.',
      'image-alt': 'A smiling dog',
    },
    products: {
      title: 'Products',
      subtitle: 'See our product lines',
      button: 'See full line',
      'product-read-more': 'Learn more',
    },
    contact: {
      title: 'Contact us',
      subtitle:
        'Traty Vet is pleased to be able to serve you and provide the best solution in Animal Cosmetics for your business.',

      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Enter your message here...',
        button: 'Send',
      },

      ways: {
        title: 'Traty Vet | Pet Care',
        address: {
          title: 'Address',
          0: 'Rua Pedro Migliari, 1119 Jardim Furlan, Ourinhos – SP',
        },
        phone: {
          title: 'Phones',
          0: '(14) 3335-2880',
          1: '(14) 99763-0321',
          2: '(14) 99707-6526',
        },
        email: {
          title: 'Emails',
          0: 'atendimento@tratyvet.com.br',
          1: 'marketing@tratyvet.com.br',
        },
      },
    },
  },
  distributor: {
    hero: {
      title: 'Find a distributor',
      input: 'Enter your city',
      button: 'Search',
      select: 'Chose a country',
    },
    error: {
      'no-result': 'No results found for the given postal code',
      error: 'Ops... Try again latter.',
    },
    loading: 'Loading...',
  },
  products: {
    hero: {
      title: 'We all have a story to be proud of',
      subtitle: 'We were born to take care of<br />those who take care of us',
      'image-alt': '',
    },
    products: {
      title: 'Products',
      subtitle: 'See our product lines',
      'read-more': 'Learn more',
    },
    product: {
      items: {
        'leave-in': 'Leave-In',
        shampoo: 'Shampoo',
        mask: 'Mask',
        cologne: 'Cologne',
        conditioner: 'Conditioner',
        ceruminolytic: 'Ceruminolytic',
      },
    },
    types: {
      0: 'Lines',
      1: 'Colognes',
    },
  },
  tags: {
    0: 'All',
    1: 'Lines',
    2: 'Colognes',
  },
  footer: {
    rights: '<strong>© 2023 TratyVet.</strong> All rights reserved',
  },

  'languages-vector': {
    'pt-br': 'Brazil',
    'en-us': 'United States',
    'es-es': 'Spain',
  },
  becomes_distributor: {
    subtitle: 'TratyVet',
    title: 'Become a Distributor',
    email: {
      success: 'Your email has been sent. Good luck!',
      error: 'Oops... something went wrong!',
    },
    form: {
      full_name: {
        label: 'Your full name',
        placeholder: 'e.g. John Doe',
      },
      birth_date: {
        label: 'Date of birth',
        placeholder: 'e.g. 01/01/2000',
      },
      email: {
        label: 'Your best email',
        placeholder: 'e.g. johndoe@domain.com',
      },
      phone: {
        label: 'Phone number for contact (WhatsApp/Mobile)',
        placeholder: 'e.g. (11) 91111-1111',
      },
      city: {
        label: 'Your city',
        placeholder: 'e.g. São Paulo',
      },
      state: {
        label: 'Your state',
        placeholder: 'e.g. São Paulo',
      },
      profession: {
        label: 'Your profession',
        placeholder: 'e.g. Freelancer',
      },
      have_partners: {
        label: 'Will you have partners?',
        placeholder: 'Select an option',
        options: {
          '0': 'Yes',
          '1': 'No',
        },
      },
      about: {
        label:
          'We want to get to know you better. Tell us about your professional experiences.',
        placeholder: '...',
      },
      expectations: {
        label:
          'What caught your attention the most about our business? What are your expectations?',
        placeholder: '...',
      },
      button: 'Submit',
    },
  },
  countries: {
    BR: 'Brazil',
    UY: 'Uruguay',
  },
};

import { ptBR } from './pt-br';

export const esES: typeof ptBR = {
  logoAlt: 'TRATY VET - logotipo vectorizado',
  languages_select: 'Selecciona un idioma',

  header: {
    'toggle-navigation': 'Abrir/cerrar menú de navegación',
    links: {
      home: 'Inicio',
      products: {
        label: 'Productos',
        all: 'Todos',
        babyCare: 'Cuidado de Bebés',
        dryFast: 'Secado Rápido',
        golden: 'Oro',
        deepClear: 'Limpieza Profunda',
      },
      distributor: 'Distribuidor',
      'becomes-distributor': 'Conviértete en Distribuidor',
      news: 'Novedades',
      about: 'Acerca de',
    },
    button: 'Contacto',
  },

  dash: {
    'dash-title': 'Todos los Productos',
    update: 'Actualizar Producto',
    create: 'Crear Producto',
    product: {
      created: '¡Producto creado con éxito!',
      updated: '¡Producto actualizado con éxito!',
      error: '¡Ups! Ocurrió un error. Por favor, inténtalo de nuevo más tarde.',
      inputs: {
        name: {
          label: 'Nombre del Producto:',
          placeholder: 'Escriba aquí...',
        },
        category: {
          label: 'Categoría del Producto:',
          placeholder: 'Seleccionar...',
          'baby-care': 'Cuidado de Bebés',
          'dry-fast': 'Secado Rápido',
          golden: 'Oro',
          'deep-clear': 'Limpieza Profunda',
        },
        type: {
          label: 'Tipo de Producto:',
          placeholder: 'Seleccionar...',
          lines: 'Línea',
          colonies: 'Colonia',
        },
        desc: {
          placeholder: 'Escriba la descripción del producto aquí...',
        },
      },

      ...[
        ['shampoo', '¿Incluye Shampoo?'],
        ['mask', '¿Incluye Máscara?'],
        ['leave-in', '¿Incluye Leave in?'],
        ['cologne', '¿Incluye Colonia?'],
        ['conditioner', '¿Incluye Acondicionador?'],
        ['detangler', '¿Incluye desenredante?'],
        ['ceruminolytic', '¿Incluye Ceruminolítico?'],
      ].reduce(
        (acc, key) => ({
          ...acc,
          [key[0]]: {
            label: key[1],
            'input-embalagem': {
              label: 'Paquete',
              placeholder: 'Seleccionar...',
            },
          },
        }),
        {},
      ),
    },
  },
  home: {
    title: 'Inicio',
    description:
      'Una Fábrica de Cosmética Animal reconocida a nivel nacional que busca ofrecerte lo mejor para tu baño y aseo.',
    hero: {
      title: 'PRODUCTOS DE ALTO RENDIMIENTO PARA SU BAÑO Y ASEO',
      subtitle: 'PRODUCTOS PARA GROOMERS PROFESIONALES',
      description:
        '<strong>Traty Vet</strong> es una Fábrica de Cosmética Animal reconocida a nivel nacional que busca ofrecerte lo mejor para tu baño y aseo. La relación calidad-precio, el alto rendimiento, la innovación y las fragancias de larga duración son los puntos destacados de nuestra marca. Productos diseñados para Groomers y segmentos de Pet Shop.',

      newsletter: {
        label: 'Mantente al día de todas nuestras novedades',
        placeholder: 'Ingresa tu correo electrónico aquí',
        button: 'Suscribirse al boletín',
      },
      info: {
        clients: {
          title: '+ 10,000 clientes',
          text: 'Hay miles de clientes satisfechos, atendidos por nuestros distribuidores registrados, que tienen el mayor placer en proporcionar la mejor solución en cosmética animal para tu negocio.',
        },
        states: {
          title: '+17 estados',
          text: 'Con más de 50 distribuidores presentes en 17 estados de Brasil, Traty Vet también realiza la distribución de sus productos en Uruguay y está en plena ascensión internacional.',
        },
      },
      'image-alt': '',
    },
    points: {
      1: {
        text: 'No probamos nuestros productos en animales de laboratorio',
        title: 'Cruelty Free',
      },
      2: {
        text: 'Tu mascota también es parte de la familia',
        title: 'Pet Friendly',
      },
      3: {
        text: 'Nacimos para cuidar bien de quienes cuidan bien de nosotros',
        title: 'Nuestra Historia',
      },
    },
    distributor: {
      title: 'Distribuidor',
      subtitle: 'Encuentra aquí el distribuidor más cercano a tu ubicación',
      card: {
        text: 'Encuentra aquí el distribuidor más cercano a tu ubicación',
        button: 'Encontrar un distribuidor',
      },
    },
    about: {
      title: 'Sobre nosotros',
      subtitle: '¡Nuestra misión es cuidar de quienes cuidan bien de nosotros!',
      text: '¡Hace más de 15 años que nos dedicamos todos los días y motivados por esta pasión, llevamos lo mejor en bienestar para las mascotas! <br /><br />Nuestra empresa se destaca por fabricar productos de calidad, innovadores y con la mejor relación costo-beneficio para los cuidados de las mascotas.<br /><br />Desde que decidimos iniciar el proyecto de nuestras vidas, siempre pensamos en cómo ser diferentes, en cómo poder proporcionar una experiencia óptima y mostrar a través de lo que hacemos todo el amor y cariño que tenemos por estos compañeros de vida. <br /><br />Y la respuesta siempre ha estado con nosotros, desde siempre, ¡el amor! El amor por cuidar bien, por preocuparnos por cada detalle y por cada característica única.',
      'image-alt': 'Un perro sonriendo',
    },
    products: {
      title: 'Productos',
      subtitle: 'Mira nuestras líneas de productos',
      button: 'Ver línea completa',
      'product-read-more': 'Más información',
    },
    contact: {
      title: 'Contacto',
      subtitle:
        'Traty Vet está encantado de ayudarte y proporcionarte la mejor solución en cosmética animal para tu negocio.',
      form: {
        name: 'Nombre',
        email: 'Correo electrónico',
        phone: 'Teléfono',
        message: 'Escribe tu mensaje aquí...',
        button: 'Enviar',
      },
      ways: {
        title: 'Traty Vet | Cuidado de mascotas',
        address: {
          title: 'Dirección',
          0: 'Rua Pedro Migliari, 1119 Jardim Furlan, Ourinhos – SP',
        },
        phone: {
          title: 'Teléfonos',
          0: '(14) 3335-2880',
          1: '(14) 99763-0321',
          2: '(14) 99707-6526',
        },
        email: {
          title: 'Correos electrónicos',
          0: 'atendimento@tratyvet.com.br',
          1: 'marketing@tratyvet.com.br',
        },
      },
    },
  },
  distributor: {
    title: 'Distribuidor',
    description: '¡Encuentre un distribuidor TratyVet cerca de usted!',
    hero: {
      title: 'Encuentra un distribuidor',
      input: 'Ingresa tu ciudad',
      button: 'Buscar',
      select: 'Seleccione un país',
    },
    error: {
      'no-result': 'No se encontraron resultados para el código postal ingresado.',
      error: 'Ups... Inténtalo de nuevo más tarde.',
    },
    loading: 'Cargando...',
  },
  products: {
    hero: {
      title: 'Todos tenemos una historia para estar orgullosos',
      subtitle: 'Nacimos para cuidar bien<br />a quienes cuidan bien de nosotros',
      'image-alt': '',
    },
    products: {
      title: 'Productos',
      subtitle: 'Mira nuestras líneas de productos',
      'read-more': 'Más información',
    },
    product: {
      items: {
        'leave-in': 'Leave-In',
        shampoo: 'Shampoo',
        mask: 'Máscara',
        cologne: 'Colonia',
        conditioner: 'Acondicionador',
        ceruminolytic: 'Ceruminolítico',
      },
    },
    types: {
      0: 'Líneas',
      1: 'Colonias',
    },
  },
  tags: {
    0: 'Todos',
    1: 'Líneas',
    2: 'Colonias',
  },
  footer: {
    rights: '<strong>© 2023 TratyVet.</strong> Todos los derechos reservados',
  },
  'languages-vector': {
    'pt-br': 'Brasil',
    'en-us': 'Estados Unidos',
    'es-es': 'España',
  },

  becomes_distributor: {
    title_meta: 'Distribuidor',
    subtitle: 'TratyVet',
    title: 'Conviértete en un Distribuidor',
    email: {
      success: 'Tu correo electrónico ha sido enviado. ¡Buena suerte!',
      error: 'Oops... algo salió mal',
    },
    form: {
      full_name: {
        label: 'Tu nombre completo',
        placeholder: 'ej. Juan Pérez',
      },
      birth_date: {
        label: 'Fecha de nacimiento',
        placeholder: 'ej. 01/01/2000',
      },
      email: {
        label: 'Tu mejor correo electrónico',
        placeholder: 'ej. juanperez@dominio.com',
      },
      phone: {
        label: 'Número de teléfono para contactar (WhatsApp/Móvil)',
        placeholder: 'ej. +34 91111-1111',
      },
      city: {
        label: 'Tu ciudad',
        placeholder: 'ej. São Paulo',
      },
      state: {
        label: 'Tu provincia',
        placeholder: 'ej. São Paulo',
      },
      profession: {
        label: 'Tu profesión',
        placeholder: 'ej. Autónomo',
      },
      have_partners: {
        label: '¿Tendrás socios?',
        placeholder: 'Selecciona una opción',
        options: {
          '0': 'Sí',
          '1': 'No',
        },
      },
      about: {
        label:
          'Queremos conocerte mejor. Cuéntanos sobre tus experiencias profesionales.',
        placeholder: '...',
      },
      expectations: {
        label:
          '¿Qué fue lo que más llamó tu atención de nuestro negocio? ¿Cuáles son tus expectativas?',
        placeholder: '...',
      },
      button: 'Enviar',
    },
  },
  countries: {
    BR: 'Brasil',
    UY: 'Uruguay',
  },
};

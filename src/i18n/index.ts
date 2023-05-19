import { enUS } from './en-us';
import { esES } from './es-es';
import { ptBR } from './pt-br';

const locales = {
  'pt-br': ptBR,
  'en-us': enUS,
  'es-es': esES,
};

export type Locale = typeof ptBR;

export default locales;

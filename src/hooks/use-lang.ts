import locales, { type Locale } from 'i18n';
import { useRouter } from 'next/router';
import { InferObjectPath } from 'types/infer-object-path';
import { getObjectValueByString } from 'utils/get-object-value-by-string';

export const useLang = <T extends keyof Locale | undefined = undefined>(basePath?: T) => {
  const { locale: lang, asPath, push } = useRouter();
  const dictionary = locales;

  return {
    t: (
      pathProp: T extends undefined
        ? InferObjectPath<Locale>
        : InferObjectPath<Locale[NonNullable<T>]>,
      data?: Record<any, any>,
    ): string => {
      const path = pathProp as string;
      let text = getObjectValueByString(
        dictionary,
        `${lang}.${basePath ? `${basePath}.${path}` : path}`,
      );

      if (typeof text !== 'string') return path as string;

      if (data) {
        const sentences = text.match(/{{(.*?)}}/g)?.map((sentence) => {
          const sentenceFormatted = sentence.replace(/{{(.*)}}/g, '$1');
          return { [sentenceFormatted]: data[sentenceFormatted] };
        });

        sentences?.forEach((sentence) => {
          const key = Object.keys(sentence)[0];
          text = text.replace(`{{${key}}}`, sentence[key]);
        });
      }

      return text;
    },
    changeLangTo: (lang: string) => {
      push(asPath, asPath, { locale: lang });
    },
    lang,
  };
};

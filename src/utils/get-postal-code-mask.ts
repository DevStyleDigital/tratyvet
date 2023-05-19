export function getPostalCodeMask(lang: string) {
  switch (lang) {
    case 'pt-br':
      return /^(\d{5})(\d+)$/; // Brazilian cep format
    case 'en-us':
      return /^(\d{5})(\d+)?$/; // US zip code format
    case 'es-es':
      return /^([0-5][0-9])(\d+)?$/; // Spanish postal code format
    default:
      return /^(\d{5})(\d+)?$/; // default format: 5 digits plus optional hyphen and 3 digits
  }
}

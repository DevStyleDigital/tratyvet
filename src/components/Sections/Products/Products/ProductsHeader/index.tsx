import { CustomHeader } from 'components/CustomHeader';

const TYPES = [
  { key: 'products.types.0', value: 'lines' },
  { key: 'products.types.1', value: 'colonies' },
];

type Types = typeof TYPES;

export const ProductsHeader = ({ value }: { value: Types[number]['value'] }) => {
  return <CustomHeader items={TYPES} query="ptype" value={value} />;
};

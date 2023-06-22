import { CustomHeader } from 'components/CustomHeader';

const TAGS = [
  { key: 'tags.0', value: 'all' },
  { key: 'tags.1', value: 'lines' },
  { key: 'tags.2', value: 'colonies' },
];

type Tag = typeof TAGS;

export const ProductsHeader = ({
  value,
  setValue,
}: {
  value: Tag[number]['value'];
  setValue: (value: Tag[number]['value']) => void;
}) => {
  return <CustomHeader items={TAGS} query="ptag" setValue={setValue} value={value} />;
};

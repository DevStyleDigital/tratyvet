import { CustomHeader } from 'components/CustomHeader';

const TAGS = [
  { key: 'tags.0', value: 'all' },
  { key: 'tags.1', value: 'baby_care' },
  { key: 'tags.2', value: 'dry_fast' },
  { key: 'tags.3', value: 'golden' },
  { key: 'tags.4', value: 'deep_clear' },
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

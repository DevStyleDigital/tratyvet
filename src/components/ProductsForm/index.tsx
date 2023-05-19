import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from 'components/Button';
import { Editor } from 'components/Editor';
import { Select } from 'components/Select';
import { FilePondFile } from 'filepond';
import { useLang } from 'hooks/use-lang';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FilePond } from 'react-filepond';
import { http } from 'services/http';
import { Product } from 'types/product';

const optionsMl = [
  { value: 'none', label: 'None' },
  { value: '300ml', label: '300ml' },
  { value: '1l', label: '1L' },
  { value: '2l', label: '2L' },
  { value: '3l', label: '3L' },
  { value: '4l', label: '4L' },
  { value: '5l', label: '5L' },
];

export const ProductForm = ({ product }: { product?: Product }) => {
  const { t } = useLang('dash');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<any[]>(
    product ? [{ source: product.imageUrl, options: { type: 'local' } }] : [],
  );
  const [desc, setDesc] = useState<string>(product?.desc || '');

  const [formValues] = useState<Omit<Product, 'imageUrl' | 'id'>>({
    items: product?.items || {},
  } as any);

  async function handleSubmit() {
    setLoading(true);
    const file = files[0] as FilePondFile;
    const formData = new FormData();
    formData.append('product', JSON.stringify(formValues));
    if ((product && files[0].source !== product.imageUrl) || !product)
      formData.append('file', file.file, file.filename);

    await http[product ? 'put' : 'post'](
      `/api/products/${product ? product.id : ''}`,
      formData,
      { headers: { 'content-type': 'application/x-www-form-urlencode' } },
    )
      .then(() => {
        alert(t(product ? 'product.updated' : 'product.created'));
        router.push('/admin/dash');
      })
      .catch(() => {
        alert(t('product.error'));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form
      className="w-full flex flex-col gap-10"
      onSubmit={(ev) => {
        ev.preventDefault();
        handleSubmit();
      }}
    >
      <h1 className="mb-8 tracking-[0.12em] text-4xl min-[512px]:text-[2.75rem] font-extrabold font-sans-secondary uppercase">
        {t(product ? 'update' : 'create')}:
      </h1>
      <div className="flex-desk flex-wrap">
        <label htmlFor="product-name" className="input-label !w-fit">
          <span>{`${t('product.inputs.name.label')}*`}</span>
          <input
            type="text"
            defaultValue={product?.name}
            placeholder={t('product.inputs.name.placeholder')}
            className="input md:w-[23rem] w-full"
            required
            onChange={({ target: { value } }) => (formValues.name = value)}
            id="product-name"
          />
        </label>
        <div>
          <Select
            required
            onValueChange={(value) => (formValues.category = value)}
            defaultValue={product?.category}
            label={`${t('product.inputs.category.label')}*`}
            className="md:w-[23rem] w-full"
            placeholder={t('product.inputs.category.placeholder')}
          >
            {[
              { value: 'baby-care', label: t('product.inputs.category.baby-care') },
              { value: 'dry-fast', label: t('product.inputs.category.dry-fast') },
              { value: 'golden', label: t('product.inputs.category.golden') },
              { value: 'deep-clear', label: t('product.inputs.category.deep-clear') },
            ].map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            required
            onValueChange={(value) => (formValues.type = value)}
            defaultValue={product?.type}
            label={`${t('product.inputs.type.label')}*`}
            className="md:w-[23rem] w-full"
            placeholder={t('product.inputs.type.placeholder')}
          >
            {[
              { value: 'lines', label: t('product.inputs.type.lines') },
              { value: 'colonies', label: t('product.inputs.type.colonies') },
            ].map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      {[
        { key: 'shampoo', label: t('product.shampoo.label' as 'product') },
        { key: 'mask', label: t('product.mask.label' as 'product') },
        { key: 'leave-in', label: t('product.leave-in.label' as 'product') },
      ].map((item) => (
        <div key={item.key}>
          <span className="tracking-[0.12em] text-lg font-extrabold font-sans-secondary uppercase">
            {item.label}
          </span>
          <div className="flex-desk !justify-start flex-wrap">
            <div>
              <Select
                onValueChange={(value) =>
                  (formValues.items = {
                    ...formValues.items,
                    [item.key]: {
                      max: formValues.items?.[item.key]?.max!,
                      min: value,
                    },
                  })
                }
                defaultValue={product?.items?.[item.key]?.min}
                label={t(`product.${item.key}.input-min.label` as 'product')}
                className="md:w-[23rem] w-full"
                placeholder={t(`product.${item.key}.input-min.placeholder` as 'product')}
              >
                {optionsMl.map((option) => (
                  <Select.Option value={option.value} key={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <Select
                onValueChange={(value) =>
                  (formValues.items = {
                    ...formValues.items,
                    [item.key]: {
                      min: formValues.items?.[item.key]?.min!,
                      max: value,
                    },
                  })
                }
                defaultValue={product?.items?.[item.key]?.max}
                label={t(`product.${item.key}.input-max.label` as 'product')}
                className="md:w-[23rem] w-full"
                placeholder={t(`product.${item.key}.input-max.placeholder` as 'product')}
              >
                {optionsMl.map((option) => (
                  <Select.Option value={option.value} key={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      ))}

      <div className="full relative">
        <textarea
          className="w-px h-px top-16 left-16 [clip:rect(0px,0px,0px,0px)] absolute"
          aria-hidden
          tabIndex={-1}
          required
          value={desc}
          onChange={() => {}}
        />
        <Editor
          defaultValue={product?.desc}
          placeholder={t('product.inputs.desc.placeholder')}
          onChange={(htmlValue) => {
            formValues.desc = htmlValue;
            setDesc(htmlValue);
          }}
        />
      </div>

      <div className="flex-desk">
        <div className="w-full">
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            required
            credits={false}
            maxFileSize="5MB"
            acceptedFileTypes={['image/png', 'image/jpeg', 'image/webp']}
            allowMultiple={false}
            name="files"
            server={{
              load: (source, load) => {
                fetch(source)
                  .then((res) => res.blob())
                  .then(load);
              },
            }}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </div>
        {product && (
          <div className="w-1/2">
            <span className="text-lg font-sans-secondary font-bold uppercase">
              Last Image Preview:
            </span>
            <Image
              src={product.imageUrl}
              alt="image preview"
              width={2000}
              height={2000}
              className="w-full h-auto border-gray-600 border-2 rounded-lg"
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        size="big"
        disabled={loading}
        className="w-fit self-center disabled:cursor-wait"
      >
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-600 animate-spin fill-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {t(product ? 'update' : 'create')}
            <ArrowRightIcon className="w-6 h-6" />
          </>
        )}
      </Button>
    </form>
  );
};

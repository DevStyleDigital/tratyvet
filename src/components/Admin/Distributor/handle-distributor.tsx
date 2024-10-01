import { Button } from 'components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Label } from 'components/ui/label';
import { Distributor } from 'types/distributors';
import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { InputMask } from 'components/ui/input';
import { getCordsByPostalCode } from 'services/getCordsByPostalCode';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export const HandleDistributor = ({
  setDistributors,
  distribuidor,
  open,
  setOpen,
}: {
  setDistributors: React.Dispatch<React.SetStateAction<Distributor[]>>;
  distribuidor?: Distributor & { index: number };
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const router = useRouter();
  const [fetchingLocale, setFetchingLocale] = useState(false);
  const [locale, setLocale] = useState({
    state: distribuidor?.state,
    city: distribuidor?.city,
    lat: distribuidor?.lat.toString(),
    lng: distribuidor?.lng.toString(),
  });
  const [cep, setCep] = useState(distribuidor?.postalCode || '');
  const [phone, setPhone] = useState(distribuidor?.phone.split('/')[0] || '');
  const [phone2, setPhone2] = useState(distribuidor?.phone.split('/')[1] || '');
  const [loading, setLoading] = React.useState(false);
  const [noResult, setNoResult] = React.useState(false);

  useEffect(() => {
    setCep(distribuidor?.postalCode || '');
    setPhone(distribuidor?.phone || '');
    setLocale({
      state: distribuidor?.state,
      city: distribuidor?.city,
      lat: distribuidor?.lat.toString(),
      lng: distribuidor?.lng.toString(),
    });
  }, [distribuidor]);

  useEffect(() => {
    if (!cep?.length) return;
    const ac = new AbortController();
    setTimeout(() => {
      setFetchingLocale(true);
      getCordsByPostalCode(cep, 'BR', ac.signal)
        .then(({ coordinates: { lat, lng }, result }) => {
          setNoResult(false);
          const [state, city] = result.address_components.reduce(
            (acc, item) => {
              if (item.types.includes('administrative_area_level_1')) {
                acc[0] = item.long_name;
              }
              if (item.types.includes('administrative_area_level_2')) {
                acc[1] = item.long_name;
              }
              return acc;
            },
            ['', ''],
          );
          setLocale({ city, state, lat, lng });
          setFetchingLocale(false);
        })
        .catch((e) => {
          if (e === 'no-result') setNoResult(true);
        })
        .finally(() => {
          setFetchingLocale(false);
        });
    }, 500);

    return () => {
      ac.abort();
    };
  }, [cep]);

  const handleDistributor = async (data: any) => {
    setLoading(true);

    return fetch(
      !!distribuidor ? `/api/distributor/${distribuidor.id}` : '/api/distributor',
      {
        method: !!distribuidor ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      },
    )
      .then((r) => {
        if (!r.ok) throw '';
        return r.json();
      })
      .then(async (res) => {
        if (distribuidor) {
          setDistributors((prev) => {
            const newPrev = [...prev];
            newPrev[distribuidor.index] = {
              ...data,
              id: distribuidor.id,
            };
            return newPrev;
          });
        } else setDistributors((data) => [res, ...data]);
        setOpen(false);
        router.push('/admin/dash/distributors');
        toast.success(!distribuidor ? 'Distribuidor criado!' : 'Distribuidor editado!');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error ao salvar o Distribuidor. Tente novamente mais tarde!');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        setCep('');
        setPhone('');
        setNoResult(false);
        setLoading(false);
        setFetchingLocale(false);
        setLocale({
          city: undefined,
          lat: undefined,
          lng: undefined,
          state: undefined,
        });
        if (distribuidor) router.push('/admin/dash/distributors');
      }}
    >
      <DialogTrigger asChild className="w-fit my-4">
        <Button>
          Criar distribuidor <PlusIcon className="ml-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 py-6 pt-10 overflow-hidden">
        <form
          className="overflow-hidden overflow-y-auto max-h-[90dvh] px-6"
          onSubmit={(e) => {
            e.preventDefault();
            const {
              distributor: { value: distributor },
              company: { value: company },
              name: { value: name },
              email: { value: email },
              region: { value: region },
            } = e.currentTarget as Record<string, HTMLInputElement>;
            handleDistributor({
              ...locale,
              distributor,
              company,
              name,
              email,
              phone: `${phone}/${phone2}`,
              region,
              country: 'BR',
              postalCode: cep,
            });
          }}
        >
          <DialogHeader>
            <DialogTitle>Criar Distribuidor</DialogTitle>
            <DialogDescription>
              Cadastro apenas de distribuidores no Brasil
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4 mt-8">
              <div className="space-y-2">
                <Label htmlFor="name">Distributor*</Label>
                <input
                  type="text"
                  id="distributor"
                  name="distributor"
                  className="input w-full"
                  placeholder="Afonso"
                  required
                  defaultValue={distribuidor?.distributor}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Loja*</Label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="input w-full"
                  placeholder="PetShop"
                  required
                  defaultValue={distribuidor?.company}
                />
              </div>
              <hr className="w-full bg-muted-foreground/60 h-px" />
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input w-full"
                  placeholder="afonso@gmail.com"
                  defaultValue={distribuidor?.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone/Celular*</Label>
                <input
                  id="phone"
                  name="phone"
                  required
                  placeholder="(44) 91111-1111"
                  className="input w-full"
                  value={phone2}
                  onChange={({ target: { value } }) => setPhone2(value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone2">Telefone/Celular 2 (opcional)</Label>
                <input
                  id="phone2"
                  name="phone2"
                  placeholder="(44) 91111-1111"
                  className="input w-full"
                  value={phone}
                  onChange={({ target: { value } }) => setPhone(value)}
                />
              </div>
              <hr className="w-full bg-muted-foreground/60 h-px" />
              <div className="space-y-2">
                <Label htmlFor="postalCode">CEP*</Label>
                <InputMask
                  id="postalCode"
                  name="postalCode"
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                  required
                  placeholder="11111-111"
                  value={cep}
                  onChange={({ target: { value } }) => setCep(value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Cidade*</Label>
                <input
                  type="text"
                  id="city"
                  className="input w-full"
                  placeholder="São Paulo"
                  required
                  disabled={!noResult}
                  value={locale.city}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado*</Label>
                <input
                  type="text"
                  id="state"
                  className="input w-full"
                  placeholder="São Paulo"
                  required
                  disabled={!noResult}
                  value={locale.state}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Região (Opcional)</Label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  className="input w-full"
                  placeholder="Zona sul"
                />
              </div>
              <div className="flex gap-2">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude*</Label>
                  <input
                    id="lat"
                    name="lat"
                    type="number"
                    className="input w-full"
                    required
                    placeholder="0.00"
                    disabled={fetchingLocale}
                    value={locale.lat}
                    onChange={({ target: { value } }) => {
                      setLocale((prev) => ({ ...prev, lat: value }));
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude*</Label>
                  <input
                    id="lng"
                    name="lng"
                    type="number"
                    className="input w-full"
                    required
                    placeholder="0.00"
                    disabled={fetchingLocale}
                    value={locale.lng}
                    onChange={({ target: { value } }) => {
                      setLocale((prev) => ({ ...prev, lng: value }));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="my-8">
            <Button
              variant="outline"
              disabled={fetchingLocale || loading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={fetchingLocale || loading}>
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

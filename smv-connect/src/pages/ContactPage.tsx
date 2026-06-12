import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Alert } from '../components/ui/Alert';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { InputField, TextareaField } from '../components/ui/FormField';
import { Seo } from '../components/ui/Seo';
import { useCentres } from '../hooks/useCentres';
import { telHref } from '../lib/utils';
import { contactSchema, type ContactFormValues } from '../lib/validators';

const EMAIL_NATIONAL = 'contact@smv-connect.fr';

export default function ContactPage() {
  const { data: centres } = useCentres();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema), mode: 'onTouched' });

  // Sans backend dédié aux messages : ouverture du client mail pré-rempli.
  const envoyer = (valeurs: ContactFormValues) => {
    const corps = `Nom : ${valeurs.nom}\nEmail : ${valeurs.email}\n\n${valeurs.message}`;
    window.location.href = `mailto:${EMAIL_NATIONAL}?subject=${encodeURIComponent(
      `[SMV Connect] ${valeurs.sujet}`,
    )}&body=${encodeURIComponent(corps)}`;
  };

  return (
    <>
      <Seo
        titre="Contact"
        description="Contacter le Service Militaire Volontaire : coordonnées des 7 centres SMV et formulaire de contact national."
        cheminCanonique="/contact"
      />
      <div className="mx-auto max-w-page px-4 pb-16">
        <Breadcrumb items={[{ label: 'Contact' }]} />
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy sm:text-5xl">
          Contact
        </h1>
        <p className="mt-2 max-w-2xl text-smv-gray-600">
          Une question sur ta candidature ? Le plus rapide est de contacter directement le centre
          SMV de ta région. Pour toute autre demande, utilise le formulaire.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="formulaire-contact">
            <h2 id="formulaire-contact" className="mb-4 font-display text-2xl font-bold uppercase text-smv-navy">
              Nous écrire
            </h2>
            <Alert type="info" className="mb-4">
              Pour candidater, ne passe pas par ce formulaire : utilise plutôt la{' '}
              <a href="/candidater" className="font-semibold underline">
                candidature en ligne
              </a>
              , ta demande arrivera directement au bon centre.
            </Alert>
            <form onSubmit={handleSubmit(envoyer)} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Nom" requis error={errors.nom?.message} {...register('nom')} />
                <InputField
                  label="Email"
                  requis
                  type="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>
              <InputField label="Sujet" requis error={errors.sujet?.message} {...register('sujet')} />
              <TextareaField
                label="Message"
                requis
                rows={6}
                error={errors.message?.message}
                {...register('message')}
              />
              <Button type="submit">
                <Send className="h-4 w-4" aria-hidden="true" />
                Envoyer le message
              </Button>
            </form>
          </section>

          <section aria-labelledby="contacts-centres">
            <h2 id="contacts-centres" className="mb-4 font-display text-2xl font-bold uppercase text-smv-navy">
              Les centres SMV
            </h2>
            <ul className="space-y-3">
              {(centres ?? []).map((centre) => (
                <li key={centre.id}>
                  <Card className="p-4">
                    <p className="font-display text-lg font-bold uppercase text-smv-navy">
                      {centre.nom}{' '}
                      <span className="text-sm font-semibold normal-case text-smv-gray-600">
                        — {centre.region}
                      </span>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                      <span className="inline-flex items-center gap-1.5 text-smv-gray-600">
                        <MapPin className="h-3.5 w-3.5 text-smv-green" aria-hidden="true" />
                        {centre.ville}
                      </span>
                      {centre.telephone_1 ? (
                        <a
                          href={telHref(centre.telephone_1)}
                          className="inline-flex items-center gap-1.5 font-semibold text-smv-navy hover:underline"
                        >
                          <Phone className="h-3.5 w-3.5 text-smv-green" aria-hidden="true" />
                          {centre.telephone_1}
                        </a>
                      ) : null}
                      <a
                        href={`mailto:${centre.email_recrutement}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-smv-navy hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5 text-smv-green" aria-hidden="true" />
                        Email recrutement
                      </a>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/layout/Logo';
import { Alert } from '../../components/ui/Alert';
import { Button } from '../../components/ui/Button';
import { InputField } from '../../components/ui/FormField';
import { Loader } from '../../components/ui/Loader';
import { Seo } from '../../components/ui/Seo';
import { DEMO_PROFILES } from '../../data/demoDb';
import { useAuth } from '../../hooks/useAuth';
import { isSupabaseConfigured } from '../../lib/supabase';
import { loginSchema, type LoginValues } from '../../lib/validators';
import { useAuthStore } from '../../store/authStore';

export default function AdminLogin() {
  const { statut } = useAuth();
  const connexion = useAuthStore((s) => s.connexion);
  const connexionDemo = useAuthStore((s) => s.connexionDemo);
  const navigate = useNavigate();
  const location = useLocation();
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  const [voirMotDePasse, setVoirMotDePasse] = useState(false);

  const destination =
    (location.state as { depuis?: string } | null)?.depuis ?? '/admin/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  if (statut === 'connecte') return <Navigate to={destination} replace />;

  const seConnecter = async (valeurs: LoginValues) => {
    setEnCours(true);
    setErreur(null);
    try {
      await connexion(valeurs.email, valeurs.password);
      navigate(destination, { replace: true });
    } catch (e) {
      setErreur(e instanceof Error ? e.message : 'Connexion impossible');
    } finally {
      setEnCours(false);
    }
  };

  const demo = async (profileId: string) => {
    setEnCours(true);
    try {
      await connexionDemo(profileId);
      navigate(destination, { replace: true });
    } finally {
      setEnCours(false);
    }
  };

  return (
    <>
      <Seo titre="Connexion — Espace recruteur" />
      <div className="flex min-h-screen items-center justify-center bg-smv-navy-dark px-4 py-10">
        <div className="w-full max-w-md">
          <div className="flex justify-center">
            <Logo surFondSombre />
          </div>
          <div className="mt-8 rounded-lg bg-white p-6 shadow-xl sm:p-8">
            <h1 className="font-display text-2xl font-extrabold uppercase text-smv-navy">
              Espace recruteur
            </h1>
            <p className="mt-1 text-sm text-smv-gray-600">
              Accès réservé aux personnels des centres SMV. Les comptes sont créés par
              l'administrateur national.
            </p>

            {erreur ? (
              <Alert type="error" className="mt-4">
                {erreur}
              </Alert>
            ) : null}

            <form onSubmit={handleSubmit(seConnecter)} noValidate className="mt-5 space-y-4">
              <InputField
                label="Email professionnel"
                type="email"
                autoComplete="username"
                requis
                error={errors.email?.message}
                {...register('email')}
              />
              <div className="relative">
                <InputField
                  label="Mot de passe"
                  type={voirMotDePasse ? 'text' : 'password'}
                  autoComplete="current-password"
                  requis
                  error={errors.password?.message}
                  className="pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setVoirMotDePasse(!voirMotDePasse)}
                  aria-label={voirMotDePasse ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  className="absolute right-2 top-[2.1rem] rounded p-1 text-smv-gray-600 hover:bg-smv-gray-100"
                >
                  {voirMotDePasse ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              <Button type="submit" className="w-full" disabled={enCours}>
                {enCours ? <Loader size="sm" label="Connexion" /> : <LogIn className="h-4 w-4" aria-hidden="true" />}
                Se connecter
              </Button>
            </form>

            {!isSupabaseConfigured ? (
              <div className="mt-6 border-t border-smv-gray-100 pt-5">
                <Alert type="info" title="Mode démo actif">
                  Supabase n'est pas configuré : explore l'espace admin avec des données de
                  démonstration locales.
                </Alert>
                <div className="mt-3 grid gap-2">
                  {DEMO_PROFILES.map((profil) => (
                    <Button
                      key={profil.id}
                      variant="secondary"
                      size="sm"
                      disabled={enCours}
                      onClick={() => void demo(profil.id)}
                    >
                      Entrer en démo — {profil.prenom}
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <p className="mt-4 text-center text-xs text-white/60">
            <a href="/" className="underline underline-offset-2 hover:text-white">
              ← Retour au site public
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

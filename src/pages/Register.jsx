import { useRegister } from "../hooks/auth";
import classNames from "classnames";
import { LogInIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ValidationError } from "../api/errors";

export default function Register() {
  const { mutateAsync, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm();

  const onRegisterSubmit = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.errors.forEach((error) => {
          setError(error.field, {
            message: error.message,
          });
        });
      }
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="flex-1 flex flex-col item-center justify-center">
      <div className="card bg-base-100 shadow-md border w-full max-w-screen-md mx-auto">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Inscription</h2>

          <form
            className="mx-auto max-w-md w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onRegisterSubmit)}
          >
            <div className="form-control w-full">
              <label className="label-text font-semibold mb-1" htmlFor="name">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                name="username"
                placeholder="Nom d'utilisateur"
                className={classNames(
                  "input input-bordered input-primary w-full",
                  { "input-error": errors.username }
                )}
                id="username"
                {...register("username")}
              />
              {errors.username && (
                <span className="text-error">{errors.username.message}</span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label-text font-semibold mb-1" htmlFor="email">
                Adresse E-mail
              </label>
              <input
                type="email"
                name="email"
                autoComplete="username"
                placeholder="Adresse E-mail"
                className={classNames(
                  "input input-bordered input-primary w-full",
                  { "input-error": errors.email }
                )}
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-control w-full">
              <label
                htmlFor="password"
                className="label-text font-semibold mb-1"
              >
                Mot de passe
              </label>

              <input
                type="password"
                autoComplete="new-password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                className={classNames(
                  "input input-bordered input-primary w-full",
                  { "input-error": errors.password }
                )}
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control w-full">
              <label
                htmlFor="password_confirmation"
                className="label-text font-semibold mb-1"
              >
                Confirmation du mot de passe
              </label>

              <input
                type="password"
                name="password_confirmation"
                autoComplete="new-password"
                id="password_confirmation"
                placeholder="Confirmation du mot de passe"
                className={classNames(
                  "input input-bordered input-primary w-full",
                  { "input-error": errors.password_confirmation }
                )}
                {...register("password_confirmation", { required: true })}
              />
              {errors.password_confirmation && (
                <span className="text-error">
                  {errors.password_confirmation.message}
                </span>
              )}
            </div>

            <div className="mx-auto text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid || isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <LogInIcon className="mr-1 w-6 h-6" />
                )}
                S'inscrire
              </button>

              <p className="mt-4">
                Déjà un compte ?{" "}
                <Link to="/login" className="link link-primary">
                  Connecte toi !
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

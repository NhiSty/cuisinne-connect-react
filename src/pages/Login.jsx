import { LogInIcon } from "lucide-react";
import { useLogin } from "../hooks/auth";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ValidationError } from "../api/errors";

export default function Login() {
  const { mutateAsync, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm();

  const onLoginSubmit = async (data) => {
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

      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col item-center justify-center">
      <div className="card bg-base-100 shadow-md border w-full max-w-screen-md mx-auto">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Connexion</h2>

          <form
            className="mx-auto max-w-md w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onLoginSubmit)}
          >
            <div className="form-control w-full">
              <label className="label-text font-semibold mb-1" htmlFor="email">
                Adresse E-mail
              </label>
              <input
                type="text"
                name="email"
                placeholder="Adresse E-mail"
                autoComplete="username"
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
                name="password"
                autoComplete="current-password"
                id="password"
                className={classNames(
                  "input input-bordered input-primary w-full",
                  { "input-error": errors.password }
                )}
                placeholder="Mot de passe"
                {...register("password")}
              />
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
                Connexion
              </button>

              <p className="mt-4">
                Pas de compte ?{" "}
                <Link to="/register" className="link link-primary">
                  Crée un compte
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

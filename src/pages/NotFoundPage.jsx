export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <h1 className="text-5xl text-primary font-bold mb-8">
        Erreur 404 - Page non trouvée
      </h1>
      <p className="text-lg text-center">
        Désolé, la page que vous recherchez est introuvable.
        <br />
        Veuillez retourner à la{" "}
        <a className="link link-hover link-primary" href="/">
          page d'accueil
        </a>
        .
      </p>
    </div>
  );
}

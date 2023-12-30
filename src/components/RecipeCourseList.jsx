import { useQuery } from "@tanstack/react-query";
import { getListCourse } from "../api/recipes";
import { ShoppingBag, Copy, X } from "lucide-react";

export default function RecipeCourseList({ recipeName }) {
  const { data, isPending } = useQuery({
    queryKey: ["recipe", recipeName, "courseList"],
    queryFn: () => getListCourse(recipeName),
  });

  const copyToClipboard = () => {
    const listText = data.listCourse.join("\n");
    navigator.clipboard
      .writeText(listText)
      .then(() => console.log("Liste copiée avec succès !"))
      .catch((error) =>
        console.error("Erreur lors de la copie dans le presse-papiers :", error)
      );
  };

  if (isPending) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!data) {
    return (
      <button className="btn btn-primary btn-sm">
        <ShoppingBag className="mr-2" size={16} /> Liste de courses vide
      </button>
    );
  }

  return (
    <>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => document.getElementById("shareListCourse").showModal()}
      >
        <ShoppingBag className="mr-2" size={16} /> Partagez la liste de courses
      </button>

      <dialog id="shareListCourse" className="modal">
        <div className="modal-box">

          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Partagez la liste de course !</h3>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => document.getElementById("shareListCourse").close()}
            >
              <X size={16} />
            </button>
          </div>
          <p className="py-1">
            Copiez la liste pour ensuite la partager sur vos réseaux préférés
          </p>
          <hr className="my-2" />

          <ul className="list-disc pl-4">
            {data.listCourse.map((course, index) => (
              <li key={index} className="text-gray-600 text-sm mb-1">
                {course}
              </li>
            ))}
          </ul>

          <hr className="my-2" />

          <div className="mt-2 flex justify-start">
            <button
              className="btn btn-primary btn-sm mr-2"
              onClick={copyToClipboard}
            >
              <Copy size={18} className="mr-2" /> Copier
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => document.getElementById("shareListCourse").close()}
            >
              Fermer
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

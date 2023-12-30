export default function RecipeSideDish({ recipeName, sideDishData }) {

  if (!sideDishData?.sideDishes) {
    return (
        <p className="text-gray-600 text-sm mx-auto mb-2">
          Pas d'Accompagnements
        </p>
    );
  }

  return (
      <ul className="flex flex-col list-disc mx-8">
        {sideDishData.sideDishes.map((dish, index) => (
            <li key={index}>{dish}</li>
        ))}
      </ul>
  );
}

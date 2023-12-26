import React from "react";

export default function Instructions({ instructions }) {
  if (!instructions) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <p>Ce plat n'a pas encore d'instructions</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-start mt-4 md:mx-4">
      {instructions.map((instruction, index) => (
        <section key={index} className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">Étape - {index + 1}</h3>
          <p>{instruction.instructions}</p>
        </section>
      ))}
    </div>
  );
}

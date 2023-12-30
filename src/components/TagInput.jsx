// Source: https://www.30secondsofcode.org/react/s/tag-input/

import { X } from "lucide-react";
import { useState } from "react";

export function TagInput({ tags = [], onChange, id, name, placeholder }) {
  const [previousValue, setPrevious] = useState("");

  const removeTagData = (indexToRemove) => {
    onChange([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      // Prevent the browser to emit a "on submit" event in forms
      event.preventDefault();
    }
  };

  const onKeyUp = (event) => {
    const currentValue = event.target.value;

    if (event.key === "Enter" && currentValue !== "") {
      if (!tags.includes(currentValue)) {
        onChange(tags.concat([currentValue]));
      }

      event.target.value = "";
      setPrevious("");
      return;
    } else if (event.key === "Backspace" && previousValue === "") {
      onChange(tags.slice(0, -1));
      setPrevious("");
      return;
    }

    setPrevious(currentValue);
  };

  return (
      <div className="input input-bordered flex flex-wrap items-center gap-1 h-auto py-2 px-4">
        <ul className="contents">
          {tags.map((tag, index) => (
              <li
                  key={index}
                  className="badge badge-neutral flex flex-row items-center gap-1 justify-center text-base"
              >
                <span>{tag}</span>
                <button onClick={() => removeTagData(index)}>
                  <X className="w-4 h-4 cursor-pointer" />
                </button>
              </li>
          ))}
        </ul>
        <input
            id={id}
            name={name}
            placeholder={placeholder}
            type="text"
            className="flex-1 min-w-12"
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
        />
      </div>
  );
}

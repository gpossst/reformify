"use client";

import React from "react";
import { MdOutlineDelete } from "react-icons/md";

interface ElementSelectorProps {
  elements: { name: string; required: boolean; type: string }[];
  setElements: React.Dispatch<
    React.SetStateAction<{ name: string; required: boolean; type: string }[]>
  >;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

function ElementSelector({
  elements,
  setElements,
  setError,
}: ElementSelectorProps) {
  const handleElementChange = (
    index: number,
    element: { name: string; required: boolean; type: string }
  ) => {
    const newElements = [...elements];
    newElements[index] = element;
    setElements(newElements);
  };

  const newElement = () => {
    setElements([...elements, { name: "", required: true, type: "text" }]);
    setError(null);
  };

  const removeElement = (index: number) => {
    if (elements.length === 1) {
      setError("You must have at least one element!");
      return;
    }

    const newElements = [...elements];
    newElements.splice(index, 1);
    setElements(newElements);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto h-full">
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto rounded-md">
        {elements.map((element, index) => (
          <div
            className="flex items-center justify-between gap-4 bg-foreground p-4 rounded-md text-background font-merriweather"
            key={index}
          >
            <div className="pr-2">{index + 1}</div>
            {/* Form */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor={`name-${index}`}>Name</label>
                <input
                  className="flex-1 border-b-2 border-background bg-foreground text-background p-1"
                  id={`name-${index}`}
                  type="text"
                  value={element.name}
                  onChange={(e) =>
                    handleElementChange(index, {
                      ...element,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor={`type-${index}`}>Type</label>
                  <select
                    className="border-none bg-background text-foreground px-2 py-1 rounded-md"
                    id={`type-${index}`}
                    value={element.type}
                    onChange={(e) =>
                      handleElementChange(index, {
                        ...element,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="email">Email</option>
                    <option value="date">Date</option>
                    <option value="boolean">Boolean</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor={`required-${index}`}>Required</label>
                  <input
                    id={`required-${index}`}
                    type="checkbox"
                    className="w-4 h-4 accent-accent bg-foreground border-background"
                    checked={element.required}
                    onChange={(e) =>
                      handleElementChange(index, {
                        ...element,
                        required: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => removeElement(index)}
              className="text-background/80 hover:text-accent transition-colors self-center"
            >
              <MdOutlineDelete size={24} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={newElement}
        className="bg-foreground font-merriweather text-background p-2 rounded-md transition-colors mt-auto"
      >
        Add Element
      </button>
    </div>
  );
}

export default ElementSelector;

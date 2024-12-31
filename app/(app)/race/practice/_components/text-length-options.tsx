"use client";

import { race_text_length } from "@prisma/client";
import { useToolbar } from "../hooks/useToolbar";
import { ToolbarButton } from "./toolbar-button";

const randomWordsOptions = [25, 50, 100];
const textLengthOptions: race_text_length[] = ["short", "medium", "long"];

export function TextLengthOptions() {
  const { currMode, updateTextLength, updateRandomWordsCount, textLength, randomWordsCount } =
    useToolbar();

  if (currMode === "quote" || currMode === "text") {
    return (
      <section className="flex gap-2">
        {textLengthOptions.map((option) => (
          <ToolbarButton
            key={option}
            onClick={() => updateTextLength(option)}
            isActive={option === textLength}
          >
            {option}
          </ToolbarButton>
        ))}
      </section>
    );
  }

  // For "random-words" mode, render random word count options (25, 50, 100, 150)
  if (currMode === "random-words") {
    return (
      <section className="flex gap-2">
        {randomWordsOptions.map((count) => (
          <ToolbarButton
            key={count}
            onClick={() => updateRandomWordsCount(count)}
            isActive={count === randomWordsCount}
          >
            {count}
          </ToolbarButton>
        ))}
        <ToolbarButton>Custom</ToolbarButton>
      </section>
    );
  }

  return null; // Return null if no valid mode
}

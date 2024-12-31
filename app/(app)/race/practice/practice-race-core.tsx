"use client";

import { useTypingFieldStore } from "@/hooks/zustand/use-typing-field";
import { useEffect } from "react";
import { TypingField } from "../_components/typing-field";
import { Toolbar } from "./_components/toolbar";
import { ToolbarProvider } from "./hooks/useToolbar";

export function PracticeRaceCore() {
  const { setCanType, text } = useTypingFieldStore();

  // const { } = useRaceText();

  useEffect(() => {
    setCanType(true);
  }, [setCanType]);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <section className="flex h-fit w-full max-w-4xl flex-col items-center justify-center gap-12">
        <ToolbarProvider>
          <Toolbar />
        </ToolbarProvider>

        <TypingField text={text} />
      </section>
    </div>
  );
}
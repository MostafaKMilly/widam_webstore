import { useContext } from "react";
import {
  DictionaryContext,
  DictionaryContextType,
} from "../context/DictionaryContext";
import { Dictionary } from "@/app/dictionaries";

export const useDictionary = <
  T extends Dictionary
>(): DictionaryContextType<T> => {
  const context = useContext(
    DictionaryContext as React.Context<DictionaryContextType<T> | undefined>
  );
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
};

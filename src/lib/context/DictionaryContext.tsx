"use client";
import { Dictionary } from "@/app/dictionaries";
import { createContext, ReactNode, useContext } from "react";

export interface DictionaryContextType<T> {
  dictionary: T;
}

export const DictionaryContext = createContext<
  DictionaryContextType<Dictionary> | undefined
>(undefined);

interface DictionaryProviderProps<T> {
  children: ReactNode;
  dictionary: T;
}

export const DictionaryProvider = <T extends Dictionary>({
  children,
  dictionary,
}: DictionaryProviderProps<T>) => {
  return (
    <DictionaryContext.Provider value={{ dictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
};

import "server-only";

const dictionaries = {
  en: () =>
    import("@/lib/translations/en.json").then((module) => module.default),
  ar: () =>
    import("@/lib/translations/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: "ar" | "en") =>
  dictionaries[locale]?.();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

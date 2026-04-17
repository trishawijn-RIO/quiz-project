import type { AgeGroupValue, SingleAnswerValue } from "@/lib/quiz-types";

type BehaviorOption = {
  label: string;
  value: SingleAnswerValue;
};

type ContentItem = {
  title: string;
  description: string;
  type: string;
  image: string;
};

export const behaviorsByAge: Record<AgeGroupValue, BehaviorOption[]> = {
  age_0_2: [
    {
      label: "Mijn kind slaapt slecht en ik ben uitgeput",
      value: "focus_overprikkeld",
    },
    {
      label: "Mijn kind huilt veel en ik weet niet wat hij/zij nodig heeft",
      value: "focus_onzeker",
    },
    {
      label: "Mijn kind is snel overprikkeld en moeilijk rustig te krijgen",
      value: "focus_overprikkeld",
    },
    {
      label: "We hebben geen ritme en dat geeft onrust",
      value: "focus_rust",
    },
    {
      label: "Mijn kind kan moeilijk zonder mij",
      value: "focus_verbinding",
    },
    {
      label: "Ik twijfel vaak of ik het goed doe",
      value: "focus_onzeker",
    },
  ],
  age_3_5: [
    {
      label: "De driftbuien lopen compleet uit de hand",
      value: "focus_emoties",
    },
    {
      label: "Mijn kind luistert niet",
      value: "focus_luisteren",
    },
    {
      label: "Alles wordt een strijd (aankleden, eten, naar bed)",
      value: "focus_strijd",
    },
    {
      label: "Mijn kind test constant grenzen",
      value: "focus_strijd",
    },
    {
      label: "Overgangen zorgen voor gedoe",
      value: "focus_rust",
    },
    {
      label: "Ik merk dat ik zelf sneller boos word dan ik wil",
      value: "focus_onzeker",
    },
  ],
  age_6_9: [
    {
      label: "Mijn kind luistert niet en discussieert veel",
      value: "focus_luisteren",
    },
    {
      label: "Mijn kind wordt snel boos of gefrustreerd",
      value: "focus_emoties",
    },
    {
      label: "Mijn kind heeft weinig zelfvertrouwen",
      value: "focus_onzeker",
    },
    {
      label: "Mijn kind praat weinig over wat er speelt",
      value: "focus_verbinding",
    },
    {
      label: "School zorgt voor spanning of problemen",
      value: "focus_overprikkeld",
    },
    {
      label: "Er is veel gedoe met broertjes/zusjes",
      value: "focus_strijd",
    },
  ],
  age_10_plus: [
    {
      label: "Mijn kind trekt zich terug en deelt weinig",
      value: "focus_verbinding",
    },
    {
      label: "We hebben steeds vaker discussie of conflict",
      value: "focus_strijd",
    },
    {
      label: "Mijn kind accepteert grenzen slecht",
      value: "focus_luisteren",
    },
    {
      label: "Mijn kind is onzeker of somber",
      value: "focus_onzeker",
    },
    {
      label: "Er is gedoe met vrienden",
      value: "focus_rust",
    },
    {
      label: "Ik heb het gevoel dat ik mijn kind kwijtraakt",
      value: "focus_verbinding",
    },
  ],
};

export const contentLibrary: Record<string, ContentItem> = {
  community: {
    title: "Community om te connecten met andere ouders",
    description: "Een warme plek om vragen te stellen, mee te lezen en steun te voelen.",
    type: "Preview",
    image: "/images/workshops/2.png",
  },
  werkboeken: {
    title: "Werkboeken, scripts en handleidingen",
    description: "Duidelijke handvatten die je meteen kunt bewaren, printen of erbij pakken.",
    type: "Preview",
    image: "/images/workshops/12.png",
  },
  grenzen: {
    title: "Workshop ‘Grenzen stellen zonder strijd’",
    description: "Liefdevolle duidelijkheid die helpt om spanning en strijd te verzachten.",
    type: "Workshop",
    image: "/images/workshops/11.png",
  },
  app: {
    title: "Gratis toegang tot Opvoedapp (tijdelijk)",
    description: "Ontdek in alle rust wat er voor jullie klaarstaat, op jullie eigen moment.",
    type: "Tijdelijk",
    image: "/images/workshops/24.png",
  },
  coaching: {
    title: "Live coaching calls met professionals",
    description: "Stel je vragen rechtstreeks aan mensen die begrijpen waar jullie tegenaan lopen.",
    type: "Live",
    image: "/images/workshops/18.png",
  },
};

export const recommendationsByAgeAndBehavior: Partial<
  Record<AgeGroupValue, Partial<Record<SingleAnswerValue, string[]>>>
> = {
  age_0_2: {
    focus_overprikkeld: ["werkboeken", "app", "coaching", "community"],
    focus_onzeker: ["coaching", "community", "werkboeken", "app"],
    focus_rust: ["werkboeken", "app", "community", "coaching"],
    focus_verbinding: ["community", "coaching", "app", "werkboeken"],
  },
  age_3_5: {
    focus_emoties: ["grenzen", "coaching", "werkboeken", "community"],
    focus_luisteren: ["grenzen", "werkboeken", "app", "coaching"],
    focus_strijd: ["grenzen", "werkboeken", "community", "coaching"],
    focus_rust: ["app", "werkboeken", "community", "coaching"],
    focus_onzeker: ["coaching", "werkboeken", "community", "app"],
  },
  age_6_9: {
    focus_luisteren: ["grenzen", "werkboeken", "coaching", "community"],
    focus_emoties: ["coaching", "werkboeken", "community", "app"],
    focus_onzeker: ["coaching", "community", "werkboeken", "app"],
    focus_verbinding: ["community", "coaching", "app", "werkboeken"],
    focus_overprikkeld: ["app", "werkboeken", "coaching", "community"],
    focus_strijd: ["grenzen", "werkboeken", "community", "coaching"],
  },
  age_10_plus: {
    focus_verbinding: ["community", "coaching", "app", "werkboeken"],
    focus_strijd: ["grenzen", "coaching", "werkboeken", "community"],
    focus_luisteren: ["grenzen", "werkboeken", "coaching", "community"],
    focus_onzeker: ["coaching", "community", "app", "werkboeken"],
    focus_rust: ["app", "community", "werkboeken", "coaching"],
  },
};

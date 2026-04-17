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
  grenzen: {
    title: "Workshop ‘Grenzen stellen zonder strijd’",
    description: "Liefdevolle duidelijkheid die helpt om spanning en strijd te verzachten.",
    type: "workshop",
    image: "/images/workshops/11.png",
  },
  emoties: {
    title: "Cursus ‘Omgaan met grote emoties’",
    description: "Leer hoe je je kind helpt bij boosheid, frustratie en escalaties zonder zelf mee te schieten.",
    type: "cursus",
    image: "/images/workshops/4.png",
  },
  slapen: {
    title: "Cursus ‘Meer rust rondom slapen’",
    description: "Praktische stappen voor meer voorspelbaarheid, rust en vertrouwen rondom slapen en bedtijd.",
    type: "cursus",
    image: "/images/workshops/22.png",
  },
  verbinding: {
    title: "Workshop ‘Verbinding maken in lastige momenten’",
    description: "Ontdek hoe je dichtbij je kind blijft en tegelijk richting geeft als het spannend wordt.",
    type: "workshop",
    image: "/images/workshops/23.png",
  },
  zelfvertrouwen: {
    title: "Cursus ‘Zelfvertrouwen versterken’",
    description: "Help je kind steviger in zichzelf te staan met rustige, direct toepasbare handvatten.",
    type: "cursus",
    image: "/images/workshops/9.png",
  },
  school: {
    title: "Workshop ‘Rust bij schoolstress en overprikkeling’",
    description: "Meer grip op spanning rond school, overgangen en volle dagen.",
    type: "workshop",
    image: "/images/workshops/8.png",
  },
};

export const recommendationsByAgeAndBehavior: Partial<
  Record<AgeGroupValue, Partial<Record<SingleAnswerValue, string[]>>>
> = {
  age_0_2: {
    focus_overprikkeld: ["slapen", "emoties", "verbinding", "grenzen"],
    focus_onzeker: ["verbinding", "emoties", "grenzen", "slapen"],
    focus_rust: ["slapen", "verbinding", "emoties", "grenzen"],
    focus_verbinding: ["verbinding", "emoties", "slapen", "grenzen"],
  },
  age_3_5: {
    focus_emoties: ["emoties", "grenzen", "verbinding", "slapen"],
    focus_luisteren: ["grenzen", "verbinding", "emoties", "zelfvertrouwen"],
    focus_strijd: ["grenzen", "verbinding", "emoties", "zelfvertrouwen"],
    focus_rust: ["slapen", "verbinding", "emoties", "grenzen"],
    focus_onzeker: ["zelfvertrouwen", "verbinding", "emoties", "grenzen"],
  },
  age_6_9: {
    focus_luisteren: ["grenzen", "verbinding", "zelfvertrouwen", "school"],
    focus_emoties: ["emoties", "verbinding", "grenzen", "zelfvertrouwen"],
    focus_onzeker: ["zelfvertrouwen", "verbinding", "school", "emoties"],
    focus_verbinding: ["verbinding", "zelfvertrouwen", "grenzen", "school"],
    focus_overprikkeld: ["school", "slapen", "emoties", "verbinding"],
    focus_strijd: ["grenzen", "verbinding", "emoties", "school"],
  },
  age_10_plus: {
    focus_verbinding: ["verbinding", "zelfvertrouwen", "school", "grenzen"],
    focus_strijd: ["grenzen", "verbinding", "zelfvertrouwen", "school"],
    focus_luisteren: ["grenzen", "verbinding", "school", "zelfvertrouwen"],
    focus_onzeker: ["zelfvertrouwen", "verbinding", "school", "emoties"],
    focus_rust: ["school", "verbinding", "slapen", "zelfvertrouwen"],
  },
};

import type { AgeGroupValue, QuestionOption } from "@/lib/quiz-types";

export type QuestionDefinition = {
  id: string;
  title: string;
  subtext?: string;
  multiSelect?: boolean;
  options: QuestionOption[];
};

export const ageQuestion: QuestionDefinition = {
  id: "age",
  title: "Hoe oud is je kind?",
  multiSelect: true,
  options: [
    {
      label: "0–2 jaar",
      value: "age_0_2",
      weights: { overprikkeling: 1, meebewegen: 1 },
    },
    {
      label: "2–4 jaar",
      value: "age_2_4",
      weights: { strijd: 1, overprikkeling: 1 },
    },
    {
      label: "5–7 jaar",
      value: "age_5_7",
      weights: { strijd: 1, twijfel: 1 },
    },
    {
      label: "8–12 jaar",
      value: "age_8_12",
      weights: { strijd: 1, twijfel: 1 },
    },
    {
      label: "13–18 jaar",
      value: "age_13_18",
      weights: { twijfel: 1, meebewegen: 1 },
    },
  ],
};

export const focusQuestion: QuestionDefinition = {
  id: "focus",
  title: "Waar wil je het liefst als eerste mee aan de slag?",
  subtext: "Kies wat nu het meest speelt. De rest komt later.",
  options: [
    {
      label: "Heftige emoties en escalaties",
      value: "focus_emoties",
      weights: { overprikkeling: 3, strijd: 1 },
    },
    {
      label: "Niet luisteren en samenwerking",
      value: "focus_luisteren",
      weights: { strijd: 3, meebewegen: 1 },
    },
    {
      label: "Veel strijd en grenzen",
      value: "focus_strijd",
      weights: { strijd: 3, meebewegen: 1 },
    },
    {
      label: "Snel overprikkeld / alles wordt te veel",
      value: "focus_overprikkeld",
      weights: { overprikkeling: 3, twijfel: 1 },
    },
    {
      label: "Onzekerheid over hoe ik moet reageren",
      value: "focus_onzeker",
      weights: { twijfel: 3, meebewegen: 1 },
    },
    {
      label: "Weinig rust in huis",
      value: "focus_rust",
      weights: { overprikkeling: 2, strijd: 2 },
    },
    {
      label: "Minder verbinding met mijn kind",
      value: "focus_verbinding",
      weights: { meebewegen: 3, twijfel: 1 },
    },
  ],
};

export const focusQuestionsByAge = {
  age_0_2: [
    "Mijn kind slaapt slecht en ik ben uitgeput",
    "Mijn kind huilt veel en ik weet niet wat hij/zij nodig heeft",
    "Mijn kind is snel overprikkeld en moeilijk rustig te krijgen",
    "We hebben geen ritme en dat geeft onrust",
    "Mijn kind kan moeilijk zonder mij",
    "Ik twijfel vaak of ik het goed doe",
  ],

  age_2_4: [
    "De driftbuien lopen compleet uit de hand",
    "Mijn kind luistert niet",
    "Alles wordt een strijd (aankleden, eten, naar bed)",
    "Mijn kind test constant grenzen",
    "Overgangen zorgen voor gedoe",
    "Ik merk dat ik zelf sneller boos word dan ik wil",
  ],

  age_5_7: [
    "Mijn kind luistert niet en discussieert veel",
    "Mijn kind wordt snel boos of gefrustreerd",
    "Mijn kind heeft weinig zelfvertrouwen",
    "Mijn kind praat weinig over wat er speelt",
    "School zorgt voor spanning of problemen",
    "Er is veel gedoe met broertjes/zusjes",
  ],

  age_8_12: [
    "Mijn kind luistert niet en discussieert veel",
    "Mijn kind wordt snel boos of gefrustreerd",
    "Mijn kind heeft weinig zelfvertrouwen",
    "Mijn kind praat weinig over wat er speelt",
    "School zorgt voor spanning of problemen",
    "Er is veel gedoe met broertjes/zusjes",
  ],

  age_13_18: [
    "Mijn kind trekt zich terug en deelt weinig",
    "We hebben steeds vaker discussie of conflict",
    "Mijn kind accepteert grenzen slecht",
    "Mijn kind is onzeker of somber",
    "Er is gedoe met vrienden",
    "Ik heb het gevoel dat ik mijn kind kwijtraakt",
  ],
} as const;

export const focusWeightsByLabel = {
  "Mijn kind slaapt slecht en ik ben uitgeput": { overprikkeling: 3, twijfel: 1 },
  "Mijn kind huilt veel en ik weet niet wat hij/zij nodig heeft": { overprikkeling: 2, twijfel: 2 },
  "Mijn kind is snel overprikkeld en moeilijk rustig te krijgen": { overprikkeling: 3, strijd: 1 },
  "We hebben geen ritme en dat geeft onrust": { overprikkeling: 2, meebewegen: 1 },
  "Mijn kind kan moeilijk zonder mij": { meebewegen: 3, twijfel: 1 },
  "Ik twijfel vaak of ik het goed doe": { twijfel: 3, meebewegen: 1 },
  "De driftbuien lopen compleet uit de hand": { strijd: 2, overprikkeling: 2 },
  "Mijn kind luistert niet": { strijd: 3, meebewegen: 1 },
  "Alles wordt een strijd (aankleden, eten, naar bed)": { strijd: 3, meebewegen: 1 },
  "Mijn kind test constant grenzen": { strijd: 3, twijfel: 1 },
  "Overgangen zorgen voor gedoe": { overprikkeling: 2, strijd: 1 },
  "Ik merk dat ik zelf sneller boos word dan ik wil": { twijfel: 2, strijd: 1 },
  "Mijn kind luistert niet en discussieert veel": { strijd: 3, meebewegen: 1 },
  "Mijn kind wordt snel boos of gefrustreerd": { strijd: 2, overprikkeling: 1 },
  "Mijn kind heeft weinig zelfvertrouwen": { twijfel: 3, meebewegen: 1 },
  "Mijn kind praat weinig over wat er speelt": { meebewegen: 2, twijfel: 2 },
  "School zorgt voor spanning of problemen": { overprikkeling: 2, twijfel: 1 },
  "Er is veel gedoe met broertjes/zusjes": { strijd: 2, overprikkeling: 1 },
  "Mijn kind trekt zich terug en deelt weinig": { meebewegen: 3, twijfel: 1 },
  "We hebben steeds vaker discussie of conflict": { strijd: 2, meebewegen: 1 },
  "Mijn kind accepteert grenzen slecht": { strijd: 3, meebewegen: 1 },
  "Mijn kind is onzeker of somber": { twijfel: 3, overprikkeling: 1 },
  "Er is gedoe met vrienden": { twijfel: 2, meebewegen: 1 },
  "Ik heb het gevoel dat ik mijn kind kwijtraakt": { meebewegen: 3, twijfel: 1 },
} as const;

export const parentHelpQuestion: QuestionDefinition = {
  id: "parentHelp",
  title: "Wat helpt jou het meest om dit anders aan te pakken?",
  subtext: "Kies wat het beste bij je past, dan sluiten we de OpvoedApp daarop aan.",
  multiSelect: true,
  options: [
    {
      label: "Direct weten wat je kan zeggen of doen in lastige momenten",
      value: "parent_help_begrijpen",
      weights: { twijfel: 2, overprikkeling: 1 },
    },
    {
      label: "Snel toepasbare tips die je meteen kan gebruiken",
      value: "parent_help_verbinding",
      weights: { meebewegen: 3 },
    },
    {
      label: "Dieper begrijpen waarom je kind zo reageert",
      value: "parent_help_overweldigd",
      weights: { overprikkeling: 3 },
    },
    {
      label: "Meer rust en overzicht in je hoofd",
      value: "parent_help_chaos",
      weights: { overprikkeling: 2, strijd: 2 },
    },
    {
      label: "Stap voor stap begeleid worden in wat werkt",
      value: "parent_help_rustig_reageren",
      weights: { twijfel: 1, overprikkeling: 2 },
    },
    {
      label: "Dit klinkt allemaal fijn",
      value: "parent_help_vertrouwen",
      weights: { twijfel: 3 },
    },
  ],
};

export const learningPreferenceQuestion: QuestionDefinition = {
  id: "learningPreference",
  title: "Hoe wil je dit het liefst volgen?",
  subtext: "Selecteer alles wat bij je past, je vindt dit allemaal terug in de OpvoedApp.",
  multiSelect: true,
  options: [
    {
      label: "Korte, snelle lessen die je tussendoor kan doen",
      value: "learning_direct_antwoord",
      weights: { twijfel: 2, strijd: 1 },
    },
    {
      label: "Concrete scripts die je direct kan gebruiken",
      value: "learning_scripts",
      weights: { strijd: 2, meebewegen: 1 },
    },
    {
      label: "Verdiepende cursussen waarin je echt de diepte in gaat",
      value: "learning_workshops",
      weights: { twijfel: 1, overprikkeling: 1 },
    },
    {
      label: "Gebruik maken van de ADHD bibliotheek",
      value: "learning_live_sessies",
      weights: { twijfel: 2, meebewegen: 1 },
    },
    {
      label: "Live sessies waarin je vragen kan stellen",
      value: "learning_audios",
      weights: { overprikkeling: 2 },
    },
    {
      label: "100+ Geleide meditaties",
      value: "learning_alles_fijn",
      weights: { overprikkeling: 1, strijd: 1, twijfel: 1, meebewegen: 1 },
    },
    {
      label: "Je hebt dit allemaal nodig om het anders te kunnen doen",
      value: "learning_alles_nodig",
      weights: { overprikkeling: 1, strijd: 1, twijfel: 1, meebewegen: 1 },
    },
  ],
};

export const neurodiversityQuestion: QuestionDefinition = {
  id: "neurodiversity",
  title: "Is er iets belangrijks dat we moeten weten over je kind?",
  subtext:
    "Bijvoorbeeld iets wat invloed heeft op hoe je kind denkt, voelt of reageert. Selecteer alles wat van toepassing is.",
  multiSelect: true,
  options: [
    { label: "ADHD of ADD", value: "neurodiversity_adhd", weights: {} },
    { label: "Autisme", value: "neurodiversity_autisme", weights: {} },
    { label: "Hoogsensitiviteit", value: "neurodiversity_hoogsensitiviteit", weights: {} },
    { label: "Sterke emoties of snel overprikkeld", value: "neurodiversity_emoties", weights: {} },
    { label: "Slaapproblemen", value: "neurodiversity_slapen", weights: {} },
    { label: "Iets anders dat belangrijk is", value: "neurodiversity_anders", weights: {} },
  ],
};

export const hardestQuestion: QuestionDefinition = {
  id: "hardest",
  title: "Wat vind je hier het moeilijkst aan?",
  multiSelect: true,
  options: [
    { label: "Ik weet niet goed wat ik moet doen", value: "hardest_niet_weten", weights: {} },
    { label: "Ik blijf zelf niet rustig", value: "hardest_zelf_rustig", weights: {} },
    { label: "Het kost me veel energie", value: "hardest_energie", weights: {} },
    { label: "Ik voel me er schuldig over", value: "hardest_schuldig", weights: {} },
    { label: "Het blijft zich herhalen", value: "hardest_herhalen", weights: {} },
    { label: "Ik voel me er alleen in", value: "hardest_alleen", weights: {} },
  ],
};

export const impactQuestion: QuestionDefinition = {
  id: "impact",
  title: "Waar merk je dat dit invloed op heeft in je leven?",
  multiSelect: true,
  options: [
    { label: "Mijn energie", value: "impact_energie", weights: {} },
    { label: "De sfeer in huis", value: "impact_sfeer", weights: {} },
    { label: "Mijn relatie", value: "impact_relatie", weights: {} },
    { label: "Mijn werk of concentratie", value: "impact_werk", weights: {} },
    { label: "Broertjes of zusjes", value: "impact_gezin", weights: {} },
    { label: "Mijn zelfvertrouwen als ouder", value: "impact_zelfvertrouwen", weights: {} },
  ],
};

export const triedQuestion: QuestionDefinition = {
  id: "tried",
  title: "Wat heb je tot nu toe al geprobeerd?",
  multiSelect: true,
  options: [
    { label: 'Rustig uitleggen', value: "tried_uitleggen", weights: {} },
    { label: "Consequent grenzen stellen", value: "tried_grenzen", weights: {} },
    { label: "Belonen of motiveren", value: "tried_belonen", weights: {} },
    { label: "Straffen of dreigen", value: "tried_straffen", weights: {} },
    { label: "Informatie opzoeken of lezen", value: "tried_lezen", weights: {} },
    { label: "Hulp vragen", value: "tried_hulp", weights: {} },
  ],
};

export const desiredChangeQuestion: QuestionDefinition = {
  id: "desiredChange",
  title: "Wat zou je het liefst anders willen zien?",
  multiSelect: true,
  options: [
    { label: "Meer rust in huis", value: "desired_rust", weights: {} },
    { label: "Minder strijd", value: "desired_minder_strijd", weights: {} },
    { label: "Meer verbinding", value: "desired_verbinding", weights: {} },
    { label: "Meer vertrouwen in mezelf", value: "desired_vertrouwen", weights: {} },
    { label: "Sneller weten wat werkt", value: "desired_weten", weights: {} },
    { label: "Meer plezier in opvoeden", value: "desired_plezier", weights: {} },
  ],
};

export function getAgeOption(value?: AgeGroupValue) {
  return ageQuestion.options.find((option) => option.value === value);
}

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
  title: "Is er iets belangrijks dat we moeten weten over jouw kind?",
  subtext:
    "Bijvoorbeeld iets wat invloed heeft op hoe jouw kind denkt, voelt of reageert. Selecteer alles wat van toepassing is.",
  multiSelect: true,
  options: [
    { label: "Nee", value: "neurodiversity_nee", weights: {} },
    { label: "Ja, ADD of ADHD", value: "neurodiversity_adhd", weights: {} },
    { label: "Ja, ASS", value: "neurodiversity_ass", weights: {} },
    { label: "Ja, hoogsensitief", value: "neurodiversity_hoogsensitiviteit", weights: {} },
    {
      label: "Ja, mijn kind ontwikkelt zich anders (bijvoorbeeld sneller of juist wat langzamer)",
      value: "neurodiversity_ontwikkelt_anders",
      weights: {},
    },
    { label: "Ja, iets anders", value: "neurodiversity_anders", weights: {} },
    { label: "Je weet het niet zeker", value: "neurodiversity_onzeker", weights: {} },
  ],
};

export const hardestQuestion: QuestionDefinition = {
  id: "hardest",
  title: "Wat vind je hier het moeilijkst aan?",
  multiSelect: true,
  options: [
    { label: "Je weet niet goed wat je moet doen", value: "hardest_niet_weten", weights: {} },
    { label: "Het kost je veel energie", value: "hardest_energie", weights: {} },
    { label: "Je raakt gefrustreerd", value: "hardest_gefrustreerd", weights: {} },
    { label: "Het zorgt voor spanning thuis", value: "hardest_spanning_thuis", weights: {} },
    { label: "Je twijfelt of je het goed aanpakt", value: "hardest_twijfel", weights: {} },
    { label: "Je voelt je soms machteloos", value: "hardest_machteloos", weights: {} },
    {
      label: "Je voelt je schuldig (omdat je hebt geschreeuwd, gedreigd of onaardige dingen hebt gezegd)",
      value: "hardest_schuldig",
      weights: {},
    },
    {
      label: "Je bent bang dat het alleen maar erger wordt",
      value: "hardest_erger",
      weights: {},
    },
    {
      label: "Je hebt er veel ruzie over met je partner",
      value: "hardest_partner",
      weights: {},
    },
  ],
};

export const impactQuestion: QuestionDefinition = {
  id: "impact",
  title: "Waar merk je dat dit invloed op heeft in je leven?",
  subtext: "Selecteer alles wat voor jou herkenbaar is.",
  multiSelect: true,
  options: [
    { label: "De sfeer in huis", value: "impact_sfeer", weights: {} },
    { label: "Je relatie met je partner", value: "impact_relatie", weights: {} },
    { label: "Het contact met familie", value: "impact_familie", weights: {} },
    { label: "Het contact met vrienden", value: "impact_vrienden", weights: {} },
    { label: "Je eigen energie en geduld", value: "impact_energie", weights: {} },
    { label: "Je zelfvertrouwen als ouder", value: "impact_zelfvertrouwen", weights: {} },
    { label: "Momenten buitenshuis (zoals bezoek of uitjes)", value: "impact_buitenshuis", weights: {} },
    { label: "Eigenlijk op veel momenten in mijn leven", value: "impact_overal", weights: {} },
  ],
};

export const triedQuestion: QuestionDefinition = {
  id: "tried",
  title: "Wat heb je tot nu toe al geprobeerd?",
  multiSelect: true,
  options: [
    { label: "Je hebt geprobeerd rustig uit te leggen", value: "tried_uitleggen", weights: {} },
    { label: "Je bent strenger geweest / grenzen gaan stellen", value: "tried_grenzen", weights: {} },
    { label: "Je hebt het geprobeerd te negeren", value: "tried_negeren", weights: {} },
    { label: "Je hebt belonen ingezet", value: "tried_belonen", weights: {} },
    { label: "Je hebt geprobeerd consequent te blijven", value: "tried_consequent", weights: {} },
    { label: "Je hebt hulp gezocht bij instanties", value: "tried_hulp", weights: {} },
    { label: "Je weet niet goed wat werkt.", value: "tried_onzeker", weights: {} },
  ],
};

export const desiredChangeQuestion: QuestionDefinition = {
  id: "desiredChange",
  title: "Wat zou je het liefst anders willen zien?",
  multiSelect: true,
  options: [
    { label: "Meer rust in huis", value: "desired_rust", weights: {} },
    { label: "Dat je kind beter luistert", value: "desired_luisteren", weights: {} },
    { label: "Minder boosheid of driftbuien", value: "desired_minder_boosheid", weights: {} },
    { label: "Meer zelfvertrouwen bij je kind", value: "desired_zelfvertrouwen_kind", weights: {} },
    { label: "Minder strijd", value: "desired_minder_strijd", weights: {} },
    { label: "Meer plezier samen", value: "desired_plezier", weights: {} },
    { label: "Je hebt meer vertrouwen in jouw rol als ouder", value: "desired_vertrouwen", weights: {} },
    { label: "Er wordt weer respectvol gecommuniceerd in huis.", value: "desired_respectvol", weights: {} },
  ],
};

export const problemIntensityQuestion: QuestionDefinition = {
  id: "problemIntensity",
  title: "Hoe vaak speelt dit en hoe lang zit je hier al mee?",
  subtext: "Kies wat het beste bij jullie situatie past.",
  options: [
    { label: "Af en toe, en nog maar kort (korter dan 2 weken)", value: "problem_intensity_kort", weights: {} },
    { label: "Af en toe, maar speelt al langer", value: "problem_intensity_langer", weights: {} },
    { label: "Een paar keer per week, sinds een paar weken", value: "problem_intensity_weken", weights: {} },
    { label: "Een paar keer per week, al een paar maanden", value: "problem_intensity_maanden", weights: {} },
    { label: "Bijna elke dag, al een tijdje", value: "problem_intensity_bijna_dagelijks", weights: {} },
    { label: "Meerdere keren per dag, al langere tijd", value: "problem_intensity_meerdere_per_dag", weights: {} },
  ],
};

export function getAgeOption(value?: AgeGroupValue) {
  return ageQuestion.options.find((option) => option.value === value);
}

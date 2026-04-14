import {
  focusWeightsByLabel,
  focusQuestion,
  getAgeOption,
  learningPreferenceQuestion,
  parentHelpQuestion,
} from "@/data/quiz";
import type { QuizAnswers, QuizResultContent, ResultType } from "@/lib/quiz-types";

const resultContent: Record<ResultType, QuizResultContent> = {
  overprikkeling: {
    type: "overprikkeling",
    title: "Jullie lijken vast te lopen in een overprikkelingspatroon",
    recognition:
      "Er is veel liefde, maar ook veel spanning. Kleine momenten kunnen ineens groot voelen, waardoor jullie allebei sneller over je grens gaan.",
    explanation:
      "Wanneer prikkels, emoties en vermoeidheid zich opstapelen, wordt reageren moeilijker. Dat betekent niet dat je het verkeerd doet — het betekent vaak dat er meer rust, duidelijkheid en co-regulatie nodig zijn.",
    bridge:
      "Met de juiste begeleiding leer je eerder signalen herkennen, rust terugbrengen en je kind helpen zonder zelf leeg te lopen.",
  },
  strijd: {
    type: "strijd",
    title: "Jullie zitten waarschijnlijk in een strijdpatroon",
    recognition:
      "Veel momenten voelen als trekken en duwen. Jij probeert te begrenzen of samen te werken, maar het eindigt vaker in spanning dan in verbinding.",
    explanation:
      "Als strijd zich herhaalt, raakt iedereen sneller in de weerstand. Vaak ligt daaronder een behoefte aan duidelijkheid, veiligheid en een andere manier van contact maken.",
    bridge:
      "Met praktische tools kun je grenzen stellen zonder steeds in strijd terecht te komen, en bouw je stap voor stap weer meer rust op.",
  },
  twijfel: {
    type: "twijfel",
    title: "Er lijkt veel twijfel en onzekerheid mee te spelen",
    recognition:
      "Je wilt het goed doen, maar in lastige momenten weet je niet altijd wat helpend is. Dat kan veel onrust geven, juist omdat je zo betrokken bent.",
    explanation:
      "Twijfel ontstaat vaak wanneer je veel verantwoordelijkheid voelt, maar nog geen houvast hebt dat echt bij jouw kind en situatie past. Dan wordt reageren zwaar en vermoeiend.",
    bridge:
      "Met rustige uitleg, duidelijke stappen en steun krijg je weer vertrouwen in je keuzes en weet je beter wat je kunt doen als het spannend wordt.",
  },
  meebewegen: {
    type: "meebewegen",
    title: "Je bent misschien te veel aan het meebewegen en mist grip",
    recognition:
      "Je probeert de sfeer goed te houden en escalatie te voorkomen, maar ondertussen voel je dat jij steeds minder stevig staat in wat nodig is.",
    explanation:
      "Veel ouders gaan uit liefde meebewegen, maar verliezen daarmee houvast. Daardoor blijft onrust bestaan en voelt opvoeden zwaarder dan nodig is.",
    bridge:
      "Met meer duidelijkheid, zachte stevigheid en praktische begeleiding kun je weer leiding nemen zonder hard te worden.",
  },
};

const tieBreakerOrder: ResultType[] = [
  "overprikkeling",
  "strijd",
  "twijfel",
  "meebewegen",
];

export function calculateResult(answers: QuizAnswers): QuizResultContent {
  const scores: Record<ResultType, number> = {
    overprikkeling: 0,
    strijd: 0,
    twijfel: 0,
    meebewegen: 0,
  };

  const ageOption = getAgeOption(answers.primaryAge || answers.age?.[0]);
  const focusOption = focusQuestion.options.find((option) => option.value === answers.focus);
  const focusWeights = focusOption?.weights || (answers.focus ? focusWeightsByLabel[answers.focus as keyof typeof focusWeightsByLabel] : undefined);
  const parentHelpOption = parentHelpQuestion.options.find(
    (option) => option.value === answers.parentHelp,
  );
  const learningPreferenceOption = learningPreferenceQuestion.options.find(
    (option) => option.value === answers.learningPreference,
  );

  for (const option of [ageOption, parentHelpOption, learningPreferenceOption]) {
    if (!option) continue;

    for (const [type, score] of Object.entries(option.weights) as [ResultType, number][]) {
      scores[type] += score;
    }
  }

  if (focusWeights) {
    for (const [type, score] of Object.entries(focusWeights) as [ResultType, number][]) {
      scores[type] += score * 1.5;
    }
  }

  const winner = tieBreakerOrder.reduce((best, current) => {
    if (scores[current] > scores[best]) {
      return current;
    }

    return best;
  }, tieBreakerOrder[0]);

  return resultContent[winner];
}

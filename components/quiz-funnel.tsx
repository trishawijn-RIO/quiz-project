"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import {
  ageQuestion,
  focusQuestion,
  learningPreferenceQuestion,
  parentHelpQuestion,
} from "@/data/quiz";
import {
  behaviorsByAge,
  recommendationsByAgeAndBehavior,
  contentLibrary,
} from "@/data/quiz-data";
import { calculateResult } from "@/lib/quiz-results";
import type { AgeGroupValue, QuizAnswers, SingleAnswerValue } from "@/lib/quiz-types";
import { HeroIllustration } from "@/components/hero-illustration";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OptionButton } from "@/components/ui/option-button";
import { ProgressBar } from "@/components/ui/progress-bar";

const CHECKOUT_URL =
  "https://betalen.rustinouderschap.nl/checkout/programmario-1686555094";

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, payload?: Record<string, unknown>) => void;
  }
}

function trackEvent(eventName: string, payload: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    }
  } catch (error) {
    console.warn("Tracking failed", error);
  }
}

const screenMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

type FunnelStep =
  | "intro"
  | "age"
  | "age-focus"
  | "focus"
  | "reassurance"
  | "parent-help"
  | "learning-preference"
  | "result";

const reassuranceContent = {
  title: "Je bent op de juiste plek",
  text: "We weten dat je het kunt en we weten ook dat dit niet altijd makkelijk is.\nMet de OpvoedApp helpen we je stap voor stap vooruit, zodat je precies op het juiste moment weet wat te doen.",
};

export function QuizFunnel() {
  const [step, setStep] = useState<FunnelStep>("intro");
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const result = useMemo(() => calculateResult(answers), [answers]);
  const activeAge =
    answers.primaryAge ||
    (Array.isArray(answers.age) ? answers.age[0] : answers.age);
  const needsPrimaryAgeStep = (answers.age?.length ?? 0) > 1;
  const totalSteps = needsPrimaryAgeStep ? 6 : 5;
  const currentProgressStep =
    step === "intro"
      ? 0
      : step === "result"
        ? totalSteps
        : (
            needsPrimaryAgeStep
              ? ["age", "age-focus", "focus", "reassurance", "parent-help", "learning-preference"]
              : ["age", "focus", "reassurance", "parent-help", "learning-preference"]
          ).indexOf(step) + 1;

  const canContinue = (() => {
    if (step === "intro" || step === "reassurance" || step === "result") return true;
    if (step === "age") return Array.isArray(answers.age) && answers.age.length > 0;
    if (step === "age-focus") return Boolean(answers.primaryAge);
    if (step === "focus") return Array.isArray(answers.behavior) && answers.behavior.length > 0;
    if (step === "parent-help") return Boolean(answers.parentHelp);
    if (step === "learning-preference") return Boolean(answers.learningPreference);
    return false;
  })();

  const goToNextStep = () => {
    setStep((current) => {
      if (current === "intro") return "age";
      if (current === "age") {
        const selectedAges = Array.isArray(answers.age) ? answers.age : [];
        if (selectedAges.length === 1) return "focus";
        return "age-focus";
      }
      if (current === "age-focus") return "focus";
      if (current === "focus") return "reassurance";
      if (current === "reassurance") return "parent-help";
      if (current === "parent-help") return "learning-preference";
      if (current === "learning-preference") return "result";
      return current;
    });
  };

  const goToPreviousStep = () => {
    setStep((current) => {
      if (current === "age") return "intro";
      if (current === "age-focus") return "age";
      if (current === "focus") {
        return Array.isArray(answers.age) && answers.age.length > 1 ? "age-focus" : "age";
      }
      if (current === "reassurance") return "focus";
      if (current === "parent-help") return "reassurance";
      if (current === "learning-preference") return "parent-help";
      if (current === "result") return "learning-preference";
      return current;
    });
  };

  const handleSingleSelect = (
    questionId: "primaryAge" | "focus" | "parentHelp" | "learningPreference",
    value: SingleAnswerValue | string,
  ) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const handleMultiSelect = (questionId: "behavior", value: SingleAnswerValue) => {
    setAnswers((current) => {
      const currentValues = Array.isArray(current[questionId]) ? current[questionId] : [];
      const exists = currentValues.includes(value);
      const nextValues = exists
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...current,
        [questionId]: nextValues,
        focus: nextValues[0],
      };
    });
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-xl flex-col justify-center">
        {currentProgressStep > 0 ? (
          <ProgressBar currentStep={currentProgressStep} totalSteps={totalSteps} />
        ) : null}

        <AnimatePresence mode="wait">
          {step === "intro" ? (
            <motion.div key="intro" {...screenMotion}>
              <Card className="border-none bg-[linear-gradient(180deg,rgba(255,251,248,0.88)_0%,rgba(255,255,255,0.64)_100%)] px-5 py-8 text-center shadow-[0_18px_44px_rgba(75,63,141,0.08)] sm:px-8 sm:py-11">
                <div className="h-6" />
                <div className="mb-8 flex justify-center">
                  <Image
                    alt="Rust in Ouderschap beeldmerk"
                    className="h-8 w-auto opacity-90 sm:h-9"
                    height={96}
                    priority
                    src="/images/logo.png"
                    width={96}
                  />
                </div>
                <div className="mx-auto mb-9 max-w-sm">
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/74">
                    <div className="h-full w-[14%] rounded-full bg-[rgba(242,140,0,0.78)]" />
                  </div>
                </div>
                <div className="mx-auto max-w-md">
                  <h1 className="text-balance text-4xl font-semibold leading-tight text-[var(--text)] sm:text-5xl">
                    Opvoeden is persoonlijk
                  </h1>
                  <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-[var(--text-soft)]">
                    Vertel ons wat er speelt bij jou thuis, en we laten je zien wat jouw kind en jij nodig hebben.
                    Op basis daarvan laten we zien hoe de OpvoedApp jou kan ondersteunen, precies afgestemd op jullie situatie.
                  </p>
                </div>
                <div className="my-12 sm:my-14">
                  <HeroIllustration />
                </div>
                <div className="mx-auto max-w-sm">
                  <Button onClick={goToNextStep}>Start quiz (± 2 min)</Button>
                </div>
              </Card>
            </motion.div>
          ) : null}

          {step === "age" ? (
            <QuestionScreen
              key="age"
              questionIndex={1}
              title="Hoe oud is je kind?"
              subtext="Dit bepaalt welke adviezen je straks krijgt."
              options={ageQuestion.options.map((option) => ({
                ...option,
                selected:
                  Array.isArray(answers.age) &&
                  answers.age.includes(option.value as AgeGroupValue),
                onClick: () => {
                  setAnswers((current) => {
                    const currentAges = Array.isArray(current.age) ? current.age : [];
                    const value = option.value as AgeGroupValue;
                    const exists = currentAges.includes(value);

                    return {
                      ...current,
                      age: exists
                        ? currentAges.filter((v) => v !== value)
                        : [...currentAges, value],
                    };
                  });
                },
                multiSelect: true,
              }))}
              canContinue={canContinue}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          ) : null}

          {step === "age-focus" ? (
            <QuestionScreen
              key="age-focus"
              questionIndex={2}
              title="Welk kind vraagt nu het meest je aandacht?"
              subtext="Kies er één om mee te beginnen. Weet dat onze aanpak verder gaat dan één situatie of één kind."
              options={ageQuestion.options.map((option) => ({
                ...option,
                selected: answers.primaryAge === option.value,
                onClick: () =>
                  setAnswers((current) => ({
                    ...current,
                    primaryAge: option.value as AgeGroupValue,
                  })),
              }))}
              canContinue={canContinue}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          ) : null}

          {step === "focus" ? (
            <QuestionScreen
              key="focus"
              questionIndex={needsPrimaryAgeStep ? 3 : 2}
              title={focusQuestion.title}
              subtext={focusQuestion.subtext}
              options={((activeAge && behaviorsByAge[activeAge]) || []).map((option) => ({
                label: option.label,
                selected:
                  Array.isArray(answers.behavior) && answers.behavior.includes(option.value),
                onClick: () => handleMultiSelect("behavior", option.value),
                multiSelect: true,
              }))}
              canContinue={canContinue}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          ) : null}

          {step === "reassurance" ? (
            <IntermediateScreen
              key="reassurance"
              title={reassuranceContent.title}
              text={reassuranceContent.text}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          ) : null}

          {step === "parent-help" ? (
            <QuestionScreen
              key="parent-help"
              questionIndex={needsPrimaryAgeStep ? 5 : 4}
              title={parentHelpQuestion.title}
              subtext={parentHelpQuestion.subtext}
              options={parentHelpQuestion.options.map((option) => ({
                ...option,
                selected: answers.parentHelp === option.value,
                onClick: () => handleSingleSelect("parentHelp", option.value),
              }))}
              canContinue={canContinue}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          ) : null}

          {step === "learning-preference" ? (
            <QuestionScreen
              key="learning-preference"
              questionIndex={needsPrimaryAgeStep ? 6 : 5}
              title={learningPreferenceQuestion.title}
              subtext={learningPreferenceQuestion.subtext}
              options={learningPreferenceQuestion.options.map((option) => ({
                ...option,
                selected: answers.learningPreference === option.value,
                onClick: () => handleSingleSelect("learningPreference", option.value),
              }))}
              canContinue={canContinue}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
              finalStep
            />
          ) : null}

          {step === "result" ? (
            <motion.div key="result" {...screenMotion}>
              <ResultScreen checkoutUrl={CHECKOUT_URL} result={result} answers={answers} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}

type QuestionScreenProps = {
  questionIndex: number;
  title: string;
  subtext?: string;
  options: Array<{
    label: string;
    selected: boolean;
    onClick: () => void;
    multiSelect?: boolean;
  }>;
  canContinue: boolean;
  onBack: () => void;
  onNext: () => void;
  finalStep?: boolean;
};

function QuestionScreen({
  questionIndex,
  title,
  subtext,
  options,
  canContinue,
  onBack,
  onNext,
  finalStep = false,
}: QuestionScreenProps) {
  return (
    <motion.div {...screenMotion}>
      <Card className="border-none px-6 py-7 shadow-[0_18px_42px_rgba(75,63,141,0.08)] sm:px-8 sm:py-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
          Vraag {questionIndex}
        </p>
        <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
        {subtext ? (
          <p className="mt-4 max-w-lg text-base leading-7 text-[var(--text-soft)]">{subtext}</p>
        ) : null}
        <div className="mt-8 space-y-3">
          {options.map((option) => (
            <OptionButton
              key={option.label}
              label={option.label}
              selected={option.selected}
              onClick={option.onClick}
              multiSelect={option.multiSelect}
            />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <Button disabled={!canContinue} onClick={onNext}>
            {finalStep ? "Bekijk mijn uitkomst" : "Ga verder"}
          </Button>
          <Button onClick={onBack} variant="secondary">
            Vorige
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function IntermediateScreen({
  title,
  text,
  onBack,
  onNext,
}: {
  title: string;
  text: string;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div {...screenMotion}>
      <Card className="border-none px-6 py-8 text-center shadow-[0_18px_42px_rgba(75,63,141,0.08)] sm:px-8 sm:py-9">
        <div className="mx-auto mb-7 h-16 w-16 rounded-full bg-[var(--theme-soft)]" />
        <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
        <p className="mt-5 text-lg leading-8 text-[var(--text-soft)]">{text}</p>
        <div className="mt-8 flex flex-col gap-3">
          <Button onClick={onNext}>Ga verder</Button>
          <Button onClick={onBack} variant="secondary">
            Vorige
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

type ResultScreenProps = {
  checkoutUrl: string;
  result: ReturnType<typeof calculateResult>;
  answers: QuizAnswers;
};

function ResultScreen({ checkoutUrl, result, answers }: ResultScreenProps) {
  const activeAge =
    answers.primaryAge ||
    (Array.isArray(answers.age) ? answers.age[0] : answers.age);

  const resultTitles = {
    age_0_2: "Meer rust en voorspelbaarheid voor jou en je baby",
    age_2_4: "Minder strijd en meer samenwerking met je peuter",
    age_5_7: "Meer rust in huis en minder gedoe in het dagelijks leven",
    age_8_12: "Meer vertrouwen en grip op gedrag en school",
    age_13_18: "Meer verbinding en invloed in de puberteit",
  };

  const title =
    resultTitles[activeAge as keyof typeof resultTitles] ||
    "Dit helpt jullie nu het meest";

  const selectedBehaviors = Array.isArray(answers.behavior)
    ? answers.behavior
    : answers.behavior
      ? [answers.behavior]
      : [];

  const collectedIds = selectedBehaviors.flatMap(
    (behavior) =>
      (activeAge && behavior
        ? recommendationsByAgeAndBehavior[activeAge]?.[behavior]
        : []) || [],
  );

  const uniqueIds = collectedIds.filter(
    (id, index, arr) => arr.indexOf(id) === index,
  );

  const ageFallbackIds = activeAge
    ? Object.values(recommendationsByAgeAndBehavior[activeAge] || {}).flat()
    : [];

  const fallbackUniqueIds = ageFallbackIds.filter(
    (id, index, arr) => arr.indexOf(id) === index,
  );

  const finalIds = [...uniqueIds];

  for (const id of fallbackUniqueIds) {
    if (!finalIds.includes(id)) {
      finalIds.push(id);
    }
    if (finalIds.length === 3) break;
  }

  const recommendedContent = finalIds
    .slice(0, 3)
    .map((id) => contentLibrary[id])
    .filter((item) => item && (item.type === "workshop" || item.type === "cursus"));
  const backgroundPositions = ["left center", "30% center", "50% center", "70% center", "right center"] as const;
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const visibleCards = 2;
  const maxIndex = Math.max(recommendedContent.length - visibleCards, 0);

  const handleCheckoutClick = () => {
    trackEvent("cta_click", {
      result_type: result.type,
      destination_url: checkoutUrl,
    });

    window.location.assign(checkoutUrl);
  };

  return (
    <div
      className="space-y-5 rounded-[36px] border border-white/45 bg-[linear-gradient(180deg,rgba(250,245,239,0.72)_0%,rgba(250,245,239,0.88)_100%)] p-3 shadow-[0_24px_56px_rgba(75,63,141,0.10)] backdrop-blur-sm sm:space-y-6 sm:p-4"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(250,245,239,0.76), rgba(250,245,239,0.9)), url('/standalone/assets/family-path-banner.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: backgroundPositions[currentIndex],
        transition: "background-position 0.7s ease",
      }}
    >
      <section className="rounded-[32px] bg-white/62 px-5 py-6 shadow-[0_18px_42px_rgba(75,63,141,0.08)] backdrop-blur-md sm:px-8 sm:py-8">
        <span className="inline-flex rounded-full bg-[rgba(169,159,214,0.18)] px-4 py-2 text-sm font-medium text-[var(--primary-dark)]">
          Voor jullie als gezin
        </span>
        <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-[var(--text)] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--text-soft)] sm:text-lg sm:leading-8">
          De juiste begeleiding voor precies waar jullie nu in vastlopen
        </p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-sm text-[var(--text-soft)]">
            Blader rustig door de onderdelen van jullie ondersteuning.
          </p>
          <div className="flex gap-2">
            <button
              aria-label="Vorige kaart"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/88 text-[var(--primary-dark)] shadow-[0_10px_24px_rgba(75,63,141,0.08)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((value) => Math.max(0, value - 1))}
              type="button"
            >
              <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path d="M14.5 6.5L9 12l5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" />
              </svg>
            </button>
            <button
              aria-label="Volgende kaart"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/88 text-[var(--primary-dark)] shadow-[0_10px_24px_rgba(75,63,141,0.08)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={currentIndex === maxIndex}
              onClick={() => setCurrentIndex((value) => Math.min(maxIndex, value + 1))}
              type="button"
            >
              <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path d="M9.5 6.5L15 12l-5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="mt-5 overflow-hidden"
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const deltaX = event.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;

            if (deltaX <= -40) {
              setCurrentIndex((value) => Math.min(maxIndex, value + 1));
            }

            if (deltaX >= 40) {
              setCurrentIndex((value) => Math.max(0, value - 1));
            }
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
        >
          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${currentIndex} * (50% + 0.5rem)))` }}
          >
            {recommendedContent.map((card) => (
              <article
                key={card.title}
                className="min-w-[calc((100%-1rem)/2)] rounded-[24px] bg-white/88 p-2.5 shadow-[0_18px_36px_rgba(75,63,141,0.08)] sm:rounded-[28px] sm:p-3"
              >
                <div className="relative aspect-[0.92/1] overflow-hidden rounded-[18px] bg-[linear-gradient(145deg,rgba(232,224,245,0.5),rgba(255,248,244,0.75))] sm:rounded-[22px]">
                  <Image
                    alt={card.title}
                    className="h-full w-full object-cover"
                    fill
                    sizes="50vw"
                    src={card.image}
                  />
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/84 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-dark)] shadow-[0_10px_22px_rgba(75,63,141,0.08)] sm:bottom-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-2 sm:text-[11px] sm:tracking-[0.14em]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(169,159,214,0.18)] sm:h-7 sm:w-7">
                      <svg aria-hidden="true" className="ml-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 4.75A1.75 1.75 0 0 1 8.64 3.24l6.84 4.25a1.75 1.75 0 0 1 0 2.98l-6.84 4.25A1.75 1.75 0 0 1 6 13.24V4.75Z" />
                      </svg>
                    </span>
                    {card.type}
                  </div>
                </div>
                <h3 className="mt-3 text-base font-semibold leading-6 text-[var(--text)] sm:mt-4 sm:text-xl sm:leading-8">{card.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-[var(--text-soft)] sm:mt-2 sm:text-base sm:leading-7">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {recommendedContent.map((card, index) => (
            <button
              key={card.title}
              aria-label={`Ga naar onderdeel ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                currentIndex === index
                  ? "w-6 bg-[rgba(123,106,168,0.88)]"
                  : "w-2.5 bg-[rgba(123,106,168,0.22)]"
              }`}
              onClick={() => setCurrentIndex(index)}
              type="button"
            />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] bg-white/68 px-5 py-6 shadow-[0_18px_42px_rgba(75,63,141,0.08)] backdrop-blur-md sm:px-8 sm:py-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[rgba(169,159,214,0.20)] text-[var(--primary-dark)]">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 4l1.9 3.85L18 9l-3 2.92.7 4.13L12 14.2 8.3 16.05 9 11.92 6 9l4.1-1.15L12 4z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold leading-tight text-[var(--text)]">
            Alles wat je krijgt in de OpvoedApp
          </h3>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            {
              src: "/images/result-features/feature-1.png",
              alt: "Complete opvoedcursussen",
            },
            {
              src: "/images/result-features/feature-2.png",
              alt: "24/7 support",
            },
            {
              src: "/images/result-features/feature-3.png",
              alt: "ADHD bibliotheek",
            },
            {
              src: "/images/result-features/feature-4.png",
              alt: "Contact met andere ouders",
            },
            {
              src: "/images/result-features/feature-5.png",
              alt: "Exclusieve live events",
            },
            {
              src: "/images/result-features/feature-6.png",
              alt: "Vragen stellen aan de experts",
            },
          ].map((item) => (
            <div
              key={item.src}
              className="overflow-hidden rounded-[24px] bg-white/82 shadow-[0_14px_30px_rgba(75,63,141,0.06)]"
            >
              <div className="relative aspect-[0.86/1]">
                <Image
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  fill
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 180px"
                  src={item.src}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] bg-white/68 px-5 py-6 shadow-[0_18px_42px_rgba(75,63,141,0.08)] backdrop-blur-md sm:px-8 sm:py-8">
        <h3 className="text-2xl font-semibold leading-tight text-[var(--text)]">
          Begeleid door professionals
        </h3>
        <p className="mt-4 text-base leading-7 text-[var(--text-soft)]">
          Je staat er niet alleen voor. In de Opvoedapp vind je begeleiding van psychologen,
          gedragswetenschappers, gezinsbegeleiders en andere professionals die begrijpen waar jullie in
          vastlopen.
        </p>
        <p className="mt-3 text-base leading-7 text-[var(--text-soft)]">
          Zo krijg je niet alleen herkenning, maar ook echte richting.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
          {[
            { name: "Rosalie, drs.", image: "/images/rosalie.webp" },
            { name: "Corine", image: "/images/corine.webp" },
            { name: "Celia", image: "/images/celia.webp" },
            { name: "Trisha", image: "/images/sifra.png" },
            { name: "Sifra", image: "/images/trisha.png" },
          ].map((professional) => (
            <div
              key={professional.name}
              className="inline-flex items-center gap-2.5 rounded-full bg-white/78 px-2.5 py-1.5 shadow-[0_10px_22px_rgba(75,63,141,0.06)] sm:px-3 sm:py-2"
            >
              <div className="h-9 w-9 overflow-hidden rounded-full bg-white/90 sm:h-10 sm:w-10">
                <Image
                  alt={professional.name}
                  className="h-full w-full object-cover"
                  height={88}
                  src={professional.image}
                  width={88}
                />
              </div>
              <span className="text-xs font-semibold text-[var(--text)] sm:text-sm">
                {professional.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] bg-white/74 px-5 py-7 text-center shadow-[0_18px_42px_rgba(75,63,141,0.08)] backdrop-blur-md sm:px-8 sm:py-9">
        <h3 className="text-3xl font-semibold leading-tight text-[var(--text)]">Begin vandaag</h3>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--text-soft)]">
          Probeer het nu en ontdek hoe het voelt om er niet meer alleen voor te staan.
        </p>
        <button
          className="mt-6 inline-flex min-h-14 w-full max-w-sm items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(242,140,0,0.88),rgba(217,121,43,0.92))] px-6 py-4 text-center text-base font-semibold text-white shadow-[0_16px_30px_rgba(201,128,69,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(201,128,69,0.28)]"
          onClick={handleCheckoutClick}
          type="button"
        >
          Vandaag beginnen voor €0,02
        </button>
        <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">Direct toegang tot alle ondersteuning</p>
      </section>
    </div>
  );
}
